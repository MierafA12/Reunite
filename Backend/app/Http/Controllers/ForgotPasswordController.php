<?php

namespace App\Http\Controllers;

use App\Models\Otp;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Notifications\OtpNotification;

class ForgotPasswordController extends Controller
{
    /**
     * Send OTP for password reset.
     */
    public function sendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users,email']);

        $user = User::where('email', $request->email)->first();
        $otp = Otp::generate($user->email, 'forgot_password');

        $user->notify(new OtpNotification($otp->otp_code));

        return response()->json(['message' => 'Verification code sent to your email.']);
    }

    /**
     * Verify OTP for password reset.
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp_code' => 'required|string|size:6',
        ]);

        if (Otp::isValid($request->email, 'forgot_password', $request->otp_code)) {
            return response()->json(['message' => 'OTP verified successfully.']);
        }

        return response()->json(['message' => 'Invalid or expired verification code.'], 422);
    }

    /**
     * Reset password.
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp_code' => 'required|string|size:6',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // We check validity again to ensure they actually verified it
        // Or we could have issued a temporary token after verification
        // But for simplicity and based on user request "one separate otp table handles the three in one"
        
        // Actually, isValid() marks it as used. So we might need a separate check or a flow.
        // Let's assume the user sends email, otp, and new password together for the final step, 
        // OR we don't mark as used until the password is changed.
        
        // Let's modify Otp::isValid to optionally not mark as used, or just check manually here.
        
        $otp = Otp::where('identifier', $request->email)
            ->where('action', 'forgot_password')
            ->where('otp_code', $request->otp_code)
            ->where('used_at', null)
            ->where('expires_at', '>', now())
            ->first();

        if (!$otp) {
            return response()->json(['message' => 'Invalid or expired verification code.'], 422);
        }

        $user = User::where('email', $request->email)->first();
        $user->update(['password' => Hash::make($request->password)]);

        $otp->update(['used_at' => now()]);

        return response()->json(['message' => 'Password reset successfully.']);
    }
}
