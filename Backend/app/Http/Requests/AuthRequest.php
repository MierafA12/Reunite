<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        if ($this->is('*/login')) {
            return [
                'email' => ['required', 'email', 'string'],
                'password' => ['required', 'string'],
            ];
        }

        return [
            'first_name' => ['required', 'string', 'min:2', 'max:255'],
            'last_name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'in:user,admin,moderator'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'phone' => ['required', 'string', 'min:10', 'max:20', 'unique:user_profiles,phone'],
            'workplace' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'in:male,female'],
            'profile_image' => ['nullable', 'string'],
        ];
    }
}
