<?php

namespace App\Http\Controllers;

use App\Models\MissingReport;
use App\Models\ReportMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class MissingReportController extends Controller
{
    /**
     * Store a new missing report.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'age' => 'nullable|integer|min:0',
            'gender' => 'required|in:male,female,other',
            'nationality' => 'nullable|string|max:255',
            'relation_with_person' => 'required|string|max:255',
            'last_seen_location' => 'required|string|max:255',
            'last_seen_date' => 'required|date',
            'physical_description' => 'required|string',
            'circumstances' => 'required|string',
            'offer_reward' => 'boolean',
            'reward_amount' => 'nullable|numeric|min:0',
            // Allow single or multiple files, including PDF for now
            'media' => 'nullable',
        ]);

        try {
            // Collect files robustly
            $files = [];
            if ($request->hasFile('media')) {
                $rawMedia = $request->file('media');
                $files = is_array($rawMedia) ? $rawMedia : [$rawMedia];
            }

            Log::info('--- New Report Submission ---');
            Log::info('Total files detected: ' . count($files));

            return DB::transaction(function () use ($validated, $request, $files) {
                $report = MissingReport::create([
                    'user_id' => Auth::id(),
                    'first_name' => $validated['first_name'],
                    'middle_name' => $validated['middle_name'] ?? null,
                    'last_name' => $validated['last_name'],
                    'age' => $validated['age'] ?? null,
                    'gender' => $validated['gender'],
                    'nationality' => $validated['nationality'] ?? null,
                    'relation_with_person' => $validated['relation_with_person'],
                    'last_seen_location' => $validated['last_seen_location'],
                    'last_seen_date' => $validated['last_seen_date'],
                    'physical_description' => $validated['physical_description'],
                    'circumstances' => $validated['circumstances'],
                    'offer_reward' => $validated['offer_reward'] ?? false,
                    'reward_amount' => $validated['reward_amount'] ?? null,
                    'status' => 'pending',
                ]);

                foreach ($files as $index => $file) {
                    try {
                        Log::info("Uploading file #{$index}: " . $file->getClientOriginalName());
                        
                        $mimeType = $file->getMimeType();
                        // For now, we map everything non-video to 'image' for the DB enum
                        $mediaType = str_contains($mimeType, 'video') ? 'video' : 'image';

                        // Upload to Cloudinary with safe error checking
                        $uploadResult = Cloudinary::uploadApi()->upload($file->getRealPath(), [
                            'folder' => 'reunite/reports/' . $report->id,
                            'resource_type' => 'auto',
                        ]);

                        if ($uploadResult && isset($uploadResult['secure_url'])) {
                            $mediaUrl = $uploadResult['secure_url'];
                            Log::info("Cloudinary Success: " . $mediaUrl);

                            ReportMedia::create([
                                'missing_report_id' => $report->id,
                                'media_type' => $mediaType,
                                'media_url' => $mediaUrl,
                            ]);
                        } else {
                            Log::error("Cloudinary returned invalid response for file #{$index}");
                        }

                    } catch (\Exception $e) {
                        Log::error("Upload error for file #{$index}: " . $e->getMessage());
                    }
                }

                $finalCount = $report->media()->count();
                return response()->json([
                    'message' => "Report submitted. {$finalCount} files saved.",
                    'report' => $report->load('media'),
                ], 201);
            });
        } catch (\Exception $e) {
            Log::error('Report submission failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to submit report.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get user's reports.
     */
    public function index()
    {
        $reports = MissingReport::where('user_id', Auth::id())
            ->with('media')
            ->latest()
            ->paginate(10);

        return response()->json($reports);
    }

    /**
     * Show a specific report.
     */
    public function show($id)
    {
        $report = MissingReport::with('media')
            ->where('user_id', Auth::id())
            ->findOrFail($id);

        return response()->json($report);
    }
    /**
     * Get all public reports.
     */
    public function publicIndex()
    {
        // Only return reports that are approved or found as requested
        $reports = MissingReport::with('media')
            ->whereIn('status', ['approved', 'found'])


            ->latest()
            ->paginate(20);

        return response()->json($reports);
    }

    /**
     * Show a public report.
     */
    public function publicShow($id)
    {
        // Publicly viewable reports must be approved or found
        $report = MissingReport::with(['media', 'user:id,first_name,last_name,email'])
            ->whereIn('status', ['approved', 'found'])
            ->findOrFail($id);

        return response()->json($report);
    }


    /**
     * Update the specified report.
     */
    public function update(Request $request, $id)
    {
        $report = MissingReport::where('user_id', Auth::id())->findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'sometimes|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'age' => 'nullable|integer|min:0',
            'gender' => 'sometimes|in:male,female,other',
            'nationality' => 'nullable|string|max:255',
            'relation_with_person' => 'sometimes|string|max:255',
            'last_seen_location' => 'sometimes|string|max:255',
            'last_seen_date' => 'sometimes|date',
            'physical_description' => 'sometimes|string',
            'circumstances' => 'sometimes|string',
            'offer_reward' => 'sometimes|boolean',
            'reward_amount' => 'nullable|numeric|min:0',
            'status' => 'sometimes|in:pending,approved,rejected,found',
        ]);

        $report->update($validated);

        return response()->json([
            'message' => 'Report updated successfully.',
            'report' => $report->load('media'),
        ]);
    }

    /**
     * Remove the specified report.
     */
    public function destroy($id)
    {
        $report = MissingReport::where('user_id', Auth::id())->findOrFail($id);
        $report->delete();

        return response()->json([
            'message' => 'Report deleted successfully.',
        ]);
    }

    /**
     * Flag a report (e.g., report as fake).
     */
    public function flag($id)
    {
        $report = MissingReport::findOrFail($id);
        
        $report->increment('flags_count');
        $report->update(['is_flagged' => true]);

        return response()->json([
            'message' => 'Report has been flagged. Thank you for your feedback.',
            'flags_count' => $report->flags_count,
        ]);
    }

    /**
     * ADMIN: Get all reports that have been flagged.
     */
    public function adminFlaggedIndex()
    {
        $reports = MissingReport::where('is_flagged', true)
            ->with(['user:id,first_name,last_name,email'])
            ->orderBy('flags_count', 'desc')
            ->paginate(20);

        return response()->json($reports);
    }
}
