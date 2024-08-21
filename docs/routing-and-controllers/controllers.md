# Controladores

He mencionado los controladores varias veces, pero hasta ahora, la mayoría de los ejemplos han mostrado clausuras de rutas. En el patrón MVC, los controladores son esencialmente clases que organizan la lógica de una o más rutas juntas en un solo lugar. Los controladores tienden a agrupar rutas similares, especialmente si su aplicación está estructurada en un formato tradicional similar a CRUD; en este caso, un controlador podría manejar todas las acciones que se pueden realizar en un recurso en particular.

:::info ¿Qué es CRUD?
CRUD significa _create_, _read_, _update_ y _delete_, que son las cuatro operaciones principales que las aplicaciones web suelen ofrecer sobre un recurso. Por ejemplo, puedes crear una nueva entrada de blog, leerla, actualizarla o eliminarla.
:::

Puede resultar tentador incluir toda la lógica de la aplicación en los controladores, pero es mejor pensar en los controladores como los policías de tráfico que dirigen las solicitudes HTTP por toda la aplicación. Dado que existen otras formas en las que las solicitudes pueden llegar a la aplicación — trabajos cron, llamadas a la línea de comandos de Artisan, trabajos en cola, etc. — es aconsejable no depender demasiado de los controladores para el comportamiento. Esto significa que el trabajo principal de un controlador es capturar la intención de una solicitud HTTP y pasarla al resto de la aplicación.

Por lo tanto, creemos un controlador. Una forma sencilla de hacerlo es con un comando de Artisan, por lo que desde la línea de comandos, ejecute lo siguiente:

```sh
php artisan make:controller TaskController
```

:::info Artisan y generadores de Artisan

Laravel incluye una herramienta de línea de comandos llamada Artisan.
Artisan se puede utilizar para ejecutar migraciones, crear usuarios y otros registros de bases de datos manualmente y realizar muchas otras tareas manuales que se realizan una sola vez.

Bajo el espacio de nombres `make`, Artisan proporciona herramientas para generar archivos de esqueleto para una variedad de archivos del sistema. Eso es lo que nos permite ejecutar `php artisan make:controller`.

Para obtener más información sobre esta y otras características de Artisan, consulte [aquí](../artisan-and-tinker/an-introduction-to-artisan.html).
:::

Esto creará un nuevo archivo llamado `TaskController.php` en `app/Http/Controllers`, con el contenido que se muestra en el siguiente ejemplo.

_Controlador generado por defecto_
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TaskController extends Controller
{
//
}
```

Modifique este archivo como se muestra en el ejemplo siguiente, creando un nuevo método público llamado `index()`. Solo devolveremos algo de texto allí.

_Ejemplo de controlador simple_
```php
<?php

namespace App\Http\Controllers;

class TaskController extends Controller
{

    public function index()
    {
        return 'Hello, World!';
    }
}
```

Luego, como aprendimos antes, conectaremos una ruta a él, como se muestra en el ejemplo siguiente.

_Ruta para el controlador simple_
```php
// routes/web.php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::get('/', [TaskController::class, 'index']);
```

Eso es todo. Visita la ruta `/` y verás las palabras _“Hello, World!”_

El uso más común de un método controlador, entonces, será algo como el ejemplo siguiente, que proporciona la misma funcionalidad que nuestro [ejemplo de clausura de ruta](./views.html#pasando-variables-a-las-vistas).

_Ejemplo de método de controlador común_
```php
// TaskController.php
...
public function index()
{
    return view('tasks.index')
        ->with('tasks', Task::all());
}
```

Este método controlador carga la vista `resources/views/tasks/index.blade.php` o `resources/views/tasks/index.php` y le pasa una única variable llamada `tasks`, que contiene el resultado del método Eloquent `Task::all()`.

:::info Generación de Controladores de Recursos
Si desea crear un controlador de recursos con métodos generados automáticamente para todas las rutas de recursos básicas como `create()` y `update()`, puede pasar el indicador `--resource` al usar `php artisan make:controller`:
```sh
php artisan make:controller TaskController --resource
```
:::

## Getting User Input

## Controladores de Recursos