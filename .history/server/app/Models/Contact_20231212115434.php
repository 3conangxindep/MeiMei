<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'contact';
    protected $primaryKey = 'id_card';
    public $timestamps = true; // Thêm dòng này để Laravel biết rằng nó nên tự động quản lý timestamps

    protected $fillable = [
        'id_card',
        'contact_id',
        // Bạn cũng có thể thêm các trường khác mà bạn muốn điền
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
