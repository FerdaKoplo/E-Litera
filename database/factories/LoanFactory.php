<?php

namespace Database\Factories;

use App\Models\Loan;
use App\Models\Publication;
use App\Models\User;
use Arr;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Loan>
 */
class LoanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Loan::class;
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('-1 month', 'now');
        $dueDate = (clone $startDate)->modify('+14 days');

        return [
            'user_id' => User::factory(),
            'publication_id' => Publication::factory(),
            'start_date' => $startDate->format('Y-m-d'),
            'due_date' => $dueDate->format('Y-m-d'),
            'status' => Arr::random(['borrowed', 'returned', 'overdue', 'pending']),
            'fine_amount' => $this->faker->randomFloat(2, 0, 50),
            'created_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];
    }
}
