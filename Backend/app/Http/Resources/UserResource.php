<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'role' => $this->role,
            'profile_image' => $this->profile?->profile_image 
                ? (Str::startsWith($this->profile->profile_image, ['http://', 'https://']) 
                    ? $this->profile->profile_image 
                    : Storage::url($this->profile->profile_image)) 
                : null,
            'middle_name' => $this->profile?->middle_name ?? null,
            'phone' => $this->profile?->phone ?? null,
            'workplace' => $this->profile?->workplace ?? null,
            'address' => $this->profile?->address ?? null,
            'gender' => $this->profile?->gender ?? null,
            'date_of_birth' => $this->profile?->date_of_birth ?? null,
            'bio' => $this->profile?->bio ?? null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
