<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(AuthRequest $request)
    {
        try {
            return DB::transaction(function () use ($request) {
                $user = User::create([
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'role' => $request->role,
                ]);

                UserProfile::create([
                    'user_id' => $user->id,
                    'profile_image' => $request->profile_image,
                    'middle_name' => $request->middle_name,
                    'phone' => $request->phone,
                    'workplace' => $request->workplace,
                    'address' => $request->address,
                    'gender' => $request->gender,
                ]);

                $token = $user->createToken('auth_token')->plainTextToken;

                return response()->json([
                    'message' => 'User created successfully',
                    'user' => $user->load('profile'),
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'User registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
