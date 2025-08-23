<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Location;
use App\Models\Publication;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Publication>
 */
class PublicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Publication::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence(4),
            'author' => $this->faker->name(),
            'type' => $this->faker->randomElement(['ebook', 'physical', 'journal']),
            'category_id' => Category::inRandomOrder()->first()->id,
            'publication_description' => $this->faker->paragraph(3),
            'location_id' => Location::inRandomOrder()->first()->id,
            'download_count' => $this->faker->numberBetween(0, 500),
            'pdf_url' => $this->faker->boolean(70) ? $this->faker->url() : null,
            'image_url' => $this->faker->imageUrl(400, 600, 'books'),
        ];
    }
}
