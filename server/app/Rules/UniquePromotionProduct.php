<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class UniquePromotionProduct implements Rule
{
    protected $promotionId;

    public function __construct($promotionId = null)
    {
        $this->promotionId = $promotionId;
    }

    public function passes($attribute, $value)
    {
        $query = DB::table('promotion_items')
            ->join('promotions', 'promotion_items.promotion_id', '=', 'promotions.id')
            ->whereIn('promotion_items.product_id', $value)
            ->where('promotions.is_active', true)
            ->where('promotions.end_date', '>=', now());

        if ($this->promotionId) {
            // Exclude the current promotion's products if updating
            $query->where('promotion_items.promotion_id', '!=', $this->promotionId);
        }

        return !$query->exists();
    }

    public function message()
    {
        return 'One or more products are already associated with another active promotion.';
    }
}

