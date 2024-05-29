<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Product;
use App\Models\ShippingAddress;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    public function run()
    {
        $numberOfOrders = 10;

        for ($i = 0; $i < $numberOfOrders; $i++) {
            $order = Order::factory()->create();

            $products = Product::inRandomOrder()->limit(rand(1, 10))->get();

            foreach ($products as $product) {
                $quantity = rand(1, 5);
                $price = $product->price * $quantity;

                DB::table('order_items')->insert([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $price,
                ]);
            }

            $shippingAddress = ShippingAddress::inRandomOrder()->first();
            $order->shippingAddress()->associate($shippingAddress);
            $order->save();
        }
    }
}


