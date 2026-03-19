<?php

namespace App\Http\Controllers;

use App\Models\FoundReport;
use App\Models\FoundReportMedia;
use App\Models\MissingReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class FoundReportController extends Controller
{
    /**
     * Reporter submits a "found" evidence for an approved missing report.
     */
    public function store(Request $request, $missingReportId)
    {
        // The missing report must be approved (publicly visible)
        $missingReport = MissingReport::whereIn('status', ['approved', 'found'])
            ->findOrFail($missingReportId);

        $validated = $request->validate([
            'date_found'  => 'required|date|before_or_equal:today',
            'description' => 'nullable|string|max:2000',
            'media'       => 'nullable',
        ]);

        // Check if the same user already submitted a pending found report for this case
        $existing = FoundReport::where('missing_report_id', $missingReportId)
            ->where('reporter_id', Auth::id())
            ->where('status', 'pending')
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'You already have a pending found report for this missing person. Please wait for admin review.',
            ], 422);
        }

        try {
            // Collect media files
            $files = [];
            if ($request->hasFile('media')) {
                $rawMedia = $request->file('media');
                $files = is_array($rawMedia) ? $rawMedia : [$rawMedia];
            }

            return DB::transaction(function () use ($validated, $missingReport, $files) {
                $foundReport = FoundReport::create([
                    'missing_report_id' => $missingReport->id,
                    'reporter_id'       => Auth::id(),
                    'date_found'        => $validated['date_found'],
                    'description'       => $validated['description'] ?? null,
                    'status'            => 'pending',
                ]);

                // Upload evidence media to Cloudinary
                foreach ($files as $index => $file) {
                    try {
                        $mimeType  = $file->getMimeType();
                        $mediaType = str_contains($mimeType, 'video') ? 'video' : 'image';

                        $uploadResult = Cloudinary::uploadApi()->upload($file->getRealPath(), [
                            'folder'        => 'reunite/found_reports/' . $foundReport->id,
                            'resource_type' => 'auto',
                        ]);

                        if ($uploadResult && isset($uploadResult['secure_url'])) {
                            FoundReportMedia::create([
                                'found_report_id' => $foundReport->id,
                                'media_type'      => $mediaType,
                                'media_url'       => $uploadResult['secure_url'],
                            ]);
                        }
                    } catch (\Exception $e) {
                        Log::error("Found Report media upload error #{$index}: " . $e->getMessage());
                    }
                }

                return response()->json([
                    'message'      => 'Found report submitted successfully. Pending admin review.',
                    'found_report' => $foundReport->load('media'),
                ], 201);
            });
        } catch (\Exception $e) {
            Log::error('Found report submission failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to submit found report.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all found report submissions made BY the authenticated reporter.
     */
    public function mySubmissions()
    {
        $submissions = FoundReport::where('reporter_id', Auth::id())
            ->with(['missingReport', 'media'])
            ->latest()
            ->get();

        return response()->json($submissions);
    }

    /**
     * ADMIN: Get all pending found report submissions.
     */
    public function adminIndex(Request $request)
    {
        $status = $request->query('status', 'pending');

        $submissions = FoundReport::with([
                'missingReport',
                'reporter:id,first_name,last_name,email',
                'media',
                'reviewer:id,first_name,last_name',
            ])
            ->when($status !== 'all', fn($q) => $q->where('status', $status))
            ->latest()
            ->paginate(20);

        return response()->json($submissions);
    }

    /**
     * ADMIN: Show a single found report submission.
     */
    public function adminShow($id)
    {
        $submission = FoundReport::with([
            'missingReport.media',
            'reporter:id,first_name,last_name,email',
            'media',
            'reviewer:id,first_name,last_name',
        ])->findOrFail($id);

        return response()->json($submission);
    }

    /**
     * ADMIN: Confirm or reject a found report submission.
     */
    public function adminReview(Request $request, $id)
    {
        $submission = FoundReport::with('missingReport')->findOrFail($id);

        $validated = $request->validate([
            'action'     => 'required|in:confirm,reject',
            'admin_note' => 'nullable|string|max:1000',
        ]);

        return DB::transaction(function () use ($validated, $submission) {
            $newStatus = $validated['action'] === 'confirm' ? 'confirmed' : 'rejected';

            $submission->update([
                'status'      => $newStatus,
                'admin_note'  => $validated['admin_note'] ?? null,
                'reviewed_by' => Auth::id(),
                'reviewed_at' => now(),
            ]);

            // If confirmed, update the missing report status to "found"
            if ($newStatus === 'confirmed') {
                $submission->missingReport->update(['status' => 'found']);
            }

            return response()->json([
                'message'    => $newStatus === 'confirmed'
                    ? 'Found report confirmed. Missing report is now marked as Found.'
                    : 'Found report rejected.',
                'submission' => $submission->fresh(['missingReport', 'media', 'reporter']),
            ]);
        });
    }
}
