<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Get the current authenticated user's profile.
     */
    public function show(Request $request)
    {
        return new UserResource($request->user()->load('profile'));
    }

    /**
     * Get a specific user's public profile.
     */
    public function showPublic(User $user)
    {
        return new UserResource($user->load('profile'));
    }
}
