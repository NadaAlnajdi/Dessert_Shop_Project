<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); 
            $table->bigInteger('date');
            $table->float('total_price'); 
            $table->enum('status', ['pending', 'accepted', 'rejected']); 
            $table->unsignedBigInteger('shipping_address'); 
            $table->timestamps();

            $table->foreign('shipping_address')->references('id')->on('shipping_addresses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
