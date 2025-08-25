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

        // Create Category
        $createCategories = Permission::create(['name' => 'create categories']);
        $editCategories = Permission::create(['name' => 'edit categories']);
        $deleteCategories = Permission::create(['name' => 'delete categories']);
        $viewCategories = Permission::create(['name' => 'view categories']);

        // Create Location
        $createLocations = Permission::create(['name' => 'create locations']);
        $editLocations = Permission::create(['name' => 'edit locations']);
        $deleteLocations = Permission::create(['name' => 'delete locations']);
        $viewLocations = Permission::create(['name' => 'view locations']);

        // Create Publications
        $createPublications = Permission::create(['name' => 'create publications']);
        $editPublications = Permission::create(['name' => 'edit publications']);
        $deletePublications = Permission::create(['name' => 'delete publications']);
        $viewPublications = Permission::create(['name' => 'view publications']);

        // Create Loans
        $createLoans = Permission::create(['name' => 'create loans']);
        $editLoans = Permission::create(['name' => 'edit loans']);
        $viewLoans = Permission::create(['name' => 'view loans']);


        // Create Articles
        $createArticles = Permission::create(['name' => 'create articles']);
        $editArticles = Permission::create(['name' => 'edit articles']);
        $deleteArticles = Permission::create(['name' => 'delete articles']);
        $viewArticles = Permission::create(['name' => 'view articles']);

        $permissionsLibrarian = [
            $createCategories,
            $editCategories,
            $viewCategories,

            $createPublications,
            $editPublications,
            $viewPublications,

            $createArticles,
            $editArticles,
            $viewArticles,

            $createLocations,
            $editLocations,
            $viewLocations,

            $viewLoans,
            $editLoans
        ];

        $permissionsMember = [
            $viewPublications,
            $viewArticles,

            $createLoans,

        ];


        // Assign permissions to roles
        $librarianRole->givePermissionTo($permissionsLibrarian);
        $memberRole->givePermissionTo($permissionsMember);
        $superAdminRole->givePermissionTo(Permission::all());
    }
}
