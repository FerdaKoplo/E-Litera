<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Create roles
        $visitorRole = Role::create(['name' => 'visitor']);
        $memberRole = Role::create(['name' => 'member']);
        $librarianRole = Role::create(['name' => 'librarian']);
        $superAdminRole = Role::create(['name' => 'super-admin']);

        // Create permissions
        $createCategories = Permission::create(['name' => 'create categories']);
        $editCategories = Permission::create(['name' => 'edit categories']);
        $deleteCategories = Permission::create(['name' => 'delete categories']);
        $viewCategories = Permission::create(['name' => 'view categories']);

        // Assign permissions to roles
        $librarianRole->givePermissionTo([$createCategories, $editCategories, $viewCategories]);
        $superAdminRole->givePermissionTo(Permission::all());
    }
}
