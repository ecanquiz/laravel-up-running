# Redirecciones

Hasta ahora, las únicas cosas que hemos mencionado explícitamente que se pueden devolver desde un método de controlador o una definición de ruta han sido las vistas. Pero hay algunas otras estructuras que podemos devolver para darle instrucciones al navegador sobre cómo comportarse.

Primero, veamos la redirección. Ya has visto algunas de ellas en otros ejemplos. Hay dos formas comunes de generar una redirección; aquí usaremos el asistente global `redirect()`, pero es posible que prefieras la fachada. Ambas crean una instancia de `Illuminate\Http\RedirectResponse`, realizan algunos métodos de conveniencia en ella y luego la devuelven. También puedes hacer esto manualmente, pero tendrás que hacer un poco más de trabajo tú mismo. Observa el ejemplo siguiente para ver algunas formas en las que puedes devolver una redirección.

_Diferentes formas de devolver una redirección_
```php
// Using the global helper to generate a redirect response
Route::get('redirect-with-helper', function () {
    return redirect()->to('login');
});

// Using the global helper shortcut
Route::get('redirect-with-helper-shortcut', function () {
    return redirect('login');
});

// Using the facade to generate a redirect response
Route::get('redirect-with-facade', function () {
    return Redirect::to('login');
});

// Using the Route::redirect shortcut
Route::redirect('redirect-by-route', 'login');
```

Tenga en cuenta que el ayudante `redirect()` expone los mismos métodos que la fachada `Redirect`, pero también tiene un atajo; si pasa parámetros directamente al ayudante en lugar de encadenar métodos después de él, es un atajo al método de redirección `to()`.

Tenga en cuenta también que el tercer parámetro (opcional) para el ayudante de ruta `Route::redirect()` puede ser el código de estado (por ejemplo, '302') para su redirección.

## `redirect()->to()`

La firma del método `to()` para redirecciones se ve así:

```php
function to($to = null, $status = 302, $headers = [], $secure = null)
```

`$to` es una ruta interna válida, `$status` es el estado HTTP (el valor predeterminado es `302`), `$headers` le permite definir qué encabezados HTTP enviar junto con su redirección y `$secure` le permite anular la opción predeterminada de `http` frente a `https` (que normalmente se establece en función de la URL de su solicitud actual). El ejemplo siguiente muestra un ejemplo de su uso.

_redirect()->to()_
```php
Route::get('redirect', function () {
    return redirect()->to('home');

    // Or same, using the shortcut:

    return redirect('home');
});
```

## `redirect()->route()`

El método `route()` es el mismo que el método `to()`, pero en lugar de apuntar a una ruta en particular, apunta a un nombre de ruta en particular (ver ejemplo siguiente).


_redirect()->route()_
```php
Route::get('redirect', function () {
    return redirect()->route('conferences.index');
});
```

Tenga en cuenta que, dado que algunos nombres de ruta requieren parámetros, el orden de sus parámetros es un poco diferente. `route()` tiene un segundo parámetro opcional para los parámetros de ruta:

```php
function route($to = null, $parameters = [], $status = 302, $headers = [])
```

Entonces, su uso podría parecerse un poco al ejemplo siguiente.

_redirect()->route() con parámetros_
```php
Route::get('redirect', function () {
    return to_route('conferences.show', [
        'conference' => 99,
    ];
});
```

:::info Redirigir con Asistente `to_route()`
Puede utilizar el asistente `to_route()` como alias para el método `redirect()->route()`. La firma para ambos es la misma:
```php
Route::get('redirect', function () {
    return to_route('conferences.show', ['conference' => 99]);
});
```
:::


## `redirect()->back()`

Debido a algunas de las ventajas integradas de la implementación de sesión de Laravel, su aplicación siempre sabrá cuál fue la página visitada anteriormente por el usuario. Eso abre la oportunidad de una redirección `redirect()->back()`, que simplemente redirige al usuario a la página de la que proviene. También hay un atajo global para esto: `back()`.

## Otros Métodos de Redireccionamiento

El servicio de redireccionamiento proporciona otros métodos que se utilizan con menos frecuencia, pero que aún están disponibles:

- `refresh()`: Redirige a la misma página en la que se encuentra actualmente el usuario.

- `away()`: 
Permite redirigir a una URL externa sin la validación de URL predeterminada.

- `secure()`: 
Como `to()` con el parámetro seguro establecido en `"true"`.

- `action()`: Le permite vincular a un controlador y método de una de dos maneras: como una cadena `(redirect()->action('MyController@myMethod'))` o como una tupla `(redirect()->action([MyController::class, 'myMethod']))`.

- `guest()`: Utilizado internamente por el [sistema de autenticación](../user-authentication-and-authorization/the-user-model-and-migration.html); cuando un usuario visita una ruta para la que no está autenticado, esto captura la ruta _“intended”_ y luego redirecciona al usuario (generalmente a una página de inicio de sesión).

- `intended()`: También lo utiliza internamente el sistema de autenticación; después de una autenticación exitosa, toma la URL _“intended”_ almacenada por el método `guest()` y redirecciona al usuario allí.

## `redirect()->with()`

Si bien está estructurado de manera similar a los otros métodos que puedes llamar en `redirect()`, `with()` es diferente en el sentido de que no define a dónde estás redireccionando, sino qué datos estás pasando junto con la redirección. Cuando estás redireccionando a los usuarios a diferentes páginas, a menudo quieres pasar ciertos datos junto con ellos. Podrías flashear manualmente los datos a la sesión, pero Laravel tiene algunos métodos convenientes para ayudarte con eso.

Lo más común es que puedas pasar una matriz de claves y valores o una sola clave y valor usando `with()`, como en el ejemplo siguiente. Esto guarda los datos de `with()` en la sesión solo para la próxima carga de página.

_Redirigir con datos_
```php
Route::get('redirect-with-key-value', function () {
    return redirect('dashboard')
        ->with('error', true);
});

Route::get('redirect-with-array', function () {
    return redirect('dashboard')
        ->with(['error' => true, 'message' => 'Whoops!']);
});
```

