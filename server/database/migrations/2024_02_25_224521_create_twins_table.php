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
            Schema::create('twins', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->string('owner');
                $table->string("text")->nullable;
                $table->integer("likes")->nullable;
                $table->integer("comments")->nullable;
                $table->timestamps();
            });
        }

        public function down(): void
        {
            Schema::dropIfExists('twins');
        }
    };
