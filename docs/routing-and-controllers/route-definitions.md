# Definiciones de Ruta

En una aplicación Laravel, definirás tus rutas web en `routes/web.php` y tus rutas API en `routes/api.php`. Las rutas web son aquellas que visitarán tus usuarios finales; las rutas API son aquellas para tu API, si tienes una. Por ahora, nos centraremos principalmente en las rutas en `routes/web.php`.

La forma más sencilla de definir una ruta es hacer coincidir una ruta (por ejemplo, `/`) con una clausura, como se ve a continuación.

_Definición básica de ruta_
```php
// routes/web.php
Route::get('/', function () {
    return 'Hello, World!';
});
```


>**¿Qué es una Clausura?** Las _clausuras_ son la versión PHP de las funciones anónimas. Una clausura es una función que se puede pasar como un objeto, asignar a una variable, pasar como parámetro a otras funciones y métodos o incluso serializar.

Ahora has definido que si alguien visita `/` (la raíz de tu dominio), el enrutador de Laravel debe ejecutar la clausura definida allí y devolver el resultado. Ten en cuenta que devolvemos nuestro contenido y no le hacemos `echo` ni `print`.


:::info Una Breve introducción al Middleware
Quizás te preguntes: “¿Por qué retorno `'Hello, World!'` en lugar de hacerle `echo`?”

Hay muchas respuestas, pero la más simple es que hay muchos envoltorios alrededor del ciclo de solicitud y respuesta de Laravel, incluido algo llamado _middleware_. Cuando finaliza la clausura de la ruta o el método del controlador, aún no es momento de enviar la salida al navegador; retornar el contenido le permite continuar fluyendo a través de la pila de respuesta y el middleware antes de que se devuelva al usuario.
:::

Muchos sitios web simples se pueden definir completamente dentro del archivo de rutas web. Con unas pocas rutas `GET` simples combinadas con algunas plantillas, como se ilustra en el siguiente ejemplo, puede ofrecer un sitio web clásico fácilmente.


```php
Route::get('/', function () {
    return view('welcome');
});

Route::get('about', function () {
    return view('about');
});

Route::get('products', function () {
    return view('products');
});

Route::get('services', function () {
    return view('services');
});
```

:::info Llamadas Estáticas
Si tienes mucha experiencia en desarrollo con PHP, es posible que te sorprendas al ver llamadas estáticas en la clase `Route`. En realidad, no se trata de un método estático en sí, sino de una ubicación de servicio que utiliza las fachadas de Laravel, que abordaremos en el apartado [El Contenedor](../the-container/a-quick-intro-to-dependency-injection.html).

Si prefieres evitar las fachadas, puedes lograr estas mismas definiciones de la siguiente manera:

```php
$router->get('/', function () {
    return 'Hello, World!';
});
```
:::

## Verbos de Ruta

Es posible que hayas notado que hemos estado usando `Route::get()` en nuestras definiciones de ruta. Esto significa que le estamos diciendo a Laravel que solo coincida con estas rutas cuando la solicitud HTTP usa la acción `GET`. Pero ¿qué pasa si se trata de un formulario `POST`, o tal vez algún JavaScript que envía solicitudes `PUT` o `DELETE`? Hay algunas otras opciones para los métodos a los que llamar en una definición de ruta, como se ilustra en el siguiente ejemplo.

_Verbos de ruta_
```php
Route::get('/', function () {
    return 'Hello, World!';
});

Route::post('/', function () {
    // Handle someone sending a POST request to this route
});

Route::put('/', function () {
    // Handle someone sending a PUT request to this route
});

Route::delete('/', function () {
    // Handle someone sending a DELETE request to this route
});

Route::any('/', function () {
    // Handle any verb request to this route
});

Route::match(['get', 'post'], '/', function () {
    // Handle GET or POST requests to this route
});
```

## Manejo de Ruta

Como probablemente hayas adivinado, pasar una clausura a la definición de ruta no es la única forma de enseñarle a resolver una ruta. Las clausuaras son rápidas y simples, pero cuanto más grande se vuelve tu aplicación, más complicado se vuelve poner toda tu lógica de enrutamiento en un solo archivo. Además, las aplicaciones que usan clausuras  de ruta no pueden aprovechar el almacenamiento en caché de ruta de Laravel (más sobre esto más adelante), que puede ahorrar hasta cientos de milisegundos de cada solicitud.

La otra opción común es pasar un nombre de controlador y un método como una cadena en lugar de la clausura, como en el siguiente ejemplo.


_Rutas que invocan métodos del controlador_
```php
use App\Http\Controllers\WelcomeController;

Route::get('/', [WelcomeController::class, 'index']);
```

Esto le indica a Laravel que pase las solicitudes a esa ruta al método `index()` del controlador `App\Http\Controllers\WelcomeController`. A este método se le pasarán los mismos parámetros y se lo tratará de la misma manera que a una clausura que podría haber colocado en su lugar de forma alternativa.


>**Sintaxis de Referencia de Controlador/Método de Laravel**

>Laravel tiene una convención para referirse a un método en particular en un controlador dado: `[ControllerName::class, 'methodName']`, conocida como sintaxis de tupla o sintaxis de matriz invocable. A veces, esto es solo una convención de comunicación casual, pero también se usa en enlaces reales, como en el ejemplo anterior. El primer elemento de la matriz identifica al controlador y el segundo al método.

>Laravel también admite una sintaxis de "cadena" más antigua (`Route::get('/', 'WelcomeController@index')`), y esta sigue siendo una forma común de describir un método en la comunicación escrita.

## Parámetros de Ruta

Si la ruta que está definiendo tiene parámetros (segmentos en la estructura de la URL que son variables), es sencillo definirlos en su ruta y pasarlos a su clausura (ver siguiente ejemplo).

_Parámetros de ruta_
```php
Route::get('users/{id}/friends', function ($id) {
    //
});
```

También puede hacer que los parámetros de su ruta sean opcionales incluyendo un signo de interrogación (`?`) después del nombre del parámetro, como se ilustra en el siguiente ejemplo. En este caso, también debe proporcionar un valor predeterminado para la variable correspondiente de la ruta.

_Parámetros de ruta opcionales_
```php
Route::get('users/{id?}', function ($id = 'fallbackId') {
    //
});
```

También puedes usar expresiones regulares (_regex_) para definir que una ruta sólo debe coincidir si un parámetro cumple requisitos particulares, como en el siguiente ejemplo.

_Restricciones de ruta de expresiones regulares_
```php
Route::get('users/{id}', function ($id) {
    //
})->where('id', '[0-9]+');

Route::get('users/{username}', function ($username) {
    //
})->where('username', '[A-Za-z]+');

Route::get('posts/{id}/{slug}', function ($id, $slug) {
    //
})->where(['id' => '[0-9]+', 'slug' => '[A-Za-z]+']);
```

Como probablemente hayas adivinado, si visitas una ruta que coincide con una cadena de ruta pero la expresión regular no coincide con el parámetro, no se realizará la comparación. Dado que las rutas se comparan de arriba a abajo, `users/abc` omitiría la primera clausura en el ejemplo anterior, pero coincidiría con la segunda clausura, por lo que se enrutaría allí. Por otro lado, `posts/abc/123` no coincidiría con ninguno de las clausuras, por lo que devolvería un error `404 (No encontrado)`.

Laravel también ofrece métodos convenientes para patrones comunes de coincidencia de expresiones regulares, como puedes ver en el siguiente ejemplo.

_Ayudantes de restricción de ruta de expresiones regulares_

```php
Route::get('users/{id}/friends/{friendname}', function ($id, $friendname) {
    //
})->whereNumber('id')->whereAlpha('friendname');

Route::get('users/{name}', function ($name) {
    //
})->whereAlphaNumeric('name');

Route::get('users/{id}', function ($id) {
    //
})->whereUuid('id');

Route::get('users/{id}', function ($id) {
    //
})->whereUlid('id');

Route::get('friends/types/{type}', function ($type) {
    //
})->whereIn('type', ['acquaintance', 'bestie', 'frenemy']);
```

>**La Relación de Nombres Entre los Parámetros de Ruta y Parámetros de Método de Clausura/Controlador**
>
>Como puede ver en los ejemplos, lo más común es usar los mismos nombres para los parámetros de ruta (`{id}`) y los parámetros de método que inyectan en la definición de ruta (`function ($id)`). Pero, ¿es esto necesario?
>A menos que esté usando la vinculación de modelos de ruta, que se analiza más adelante en este capítulo, no. Lo único que define qué parámetro de ruta coincide con qué parámetro de método es su orden (de izquierda a derecha), como puede ver aquí:
>```php
>Route::get('users/{userId}/comments/{commentId}', function (
>    $thisIsActuallyTheUserId,
>    $thisIsReallyTheCommentId
>) {
>    //
>});
>```
>Dicho esto, el hecho de que _puedas_ hacerlos diferentes no significa que _debas_ hacerlo. Recomiendo mantenerlos iguales por el bien de los futuros desarrolladores, que podrían verse en problemas por nombres inconsistentes.

## Nombres de Ruta

La forma más sencilla de hacer referencia a estas rutas en cualquier parte de su aplicación es simplemente por su ruta. Hay un asistente global `url()` para simplificar ese enlace en sus vistas, si lo necesita; vea el siguiente  ejemplo. El asistente antepondrá a su ruta el dominio completo de su sitio.

_El asistente `url()`_
```php
<a href="<?php echo url('/'); ?>">
// Outputs <a href="http://myapp.com/">
```

Sin embargo, Laravel también te permite nombrar cada ruta, lo que te permite hacer referencia a ella sin hacer referencia explícita a la URL. Esto es útil porque significa que puedes dar apodos simples a rutas complejas y también porque vincularlas por nombre significa que no tienes que reescribir los enlaces de tu interfaz si las rutas cambian (ver ejemplo).

_Definición de nombres de rutas_
```php
// Defining a route with name() in routes/web.php:
Route::get('members/{id}', [\App\Http\Controller\MemberController::class, 'show'])
    ->name('members.show');

// Linking the route in a view using the route() helper:
<a href="<?php echo route('members.show', ['id' => 14]); ?>">
```


Este ejemplo ilustra algunos conceptos nuevos. Primero, usamos una definición de ruta fluida para agregar el nombre, encadenando el método `name()` después del método `get()`. Este método nos permite nombrar la ruta, dándole un alias corto para que sea más fácil hacer referencia a ella en otro lugar.

En nuestro ejemplo, hemos llamado a esta ruta `members.show`; `resourcePlural.action` es una convención común dentro de Laravel para los nombres de rutas y vistas.

>**Convenciones de Nombres de Ruta**
>
>Puedes nombrar tu ruta como quieras, pero la convención común es usar el plural del nombre del recurso, luego un punto y luego la acción. Entonces, aquí están las rutas más comunes para un recurso llamado `photo`:

>```php
>photos.index
>photos.create
>photos.store
>photos.show
>photos.edit
>photos.update
>photos.destroy
>```
>Para obtener más información sobre estas convenciones, consulte [“Controladores de Recursos”](../routing-and-controllers/controllers.html#controladores-de-recursos).


Este ejemplo también introdujo el asistente `route()`. Al igual que `url()`, está pensado para usarse en vistas para simplificar la vinculación a una ruta con nombre. Si la ruta no tiene parámetros, puedes simplemente pasar el nombre de la ruta (`route('members.index')`) y recibir una cadena de ruta (`"http://myapp.com/members"`). Si tiene parámetros, pásalos como una matriz en el segundo parámetro como hicimos en el ejemplo anterior.

En general, recomiendo usar nombres de ruta en lugar de rutas para hacer referencia a las rutas y, por lo tanto, usar el asistente `route()` en lugar del asistente `url()`. A veces puede resultar un poco complicado (por ejemplo, si trabajas con varios subdominios), pero proporciona un nivel increíble de flexibilidad para cambiar más adelante la estructura de enrutamiento de la aplicación sin mayores penalizaciones.

>**Pasar Parámetros de Ruta al Asistente `route()`**
>
>Cuando su ruta tiene parámetros (por ejemplo, `users/id`), debe definir esos parámetros cuando esté usando el asistente `route()` para generar un enlace a la ruta.
>
>Hay algunas formas diferentes de pasar estos parámetros. Imaginemos una ruta definida como `users/userId/comments/commentId`. Si el ID de usuario es `1` y el ID de comentario es `2`, veamos algunas opciones que tenemos disponibles:
>
>**Opción 1:**
>```php
>route('users.comments.show', [1, 2])
>// http://myapp.com/users/1/comments/2
>```
>**Opción 2:**
>```php
>route('users.comments.show', ['userId' => 1, 'commentId' => 2])
>// http://myapp.com/users/1/comments/2
>```
>**Opción 3:**
>```php
>route('users.comments.show', ['commentId' => 2, 'userId' => 1])
>// http://myapp.com/users/1/comments/2
>```
>**Opción 4:**
>```php
>route('users.comments.show', ['userId' => 1, 'commentId' => 2, 'opt' => 'a'])
>// http://myapp.com/users/1/comments/2?opt=a
>```

