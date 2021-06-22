<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Board;
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function testSeeders(){
      User::factory()->count(10)->has(Board::factory()->count(5),'boards')->create();
    }


    public function run()
    {
      $this->call(DatabaseSeeder::testSeeders());
    }
}
