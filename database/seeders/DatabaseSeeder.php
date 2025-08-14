<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $visitorRole = Role::create(['name' => 'visitor']);
        $memberRole = Role::create(['name' => 'member']);
        $librarianRole = Role::create(['name' => 'librarian']);
        $superAdminRole = Role::create(['name' => 'super-admin']);

        $visitor = User::create([
            'name' => 'Visitor User',
            'email' => 'visitor@example.com',
            'password' => bcrypt('password'),
        ]);
        $visitor->assignRole($visitorRole);

        $member = User::create([
            'name' => 'Member User',
            'email' => 'member@example.com',
            'password' => bcrypt('password'),
        ]);
        $member->assignRole($memberRole);

        $librarian = User::create([
            'name' => 'Librarian User',
            'email' => 'librarian@example.com',
            'password' => bcrypt('password'),
        ]);
        $librarian->assignRole($librarianRole);

        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);
        $superAdmin->assignRole($superAdminRole);
    }
}
