<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $categoryIDs = \App\Models\Category::pluck('id');
        return [
            'title' => $this->faker->text(20),
            'content' => $this->faker->paragraph(5, true),
            'category_id' => $this->faker->randomElement($categoryIDs),
        ];
    }
}
