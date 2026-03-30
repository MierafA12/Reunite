<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use App\Models\Otp;


class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * Disable auto-incrementing since we use UUID.
     */
    public $incrementing = false;

    /**
     * The key type for the primary key.
     */
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role',
    ];

    /**
     * The accessors to append to the model's array form.
     */
    protected $appends = ['name', 'profile_image'];

    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    /**
     * Get the user's full name.
     */
    public function getNameAttribute()
    {
        return trim("{$this->first_name} {$this->last_name}");
    }

    /**
     * Get the user's profile image.
     */
    public function getProfileImageAttribute()
    {
        return $this->profile?->profile_image;
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Override the default email verification notification.
     */
    public function sendEmailVerificationNotification()
    {
        $otp = Otp::generate($this->email, 'registration');
        $this->notify(new \App\Notifications\OtpNotification($otp->otp_code));
    }

    /**
     * Set UUID on creation.
     */
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
}
