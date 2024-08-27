# Suplantación de Métodos de Formulario

A veces es necesario definir manualmente qué verbo HTTP debe enviar un formulario. Los formularios HTML solo permiten `GET` o `POST`, por lo que si desea cualquier otro tipo de verbo, deberá especificarlo usted mismo.

## Verbos HTTP en Laravel

Como ya hemos visto, puedes definir qué verbos coincidirán con una ruta en la definición de ruta usando `Route::get()`, `Route::post()`, `Route::any()` o `Route::match()`. También puedes hacer coincidir con `Route::patch()`, `Route::put()` y `Route::delete()`.

Pero, ¿cómo se envía una solicitud que no sea `GET` con un navegador web? En primer lugar, el atributo de método en un formulario HTML determina su verbo HTTP: si su formulario tiene un método `"GET"`, se enviará a través de parámetros de consulta y un método `GET`; si el formulario tiene un método `"POST"`, se enviará a través del cuerpo de la publicación y un método `POST`.

Los frameworks de JavaScript facilitan el envío de otras solicitudes, como `DELETE` y `PATCH`.
Pero si necesitas enviar formularios HTML en Laravel con verbos distintos a `GET` o `POST`, tendrás que usar la suplantación de métodos de formulario, lo que significa suplantar el método HTTP en un formulario HTML.

## Suplantación de Métodos HTTP en Formularios HTML

Para informar a Laravel que el formulario que estás enviando actualmente debe tratarse como algo distinto a un `POST`, agrega una variable oculta llamada `_method` con el valor `"PUT"`, `"PATCH"` o `"DELETE"`, y Laravel coincidirá y enrutará ese envío de formulario como si en realidad fuera una solicitud con ese verbo.

_Suplantación de métodos de formulario_
```html
<form action="/tasks/5" method="POST">
    <input type="hidden" name="_method" value="DELETE">
    <!-- or: -->
    @method('DELETE')
</form>
```

