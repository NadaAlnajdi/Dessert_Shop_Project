<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'price', 'stock_quantity', 'description', 'category_id'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            $product->slug = Str::slug($product->title);
        });

        static::updating(function ($product) {
            $product->slug = Str::slug($product->title);
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function wishlist()
    {
        return $this->belongsToMany(Wishlist::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function promotions()
    {
        return $this->belongsToMany(Promotion::class, 'promotion_items', 'product_id', 'promotion_id');
    }
}


