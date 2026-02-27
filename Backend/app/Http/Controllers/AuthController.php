<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    public function register(AuthRequest $request)
    {
        try {
            return DB::transaction(function () use ($request) {
                $validated = $request->validated();

                $user = User::create([
                    'first_name' => $validated['first_name'],
                    'last_name' => $validated['last_name'],
                    'email' => $validated['email'],
                    'password' => Hash::make($validated['password']),
                    'role' => $validated['role'],
                ]);

                UserProfile::create([
                    'user_id' => $user->id,
                    'profile_image' => $validated['profile_image'] ?? null,
                    'middle_name' => $validated['middle_name'] ?? null,
                    'phone' => $validated['phone'],
                    'workplace' => $validated['workplace'] ?? null,
                    'address' => $validated['address'] ?? null,
                    'gender' => $validated['gender'] ?? null,
                ]);

                event(new Registered($user));

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
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }
    public function login(AuthRequest $request)
    {
        try {
            $validated = $request->validated();

            $user = User::where('email', $validated['email'])->first();

            if (!$user || !Hash::check($validated['password'], $user->password)) {
                return response()->json([
                    'message' => 'Invalid credentials'
                ], 401);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'user' => $user->load('profile'),
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
