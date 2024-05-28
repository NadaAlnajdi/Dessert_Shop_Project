<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = ['user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function calculatePrices()
    {
        $subtotal = 0;
        $total = 0;

        foreach ($this->cartItems as $item) {
            $product = $item->product;
            $originalPrice = $product->price;
            $priceAfterDiscount = $originalPrice;

            // Check for any active promotions for this product
            $promotion = $product->promotions()
                ->where('is_active', true)
                ->where('start_date', '<=', now())
                ->where('end_date', '>=', now())
                ->first();

            if ($promotion) {
                $priceAfterDiscount = $originalPrice - ($originalPrice * ($promotion->discount / 100));
            }

            $subtotal += $originalPrice * $item->quantity;
            $total += $priceAfterDiscount * $item->quantity;
        }

        return ['subtotal' => $subtotal, 'total' => $total];
    }
}
