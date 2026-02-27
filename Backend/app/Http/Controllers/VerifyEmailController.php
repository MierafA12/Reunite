<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Otp;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Auth\Events\Verified;

class VerifyEmailController extends Controller
{
    /**
     * Verify the user's email using the provided OTP.
     */
    public function verify(Request $request)
    {
        $request->validate([
            'otp_code' => 'required|string|size:6',
        ]);

        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified.'], 400);
        }

        if (!Otp::isValid($user->email, 'registration', $request->otp_code)) {
            return response()->json(['message' => 'Invalid or expired verification code.'], 422);
        }

        $user->markEmailAsVerified();
        
        event(new Verified($user));

        return response()->json(['message' => 'Email has been verified.']);
    }

    /**
     * Resend the email verification OTP.
     */
    public function resend(Request $request)
    {
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified.'], 400);
        }

        $user->sendEmailVerificationNotification();

        return response()->json(['message' => 'A new verification code has been sent.']);
    }
}
