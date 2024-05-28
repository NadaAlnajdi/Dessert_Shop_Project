<?php

namespace Database\Seeders;

use App\Models\ShippingAddress;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ShippingAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 5; $i++) {
            ShippingAddress::create([
                'user_id' => $faker->numberBetween(1, 5),
                'city' => $faker->city(),
                'state' => $faker->stateAbbr(),
                'street' => $faker->streetAddress(),
                'phone_number' => $faker->phoneNumber(),
            ]);
        }
    }
}
