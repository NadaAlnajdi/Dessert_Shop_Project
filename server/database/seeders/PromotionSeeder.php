<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\Product;
use App\Models\Promotion;

class PromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $promotions = [
            [
                'title' => 'Spring Sale',
                'description' => 'Get 20% off on all items this spring!',
                'discount' => 20,
                'start_date' => Carbon::now()->subDays(10),
                'end_date' => Carbon::now()->addDays(10),
                'is_active' => true
            ],
            [
                'title' => 'Summer Blowout',
                'description' => 'Hot deals for the summer!',
                'discount' => 30,
                'start_date' => Carbon::now()->addDays(5),
                'end_date' => Carbon::now()->addDays(20),
                'is_active' => true
            ],
            [
                'title' => 'Holiday Specials',
                'description' => 'Celebrate the holidays with special discounts!',
                'discount' => 25,
                'start_date' => Carbon::now()->addDays(15),
                'end_date' => Carbon::now()->addDays(30),
                'is_active' => false
            ],
        ];

        foreach ($promotions as &$promotion) {
            $promotion['slug'] = Str::slug($promotion['title']);
            $promotion['created_at'] = Carbon::now();
            $promotion['updated_at'] = Carbon::now();
        }

        DB::table('promotions')->insert($promotions);

        // Attach products to promotions if products exist
        $allProducts = Product::all();
        if ($allProducts->count() > 0) {
            $promotionRecords = Promotion::all();
            foreach ($promotionRecords as $promotion) {
                $promotion->products()->attach($allProducts->random(rand(1, min(3, $allProducts->count())))->pluck('id')->toArray());
            }
        }
    }
}


