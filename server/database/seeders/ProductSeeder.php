<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = Category::all();

        foreach ($categories as $category) {
            switch ($category->name) {
                case 'Cakes':
                    $this->seedCakes($category->id);
                    break;
                case 'Cookies':
                    $this->seedCookies($category->id);
                    break;
                case 'Ice Cream':
                    $this->seedIceCream($category->id);
                    break;
                case 'Pastries':
                    $this->seedPastries($category->id);
                    break;
                case 'Beverages':
                    $this->seedBeverages($category->id);
                    break;
            }
        }
    }

    private function seedCakes($categoryId)
    {
        $products = [
            ['title' => 'Chocolate Cake', 'description' => 'Rich chocolate cake', 'price' => 15.99, 'stock_quantity' => 50, 'category_id' => $categoryId],
            ['title' => 'Vanilla Cake', 'description' => 'Classic vanilla cake', 'price' => 14.99, 'stock_quantity' => 60, 'category_id' => $categoryId],
            ['title' => 'Red Velvet Cake', 'description' => 'Delicious red velvet cake', 'price' => 16.99, 'stock_quantity' => 40, 'category_id' => $categoryId],
        ];

        foreach ($products as &$product) {
            $product['slug'] = Str::slug($product['title']);
            $product['created_at'] = Carbon::now();
            $product['updated_at'] = Carbon::now();
        }

        DB::table('products')->insert($products);
    }

    private function seedCookies($categoryId)
    {
        $products = [
            ['title' => 'Chocolate Chip Cookies', 'description' => 'Classic chocolate chip cookies', 'price' => 5.99, 'stock_quantity' => 100, 'category_id' => $categoryId],
            ['title' => 'Oatmeal Raisin Cookies', 'description' => 'Healthy oatmeal raisin cookies', 'price' => 6.99, 'stock_quantity' => 80, 'category_id' => $categoryId],
            ['title' => 'Peanut Butter Cookies', 'description' => 'Tasty peanut butter cookies', 'price' => 6.49, 'stock_quantity' => 90, 'category_id' => $categoryId],
        ];

        foreach ($products as &$product) {
            $product['slug'] = Str::slug($product['title']);
            $product['created_at'] = Carbon::now();
            $product['updated_at'] = Carbon::now();
        }

        DB::table('products')->insert($products);
    }

    private function seedIceCream($categoryId)
    {
        $products = [
            ['title' => 'Vanilla Ice Cream', 'description' => 'Creamy vanilla ice cream', 'price' => 3.99, 'stock_quantity' => 100, 'category_id' => $categoryId],
            ['title' => 'Chocolate Ice Cream', 'description' => 'Rich chocolate ice cream', 'price' => 4.49, 'stock_quantity' => 90, 'category_id' => $categoryId],
            ['title' => 'Strawberry Ice Cream', 'description' => 'Fresh strawberry ice cream', 'price' => 4.19, 'stock_quantity' => 80, 'category_id' => $categoryId],
        ];

        foreach ($products as &$product) {
            $product['slug'] = Str::slug($product['title']);
            $product['created_at'] = Carbon::now();
            $product['updated_at'] = Carbon::now();
        }

        DB::table('products')->insert($products);
    }

    private function seedPastries($categoryId)
    {
        $products = [
            ['title' => 'Croissant', 'description' => 'Flaky butter croissant', 'price' => 2.99, 'stock_quantity' => 70, 'category_id' => $categoryId],
            ['title' => 'Danish Pastry', 'description' => 'Delicious Danish pastry', 'price' => 3.49, 'stock_quantity' => 60, 'category_id' => $categoryId],
            ['title' => 'Muffin', 'description' => 'Freshly baked muffin', 'price' => 2.49, 'stock_quantity' => 80, 'category_id' => $categoryId],
        ];

        foreach ($products as &$product) {
            $product['slug'] = Str::slug($product['title']);
            $product['created_at'] = Carbon::now();
            $product['updated_at'] = Carbon::now();
        }

        DB::table('products')->insert($products);
    }

    private function seedBeverages($categoryId)
    {
        $products = [
            ['title' => 'Coffee', 'description' => 'Hot brewed coffee', 'price' => 1.99, 'stock_quantity' => 100, 'category_id' => $categoryId],
            ['title' => 'Tea', 'description' => 'Refreshing tea', 'price' => 1.49, 'stock_quantity' => 100, 'category_id' => $categoryId],
            ['title' => 'Smoothie', 'description' => 'Fresh fruit smoothie', 'price' => 3.99, 'stock_quantity' => 60, 'category_id' => $categoryId],
        ];

        foreach ($products as &$product) {
            $product['slug'] = Str::slug($product['title']);
            $product['created_at'] = Carbon::now();
            $product['updated_at'] = Carbon::now();
        }

        DB::table('products')->insert($products);
    }
}
