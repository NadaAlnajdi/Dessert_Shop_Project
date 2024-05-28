<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Promotion extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'discount', 'start_date', 'end_date', 'is_active'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($promotion) {
            $promotion->slug = Str::slug($promotion->title);
        });

        static::updating(function ($promotion) {
            $promotion->slug = Str::slug($promotion->title);
        });
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'promotion_items', 'promotion_id', 'product_id');
    }
}
