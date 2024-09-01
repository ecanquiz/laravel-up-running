# Respuestas Personalizadas

Hay algunas otras opciones disponibles para que podamos regresar, así que repasemos las respuestas más comunes después de las vistas, redirecciones y cancelaciones. Al igual que con las redirecciones, puede ejecutar estos métodos en el asistente `response()` o en la fachada `Response`.

## `response()->make()`

Si desea crear una respuesta HTTP manualmente, simplemente pase sus datos al primer parámetro de `response()->make()`: por ejemplo, `return response()->make(Hello, World!)`. Una vez más, el segundo parámetro es el código de estado HTTP y el tercero son sus encabezados.


## `response()->json()` y `->jsonp()`

Para crear una respuesta HTTP codificada en JSON de forma manual, pasa tu contenido compatible con JSON (matrices, colecciones o cualquier otra cosa) al método `json()`: por ejemplo `return response()->json(User::all())`. Es igual que `make()`, excepto que codifica en JSON (`json_encodes`) tu contenido y establece los encabezados apropiados.

## `response()->download()`, `->streamDownload()` y `->file()`

Para enviar un archivo para que el usuario final lo descargue, pase una instancia de `SplFileInfo` o un nombre de archivo de cadena a `download()`, con un segundo parámetro opcional del nombre del archivo de descarga: por ejemplo, `return response()->download('file501751.pdf', 'myFile.pdf')`, que enviaría un archivo que está en `file501751.pdf` y lo renombraría, a medida que se envía, a `myFile.pdf`.

Para mostrar el mismo archivo en el navegador (si es un PDF o una imagen o algo más que el navegador pueda manejar), use `response()->file()` en su lugar, que toma los mismos parámetros que `response->download()`.

Si desea que algún contenido de un servicio externo esté disponible como descarga sin tener que escribirlo directamente en el disco de su servidor, puede transmitir la descarga mediante `response()->streamDownload()`. Este método espera como parámetros una clausura que hace `echo` de una cadena, un nombre de archivo y, opcionalmente, una matriz de encabezados; consulte el ejemplo siguiente.

_Streaming de descargas desde servidores externos_
```php
return response()->streamDownload(function () {
    echo DocumentService::file('myFile')->getContent();
}, 'myFile.pdf');
```



