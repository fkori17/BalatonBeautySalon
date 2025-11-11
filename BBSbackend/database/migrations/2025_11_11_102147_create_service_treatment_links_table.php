<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use League\CommonMark\Reference\Reference;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_treatment_links', function (Blueprint $table) {
            $table->foreignId("treatment_id")->constrained('treatments', 'id');
            $table->foreignId("service_id")->constrained('services', 'id');
            $table->integer("piece");
        });
    }   

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_treatment_links');
    }
};
