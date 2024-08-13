# Cómo Funciona

Hasta ahora, todo lo que he compartido aquí ha sido completamente abstracto. ¿Qué pasa con el código, preguntas? Profundicemos en una aplicación sencilla (Ejemplo 1-1) para que pueda ver cómo es realmente trabajar con Laravel día a día. 

Ejemplo 1-1. “Hello, World” en `routes/web.php`


```php
<?php
Route::get('/', function () {
    return 'Hello, World!';
});
```


La acción más simple posible que puede realizar en una aplicación Laravel es definir una ruta y devolver un resultado cada vez que alguien visita esa ruta. Si inicializa una aplicación Laravel nueva en su máquina, define la ruta en el Ejemplo 1-1 y luego sirve el sitio desde el directorio público, tendrá un ejemplo de "Hello, World!" completamente funcional (consulte la Figura 1- 1).

![img](../img/img1.png)

Se ve muy similar con los controladores, como puede ver en el Ejemplo 1-2 (que, si desea probar de inmediato, requiere que primero ejecute `php artisan make:controller WelcomeController` para crear el controlador).

Ejemplo 1-2. “Hello, World” con controladores

```php
// File: routes/web.php
<?php
use App\Http\Controllers\WelcomeController;

Route::get('/', [WelcomeController::class, 'index']);
```

```php
// File: app/Http/Controllers/WelcomeController.php
<?php
namespace App\Http\Controllers;

class WelcomeController extends Controller
{
    public function index()
    {
        return 'Hello, World!';
    }
}
```

Y si almacena sus saludos en una base de datos, también se verá bastante similar (consulte el Ejemplo 1-3).

Ejemplo 1-3. Saludo múltiple “Hello, World” con acceso a la base de datos


```php
// File: routes/web.php
<?php
use App\Greeting;

Route::get('create-greeting', function () {
    $greeting = new Greeting;
    $greeting->body = 'Hello, World!';
    $greeting->save();
});

Route::get('first-greeting', function () {
  return Greeting::first()->body;
});
```


```php
// File: app/Models/Greeting.php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Greeting extends Model
{
    use HasFactory;
}
```


```php
// File: database/migrations/2023_03_12_192110_create_greetings_table.php
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
        Schema::create('greetings', function (Blueprint $table) {
            $table->id();
            $table->string('body');
            $table->timestamps();
        });

    }
    
    /**
    * Reverse the migrations.
    */
    public function down(): void
    {
        Schema::dropIfExists('greetings');
    }
};
```

El ejemplo 1-3 puede resultar un poco abrumador y, de ser así, sáltelo. Aprenderá todo lo que sucede aquí en capítulos posteriores, pero ya puede ver que con solo unas pocas líneas de código, puede configurar migraciones y modelos de bases de datos y extraer registros. Es así de simple.