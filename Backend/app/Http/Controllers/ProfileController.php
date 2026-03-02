<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    /**
     * Get the authenticated user's profile.
     */
    public function show(Request $request)
    {
        return response()->json([
            'user' => $request->user()->load('profile'),
        ]);
    }

    /**
     * Update the authenticated user's profile.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'workplace' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'gender' => 'nullable|string|in:male,female,other',
            'date_of_birth' => 'nullable|date',
            'bio' => 'nullable|string',
            'profile_image' => 'nullable|string', // Handles base64 strings or URLs
        ]);

        try {
            DB::beginTransaction();

            // Update user core information
            $user->update([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
            ]);

            // Update or create user profile details
            $user->profile()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'middle_name' => $validated['middle_name'] ?? null,
                    'phone' => $validated['phone'] ?? null,
                    'workplace' => $validated['workplace'] ?? null,
                    'address' => $validated['address'] ?? null,
                    'gender' => $validated['gender'] ?? null,
                    'date_of_birth' => $validated['date_of_birth'] ?? null,
                    'bio' => $validated['bio'] ?? null,
                    'profile_image' => $validated['profile_image'] ?? $user->profile?->profile_image,
                ]
            );

            DB::commit();

            return response()->json([
                'message' => 'Profile updated successfully',
                'user' => $user->fresh()->load('profile'),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Profile Update Error: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Profile update failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
