<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            ['name' => 'Cakes', 'description' => 'Various types of cakes'],
            ['name' => 'Cookies', 'description' => 'Delicious cookies'],
            ['name' => 'Ice Cream', 'description' => 'Various flavors of ice cream'],
            ['name' => 'Pastries', 'description' => 'Fresh pastries'],
            ['name' => 'Beverages', 'description' => 'Refreshing beverages'],
        ];

        foreach ($categories as &$category) {
            $category['slug'] = Str::slug($category['name']);
            $category['created_at'] = Carbon::now();
            $category['updated_at'] = Carbon::now();
        }

        DB::table('categories')->insert($categories);
    }
}

