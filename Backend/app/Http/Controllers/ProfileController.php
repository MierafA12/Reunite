<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

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
            'profile_image' => 'nullable', // Can be file or base64 or URL
        ]);

        try {
            DB::beginTransaction();

            $profileImageUrl = $user->profile?->profile_image;

            Log::debug('Profile Update FULL Request', [
                'all' => $request->all(),
                'files' => array_keys($request->allFiles()),
                'has_profile_image_file' => $request->hasFile('profile_image'),
                'profile_image_val' => $request->profile_image,
            ]);

            // Handle Profile Image Upload
            $imageInput = $request->profile_image;
            
            // If it's an array for some reason, take the first element
            if (is_array($imageInput)) {
                $imageInput = reset($imageInput);
            }

            if ($request->hasFile('profile_image')) {
                $file = $request->file('profile_image');
                if (is_array($file)) $file = reset($file);
                
                $result = Cloudinary::uploadApi()->upload($file->getRealPath(), [
                    'folder' => 'reunite/profiles',
                    'resource_type' => 'auto'
                ]);
                $profileImageUrl = $result['secure_url'] ?? $profileImageUrl;
                Log::info('File upload success', ['url' => $profileImageUrl]);
            } elseif ($imageInput && is_string($imageInput) && str_starts_with($imageInput, 'data:image')) {
                $result = Cloudinary::uploadApi()->upload($imageInput, [
                    'folder' => 'reunite/profiles',
                    'resource_type' => 'auto'
                ]);
                $profileImageUrl = $result['secure_url'] ?? $profileImageUrl;
                Log::info('Base64 upload success', ['url' => $profileImageUrl]);
            }

            // Update user core information
            $user->update([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
            ]);

            // Update or Create profile
            $profile = \App\Models\UserProfile::where('user_id', $user->id)->first();
            
            $profileData = [
                'middle_name'   => $validated['middle_name'] ?? null,
                'phone'         => $validated['phone'] ?? null,
                'workplace'     => $validated['workplace'] ?? null,
                'address'       => $validated['address'] ?? null,
                'gender'        => $validated['gender'] ?? null,
                'date_of_birth' => $validated['date_of_birth'] ?? null,
                'bio'           => $validated['bio'] ?? null,
                'profile_image' => $profileImageUrl,
            ];

            if ($profile) {
                $profile->update($profileData);
            } else {
                $profileData['user_id'] = $user->id;
                \App\Models\UserProfile::create($profileData);
            }

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
