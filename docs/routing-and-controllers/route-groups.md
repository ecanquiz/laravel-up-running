# Grupos de Ruta

A menudo, un grupo de rutas comparte una característica particular — un determinado requisito de autenticación, un prefijo de ruta o quizás un espacio de nombres de controlador. Definir estas características compartidas una y otra vez en cada ruta no solo parece tedioso, sino que también puede enturbiar la forma de su archivo de rutas y oscurecer algunas de las estructuras de su aplicación.

Los _grupos de rutas_ le permiten reducir esta duplicación al agrupar varias rutas y aplicar cualquier configuración compartida una sola vez a todo el grupo. Además, los grupos de rutas son señales visuales para los futuros desarrolladores (y para su propio cerebro) de que estas rutas están agrupadas.

Para agrupar dos o más rutas, “rodee” las definiciones de ruta con un grupo de rutas, como se muestra en el siguiente ejemplo. En realidad, se pasa una clausura a la definición del grupo y se definen las rutas agrupadas dentro de esa clausura.

_Definición de un grupo de rutas_
```php
Route::group(function () {
    Route::get('hello', function () {
        return 'Hello';
    });
    Route::get('world', function () {
        return 'World';
    });
});
```

De forma predeterminada, un grupo de rutas no hace nada. No hay diferencia entre usar el grupo en el ejemplo anterior y separar un segmento de las rutas con comentarios de código.

## Middleware

Probablemente el uso más común de los grupos de rutas es aplicar _middleware_ a un grupo de rutas. Aprenderá más sobre middleware [aquí](../requests-responses-and-middleware/laravel-s-request-lifecycle.html#ciclo-de-vida-de-solicitud-en-laravel), pero, entre otras cosas, es lo que Laravel usa para autenticar usuarios y restringir que los usuarios invitados utilicen ciertas partes de un sitio.

En el ejemplo siguiente, estamos creando un grupo de rutas en torno a las vistas del panel y de la cuenta, y aplicando el middleware de autenticación a ambas. En este ejemplo, esto significa que los usuarios deben iniciar sesión en la aplicación para ver el panel o la página de la cuenta.

_Restringir un grupo de rutas solo a usuarios que hayan iniciado sesión_
```php
Route::middleware('auth')->group(function() {
    Route::get('dashboard', function () {
        return view('dashboard');
    });
    Route::get('account', function () {
        return view('account');
    });
});
```

A menudo, resulta más claro y directo adjuntar middleware a las rutas en el controlador en lugar de hacerlo en la definición de la ruta. Puede hacerlo llamando al método `middleware()` en el constructor de su controlador. La cadena que pasa al método `middleware()` es el nombre del middleware y, opcionalmente, puede encadenar métodos modificadores (`only()` y `except()`) para definir qué métodos recibirán ese middleware:


```php
class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');

        $this->middleware('admin-auth')
            ->only('editUsers');

        $this->middleware('team-member')
            ->except('editUsers');
    }
}
```

Tenga en cuenta que si realiza muchas personalizaciones `only()` y `except()`, eso suele ser una señal de que debe utilizar un nuevo controlador para las rutas excepcionales.

>**Una Breve Introducción a Eloquent**
>
>Cubriremos Eloquent, el acceso a bases de datos y el generador de consultas de Laravel en profundidad [aquí](../databases-and-eloquent/configuration.html), pero habrá algunas referencias hasta ahora que harán que una comprensión básica sea útil.
>
>Eloquent es el mapeador relacional de objetos de base de datos _ActiveRecord_ (ORM) de Laravel, que facilita la relación de una clase `Post` (modelo) con la tabla de base de datos `posts` y la obtención de todos los registros con una llamada como `Post::all()`.
>
>El generador de consultas es la herramienta que permite realizar llamadas como `Post::where('active', true)->get()` o incluso `DB::table('users')->all()`. Estás construyendo una consulta encadenando métodos uno tras otro.

## Path Prefixes