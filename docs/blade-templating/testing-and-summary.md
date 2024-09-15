# Pruebas

El método más común para probar las vistas es mediante pruebas de aplicaciones, lo que significa que en realidad estás llamando a la ruta que muestra las vistas y asegurándote de que las vistas tengan cierto contenido (ver ejemplo siguiente). También puedes hacer clic en botones o enviar formularios y asegurarte de que te redirijan a una página determinada o de que veas un error determinado. (Aprenderás más sobre las pruebas en el [aquí](../testing/)).

_Probar que una vista muestra cierto contenido_
```php
// EventsTest.php
public function test_list_page_shows_all_events()
{
    $event1 = Event::factory()->create();
    $event2 = Event::factory()->create();

    $this->get('events')
        ->assertSee($event1->title)
        ->assertSee($event2->title);
}
```

También puede probar que a una vista determinada se le ha pasado un conjunto particular de datos, lo que, si cumple con sus objetivos de prueba, es menos frágil que verificar cierto texto en la página. El ejemplo siguiente demuestra este enfoque.

_Probar que a una vista se le ha pasado cierto contenido_
```php
// EventsTest.php
public function test_list_page_shows_all_events()
{
    $event1 = Event::factory()->create();
    $event2 = Event::factory()->create();

    $response = $this->get('events');

    $response->assertViewHas('events', Event::all());
    $response->assertViewHasAll([
        'events' => Event::all(),
        'title' => 'Events Page',
    ]);
    $response->assertViewMissing('dogs');
}
```

Con `assertViewHas()` podemos pasar una clausura, lo que significa que podemos personalizar cómo queremos verificar estructuras de datos más complejas. El ejemplo siguiente ilustra cómo podemos usar esto.

_Pasando una clausura a `assertViewHas()`_
```php
// EventsTest.php
public function test_list_page_shows_all_events()
{
    $event1 = Event::factory()->create();

    $response = $this->get("events/{ $event1->id }");

    $response->assertViewHas('event', function ($event) use ($event1) {
        return $event->id === $event1->id;
    });
}
```

## Resumen

Blade es el motor de plantillas de Laravel. Su principal objetivo es una sintaxis clara, concisa y expresiva con una herencia y una extensibilidad potentes. Sus corchetes de _"echo seguro"_ son `{{ y }}`, sus corchetes de echo sin protección son `{!! y !!}`, y tiene una serie de etiquetas personalizadas llamadas _"directivas"_ que comienzan todas con `@` (`@if` y `@unless`, por ejemplo).

