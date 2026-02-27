<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Otp extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'identifier',
        'otp_code',
        'action',
        'expires_at',
        'used_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'used_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    public static function generate(string $identifier, string $action, int $expirySeconds = 120)
    {
        $identifier = trim($identifier);

        // Invalidate ALL previous OTPs for the same identifier and action
        static::query()
            ->where('identifier', $identifier)
            ->where('action', $action)
            ->delete();

        return static::query()->create([
            'identifier' => $identifier,
            'otp_code' => str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT),
            'action' => $action,
            'expires_at' => now()->addSeconds($expirySeconds),
        ]);
    }

    public static function isValid(string $identifier, string $action, string $code): bool
    {
        $otp = self::where('identifier', $identifier)
            ->where('action', $action)
            ->where('otp_code', $code)
            ->where('used_at', null)
            ->where('expires_at', '>', now())
            ->first();

        if ($otp) {
            $otp->update(['used_at' => now()]);
            return true;
        }

        return false;
    }
}
