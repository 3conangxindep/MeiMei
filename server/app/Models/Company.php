<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    use SoftDeletes; // 論理削除の場合

<<<<<<< HEAD
    protected $table = 'company';
    protected $primaryKey = 'id_card';
=======
    protected $table ='company';
    protected $primaryKey='id_card';
>>>>>>> 5644c4466969afe0214d8f60170aaaca6c6f4e04
    protected $fillable = [
        'id_card',
        'com_name',
        'com_tel',
        'com_fax',
        'com_email',
        'com_post_code',
        'com_address',
        'department',
        'position',
        'website',
    ];
}
