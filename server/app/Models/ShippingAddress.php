<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingAddress extends Model
{
    use HasFactory;

    
    protected $fillable = ['user_id', 'city', 'state', 'street', 'phone_number'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
