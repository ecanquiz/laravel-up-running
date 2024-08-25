# Vincular Modelo de Ruta

Uno de los patrones de enrutamiento más comunes es que la primera línea de cualquier método de controlador intenta encontrar el recurso con el ID dado, como en el ejemplo siguiente.

_Obtener un recurso para cada ruta_
```php
Route::get('conferences/{id}', function ($id) {
    $conference = Conference::findOrFail($id);
});
```

Laravel ofrece una característica que simplifica este patrón llamada _vínculo de modelo de ruta_. Esto le permite definir que un nombre de parámetro en particular (por ejemplo, `{conference}`) le indicará al solucionador de ruta que debe buscar un registro de base de datos de Eloquent con ese ID y luego pasarlo como parámetro _en lugar_ de simplemente pasar el ID.

Hay dos tipos de enlace de modelo de ruta: implícito y personalizado (o explícito).

## Implicit Route Model Binding