# Vistas

En algunos de las clausuras de ruta que hemos visto hasta ahora, hemos visto algo como `return view('account')`. ¿Qué está pasando aquí?

En el [patrón MVC](./a-quick-intro-to-mvc-the-http-verbs-and-rest.html#¿que-es-mvc), las vistas (o plantillas) son archivos que describen cómo debería verse una determinada salida. Es posible que tenga vistas que generen JSON, XML o correo electrónico, pero las vistas más comunes en un framework web generan HTML.

En Laravel, hay dos formatos de vista que puedes usar fuera de caja: PHP simple y plantillas [Blade](../blade-templating/echoing-data.html#plantillas-blade). La diferencia está en el nombre del archivo: `about.php` se procesará con el motor PHP, y `about.blade.php` se procesará con el motor Blade.

:::info Tres Formas de Cargar una Vista

Hay tres formas de devolver una vista. Por ahora, concéntrese en `view()`, pero si alguna vez ve `View::make()`, es lo mismo, o puede inyectar `Illuminate\View\ViewFactory` si lo prefiere.
:::

Una vez que haya “cargado” una vista con el ayudante `view()`, tendrá la opción de simplemente devolverla (como en el ejemplo siguiente), lo que funcionará bien si la vista no depende de ninguna variable del controlador.

_Uso simple de `view()`_
```php
Route::get('/', function () {
    return view('home');
});
```

Este código busca una vista en `resources/views/home.blade.php` o `resources/views/home.php` y carga su contenido y analiza cualquier estructura de control o PHP en línea hasta que solo tenga la salida de la vista. Una vez que la devuelva, se pasará al resto de la pila de respuestas y, finalmente, se devolverá al usuario.

## _Pasando variables a las vistas_

Pero ¿qué ocurre si necesitas pasar variables? Observa el ejemplo siguiente.

```php
Route::get('tasks', function () {
    return view('tasks.index')
        ->with('tasks', Task::all());
});
```

Esta clausura carga la vista `resources/views/tasks/index.blade.php` o `resources/views/tasks/index.php` y le pasa una única variable llamada `tasks`, que contiene el resultado del método `Task::all()`. `Task::all()` es una consulta de base de datos de [Eloquent](../databases-and-eloquent/configuration.html) que aprenderá más adelante.

## Devolver Rutas Simples Directamente con `Route::view()`

Debido a que es tan común que una ruta simplemente devuelva una vista sin datos personalizados, Laravel le permite definir una ruta como una ruta de “view” sin siquiera pasar a la definición de ruta una clausura o una referencia de controlador/método, como puede ver en el ejemplo siguiente.

_`Route::view()`_
```php
// Returns resources/views/welcome.blade.php
Route::view('/', 'welcome');

// Passing simple data to Route::view()
Route::view('/', 'welcome', ['User' => 'Michael']);
```

## Usar Compositores de Vistas para Compartir Variables con Cada Vista

A veces puede resultar complicado pasar las mismas variables una y otra vez. Puede haber una variable que desee que esté accesible para todas las vistas del sitio o para una determinada clase de vistas o una determinada subvista incluida — por ejemplo, todas las vistas relacionadas con las tareas o el encabezado parcial.

Es posible compartir determinadas variables con todas las plantillas o solo con algunas plantillas, como en el siguiente código:


```php
view()->share('variableName', 'variableValue');
```

Para obtener más información, consulte [“Compositores de Vistas e Inyección de Servicios”](../blade-templating/view-composers-and-service-injection.html).
