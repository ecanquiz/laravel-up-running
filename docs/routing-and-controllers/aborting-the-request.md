# Abortando la Solicitud

Aparte de devolver vistas y redirecciones, la forma más común de salir de una ruta es abortarla. Hay algunos métodos disponibles globalmente (`abort()`, `abort_if()` y `abort_unless()`), que opcionalmente toman códigos de estado HTTP, un mensaje y una matriz de encabezados como parámetros.

Como lo muestra el ejemplo siguiente, `abort_if()` y `abort_unless()` toman un primer parámetro que se evalúa para determinar su veracidad y realizan la interrupción dependiendo del resultado.

_Abortos Forbidden 403_
```php
Route::post('something-you-cant-do', function (Illuminate\Http\Request $request) {
    abort(403, 'You cannot do that!');
    abort_unless($request->has('magicToken'), 403);
    abort_if($request->user()->isBanned, 403);
});
```


