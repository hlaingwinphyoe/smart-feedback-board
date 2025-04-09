<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feedback>
 */
class FeedbackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->name(),
            'description' => fake()->sentence(30),
            'user_id' => User::all()->random()->id,
            'created_at' => fake()->dateTimeBetween('-1 week', 'now'),
            'updated_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ];
    }
}
