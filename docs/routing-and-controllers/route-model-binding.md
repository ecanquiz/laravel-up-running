# Vincular Modelo de Ruta

Uno de los patrones de enrutamiento más comunes es que la primera línea de cualquier método de controlador intenta encontrar el recurso con el ID dado, como en el ejemplo siguiente.

_Obtener un recurso para cada ruta_
```php
Route::get('conferences/{id}', function ($id) {
    $conference = Conference::findOrFail($id);
});
```

Laravel ofrece una característica que simplifica este patrón llamada _vínculo de modelo de ruta_. Esto le permite definir que un nombre de parámetro en particular (por ejemplo, `{conference}`) le indicará al solucionador de ruta que debe buscar un registro de base de datos de Eloquent con ese ID y luego pasarlo como parámetro _en lugar_ de simplemente pasar el ID.

Hay dos tipos de vínculo de modelo de ruta: implícito y personalizado (o explícito).

## Vinculación Implícita del Modelo de Ruta

La forma más sencilla de utilizar la vinculación del modelo de ruta es nombrar el parámetro de ruta con algo exclusivo de ese modelo (por ejemplo, nombrarlo `$conference` en lugar de `$id`), luego sugerir tipado de ese parámetro en el método de clausura/controlador y use el mismo nombre de variable allí. Es más fácil mostrar que describir, así que eche un vistazo al ejemplo siguiente.

_Uso de una vinculación implícita del modelo de ruta_
```php
Route::get('conferences/{conference}', function (Conference $conference) {
    return view('conferences.show')->with('conference', $conference);
});
```

Debido a que el parámetro de ruta (`{conference}`) es el mismo que el parámetro de método (`$conference`), y el parámetro de método está tipado con un modelo `Conference` (`Conference $conference`), Laravel ve esto como un vínculo de modelo de ruta. Cada vez que se visita esta ruta, la aplicación asumirá que lo que se pasa a la URL en lugar de `{conference}` es un ID que debe usarse para buscar una `Conference`, y luego esa instancia de modelo resultante se pasará a su clausura o método de controlador.


:::info Personalización de la clave de Ruta para un Modelo Eloquent

Cada vez que se busca un modelo Eloquent a través de un segmento de URL (normalmente debido a la vinculación del modelo de ruta), la columna predeterminada por la que Eloquent lo buscará es su clave principal (ID).

Para cambiar la columna que utiliza su modelo Eloquent para las búsquedas de URL en todas sus rutas, agregue un método a su modelo llamado `getRouteKeyName()`:
```php
public function getRouteKeyName()
{
    return 'slug';
}
```
:::

Ahora, una URL como `conferences/{conference}` esperará obtener una entrada de la columna `slug` en lugar del `id` y realizará sus búsquedas en consecuencia.

:::info Personalización de la Clave de Ruta en una Ruta Específica
En Laravel, también puedes cambiar la clave de ruta en una ruta específica en lugar de globalmente agregando dos puntos y el nombre de la columna en la definición de la ruta:
```php
Route::get(
    'conferences/{conference:slug}',
    function (Conference $conference) {
        return view('conferences.show')
            ->with('conference', $conference);
    });
```
:::

Si tienes dos segmentos dinámicos en tu URL (por ejemplo: `organizers/{organizer}/conferences/{conference:slug)`, Laravel intentará automáticamente limitar las consultas del segundo modelo a solo aquellas relacionadas con el primero. Por lo tanto, comprobará si el modelo `Organizer` tiene una relación `conferences` y, si existe, solo devolverá las `Conferences` que estén asociadas con el `Organizer` encontrado por el primer segmento.

```php
use App\Models\Conference;
use App\Models\Organizer;

Route::get(
    'organizers/{organizer}/conferences/{conference:slug}',
    function (Organizer $organizer, Conference $conference) {
        return $conference;
    }
);
```


## Vinculación Personalizada del Modelo de Ruta 

Para configurar manualmente los vínculos del modelo de ruta, agregue una línea como la del ejemplo siguiente al método `boot()` en `App\Providers\RouteServiceProvider`.

_Agregar un vínculo de modelo de ruta_
```php
public function boot()
{
    // Perform the binding
    Route::model('event', Conference::class);
}
```

Ahora ha especificado que siempre que una ruta tenga un parámetro en su definición llamado `{event}`, como se muestra en el ejemplo siguiente, el solucionador de ruta devolverá una instancia de la clase `Conference` con el ID de ese parámetro de URL.

_Uso de un vínculo de modelo de ruta explícito_
```php
Route::get('events/{event}', function (Conference $event) {
    return view('events.show')->with('event', $event);
});
```

