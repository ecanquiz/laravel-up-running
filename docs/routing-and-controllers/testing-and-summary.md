# Prueba 

En algunas otras comunidades, la idea de realizar pruebas unitarias de los métodos del controlador es común, pero dentro de Laravel (y la mayor parte de la comunidad PHP) es típico confiar en las _pruebas de aplicación_ para probar la funcionalidad de las rutas.

Por ejemplo, para verificar que una ruta `POST` funciona correctamente, podemos escribir una prueba como la del ejemplo siguiente.

_Cómo escribir una prueba de ruta `POST` sencilla_
```php
// tests/Feature/AssignmentTest.php
public function test_post_creates_new_assignment()
{
    $this->post('/assignments', [
        'title' => 'My great assignment',
    ]);

    $this->assertDatabaseHas('assignments', [
        'title' => 'My great assignment',
    ]);
}
```
¿Llamamos directamente a los métodos del controlador? No. Pero nos aseguramos de que se cumpliera el objetivo de esta ruta — recibir un `POST` y guardar su información importante en la base de datos — Se cumplió.

También puede utilizar una sintaxis similar para visitar una ruta y verificar que cierto texto aparece en la página, o que al hacer clic en ciertos botones se hacen ciertas cosas (ver ejemplo siguiente).

_Cómo escribir una prueba de ruta `GET` sencilla_
```php
// AssignmentTest.php
public function test_list_page_shows_all_assignments()
{
    $assignment = Assignment::create([
        'title' => 'My great assignment',
    ]);

    $this->get('/assignments')
        ->assertSee('My great assignment');
}
```

## Resumen

Las rutas de Laravel se definen en `routes/web.php` y `routes/api.php`. Puedes definir la ruta esperada para cada ruta, qué segmentos son estáticos y cuáles son parámetros, qué verbos HTTP pueden acceder a la ruta y cómo resolverla. También puedes adjuntar middleware a las rutas, agruparlas y darles nombres.

Lo que se devuelve desde la clausura de la ruta o el método del controlador dicta cómo responde Laravel al usuario. Si es una cadena o una vista, se presenta al usuario; si son otros tipos de datos, se convierte a JSON y se presenta al usuario; y si es una redirección, fuerza una redirección.

Laravel ofrece una serie de herramientas y funciones útiles para simplificar las tareas y estructuras relacionadas con el enrutamiento. Entre ellas se incluyen controladores de recursos, vinculación de modelos de ruta y suplantación de métodos de formulario.