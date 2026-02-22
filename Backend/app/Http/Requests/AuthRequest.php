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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            
            'first_name'=>['required','min:3','string','max:255'],
            'last_name'=>['required','min:3','string','max:255'],
            'email'=>['required','email','unique:users,email'],
            'password'=>['required','min:8','confirmed'],
            'role'=>['required','in:user,admin,moderator'],
            'middle_name'=>['required','min:3','string','max:255'],
            'phone'=>['required','min:10','max:15','unique:user_profiles,phone'],
            'workplace'=>['required','min:3','string','max:255'],
            'address'=>['required','min:3','string','max:255'],
           
        ];
    }
}
