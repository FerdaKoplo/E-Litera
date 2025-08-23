<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Article::class;

    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'title_article' => $this->faker->sentence(6),
            'article_text_content' => $this->faker->paragraphs(5, true),
            'images' => $this->faker->boolean(50)
                ? json_encode([$this->faker->imageUrl(640, 480, 'nature'), $this->faker->imageUrl(640, 480, 'tech')])
                : null,
        ];
    }
}
