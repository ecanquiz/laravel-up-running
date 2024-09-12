# Compositores de Vistas e Inyección de Servicios

Como cubrimos en [Enrutamiento y Controladores](../routing-and-controllers/a-quick-intro-to-mvc-the-http-verbs-and-rest.html#enrutamiento-y-controladores), es sencillo pasar datos a nuestras vistas desde la definición de ruta (ver ejemplo siguiente).

_Recordatorio de cómo pasar datos a las vistas_
```php
Route::get('passing-data-to-views', function () {
    return view('dashboard')
        ->with('key', 'value');
});
```

Sin embargo, puede haber ocasiones en las que pases los mismos datos una y otra vez a varias vistas. O tal vez uses un encabezado parcial o algo similar que requiera algunos datos; ¿tendrás que pasar esos datos desde cada definición de ruta que pueda cargar ese encabezado parcial?

## Vinculación de Datos a Vistas Mediante Compositores de Vista

Afortunadamente, existe una forma más sencilla. La solución se llama _view composer_ y permite definir que _cada vez que se carga una vista en particular, se le deben pasar ciertos datos_, sin que la definición de ruta tenga que pasar esos datos explícitamente.

Digamos que tienes una barra lateral en cada página, que se define en un archivo parcial llamado `partials.sidebar` (_resources/views/partials/sidebar.blade.php_) y luego se incluye en cada página. Esta barra lateral muestra una lista de las últimas siete publicaciones que se publicaron en tu sitio. Si está en cada página, cada definición de ruta normalmente tendría que tomar esa lista y pasarla, como en el ejemplo siguiente.

_Pasar datos de la barra lateral desde cada ruta_
```php
Route::get('home', function () {
    return view('home')
        ->with('posts', Post::recent());
});

Route::get('about', function () {
    return view('about')
        ->with('posts', Post::recent());
});
```

Esto podría volverse molesto rápidamente. En su lugar, vamos a utilizar compositores de vistas para "compartir" esa variable con un conjunto prescrito de vistas. Podemos hacer esto de varias maneras, así que comencemos de manera simple y avancemos hacia adelante.

### Compartir una variable globalmente

Primero, la opción más sencilla: simplemente “compartir” globalmente una variable con cada vista de su aplicación, como en el ejemplo siguiente.

_Compartir una variable globalmente_
```php
// Some service provider
public function boot()
{
    ...
    view()->share('recentPosts', Post::recent());
}
```

Si desea utilizar `view()->share()`, el mejor lugar sería el método `boot()` de un proveedor de servicios para que el enlace se ejecute en cada carga de página. Puede crear un `ViewComposerServiceProvider` personalizado (consulte [“Proveedores de Servicios”](../requests-responses-and-middleware/laravel-s-request-lifecycle.html#proveedores-de-servicios) para obtener más detalles), pero por ahora simplemente colóquelo en `App\Providers\AppServiceProvider` en el método `boot()`.

El uso de `view()->share()` hace que la variable sea accesible para todas las vistas de toda la aplicación, por lo que podría ser excesivo.

### Compositores de vistas con alcance de vista y clausuras

La siguiente opción es utilizar un compositor de vistas basado en clausuras para compartir variables con una sola vista, como en el ejemplo siguiente.

_Creación de un compositor de vistas basado en clausuras_
```php
view()->composer('partials.sidebar', function ($view) {
    $view->with('recentPosts', Post::recent());
});
```

Como puedes ver, hemos definido el nombre de la vista con la que queremos compartirlo en el primer parámetro (`partials.sidebar`) y luego pasamos una clausura al segundo parámetro; en el cierre hemos usado `$view->with()` para compartir una variable, pero solo con una vista específica.

>### Compositores de Vistas para Varias Vistas.
>
>En cualquier lugar donde un compositor de vistas se enlace a una vista en >particular (como en el Ejemplo 4-23, que se enlaza a `partials.sidebar`), >puede pasar una matriz de nombres de vistas en lugar de enlazarlas a varias >vistas.
>
>También puede usar un asterisco en la ruta de la vista, como en `partials.*` o `tasks.*`:
```php
view()->composer(
    ['partials.header', 'partials.footer'],
    function ($view) {
        $view->with('recentPosts', Post::recent());
    }
);

view()->composer('partials.*', function ($view) {
    $view->with('recentPosts', Post::recent());
});
```

### Compositores de vistas con alcance de vista y clases

Finalmente, la opción más flexible, pero también la más compleja, es crear una clase dedicada para su compositor de vistas.

Primero, vamos a crear la clase de compositor de vistas. No hay un lugar definido formalmente para que vivan los compositores de vistas, pero la documentación recomienda `App\Http\ViewComposers`. Por lo tanto, vamos a crear `App\Http\ViewComposers\RecentPostsComposer` como en el ejemplo siguiente.

_Un compositor de vistas_
```php
<?php

namespace App\Http\ViewComposers;

use App\Post;
use Illuminate\Contracts\View\View;

class RecentPostsComposer
{
    public function compose(View $view)
    {
        $view->with('recentPosts', Post::recent());
    }
}
```

Como puedes ver, cuando se llama a este compositor, se ejecuta el método `compose()`, en el que vinculamos la variable `recentPosts` al resultado de ejecutar el método `recent()` del modelo `Post`.

Al igual que los otros métodos para compartir variables, este compositor de vistas debe tener un vínculo en algún lugar. Nuevamente, es probable que cree un `ViewComposerServiceProvider` personalizado, pero por ahora, como se ve en el ejemplo siguiente, simplemente lo colocaremos en el método `boot()` de `App\Providers\AppServiceProvider`.

_Registrar un compositor de vistas en `AppServiceProvider`_
```php
public function boot(): void
{
    view()->composer(
        'partials.sidebar',
        \App\Http\ViewComposers\RecentPostsComposer::class
    );
}
```

Tenga en cuenta que este vínculo es el mismo que un compositor de vistas basado en clausuras, pero en lugar de pasar una clausura, pasamos el nombre de clase de nuestro compositor de vistas. Ahora, cada vez que Blade renderiza la vista `partials.sidebar`, ejecutará automáticamente nuestro proveedor y pasará a la vista una variable `recentPosts` configurada con los resultados del método `recent()` en nuestro modelo `Post`.

## Inyección de Servicio Blade

Hay tres tipos principales de datos que probablemente inyectaremos en una vista: colecciones de datos para iterar, objetos individuales que mostramos en la página y servicios que generan datos o vistas.

Con un servicio, el patrón probablemente se verá como el ejemplo siguiente, donde inyectamos una instancia de nuestro servicio de análisis en la definición de ruta mediante la introducción de una referencia de tipo en la firma del método de la ruta y luego la pasamos a la vista.

_Inyección de servicios en una vista a través del constructor de definición de ruta_
```php
Route::get('backend/sales', function (AnalyticsService $analytics) {
    return view('backend.sales-graphs')
        ->with('analytics', $analytics);
});
```

Al igual que con los compositores de vistas, la inyección de servicios de Blade ofrece un atajo conveniente para reducir la duplicación en las definiciones de ruta. Normalmente, el contenido de una vista que utiliza nuestro servicio de análisis podría verse como el ejemplo siguiente.

_Uso de un servicio de navegación inyectado en una vista_
```html
<div class="finances-display">
{{ $analytics->getBalance() }} / {{ $analytics->getBudget() }}
</div>
```

La inyección del servicio Blade facilita la inyección de una instancia de una clase desde el contenedor directamente en la vista, como en el ejemplo siguiente.

_Inyectar un servicio directamente en una vista_
```html
@inject('analytics', 'App\Services\Analytics')

<div class="finances-display">
    {{ $analytics->getBalance() }} / {{ $analytics->getBudget() }}
</div>
```

Como puedes ver, esta directiva `@inject` en realidad ha hecho que esté disponible una variable `$analytics`, que usaremos más adelante en nuestra vista.

El primer parámetro de `@inject` es el nombre de la variable que estás inyectando, y el segundo parámetro es la clase o interfaz de la que quieres inyectar una instancia. Esto se resuelve de la misma manera que cuando escribes una dependencia en un constructor en otra parte de Laravel; si no estás familiarizado con cómo funciona eso, consulta [El Contenedor](../the-container/a-quick-intro-to-dependency-injection.html#el-contenedor) para obtener más información.

Al igual que los compositores de vistas, la inyección de servicios de Blade facilita la disponibilidad de ciertos datos o funcionalidades para cada instancia de una vista, sin tener que inyectarlos a través de la definición de ruta cada vez.

