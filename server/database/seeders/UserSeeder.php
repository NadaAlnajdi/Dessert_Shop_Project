<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'john.doe@example.com',
                'password' => bcrypt('password'),
                'image' => 'https://via.placeholder.com/150',
                'gender' => 'male',
            ],
            [
                'first_name' => 'Jane',
                'last_name' => 'Doe',
                'email' => 'jane.doe@example.com',
                'password' => bcrypt('password'),
                'image' => 'https://via.placeholder.com/150',
                'gender' => 'female',
            ],
            [
                'first_name' => 'Mohamed',
                'last_name' => 'Ahmed',
                'email' => 'mohamed.ahmed@example.com',
                'password' => bcrypt('password'),
                'image' => 'https://via.placeholder.com/150',
                'gender' => 'male',
            ],
            [
                'first_name' => 'Marwa',
                'last_name' => 'Ali',
                'email' => 'marwa.ali@example.com',
                'password' => bcrypt('password'),
                'image' => 'https://via.placeholder.com/150',
                'gender' => 'female',
            ],
            [
                'first_name' => 'Ahmed',
                'last_name' => 'Mohamed',
                'email' => 'ahmed.mohamed@example.com',
                'password' => bcrypt('password'),
                'image' => 'https://via.placeholder.com/150',
                'gender' => 'male',
            ],
        ];

        foreach ($users as $userData) {
            User::create($userData);
        }
    }
}
