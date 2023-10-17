<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;

class UserFactory extends Factory
{
    protected $model = User::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'gender' => fake()->randomElement(['male', 'female']),
            'password' => bcrypt('password', []), // password
            'birthday' => fake()->date(),
        ];
    }

//     /**
//      * Indicate that the model's email address should be unverified.
//      *
//      * @return \Illuminate\Database\Eloquent\Factories\Factory
//      */
//     public function unverified()
//     {
//         return $this->state(function (array $attributes) {
//             return [
//                 'email_verified_at' => null,
//             ];
//         });
//     }
}
