<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'price', 'stock_quantity', 'description', 'category_id'];

    public function product()
    {
        return $this->belongsTo(Category::class);
    }
  
    public function wishlist()
    {
        return $this->belongsToMany(Wishlist::class);
    }
}
