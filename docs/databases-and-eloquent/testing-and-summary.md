# Pruebas

Todo el framework de pruebas de aplicaciones de Laravel facilita la prueba de su base de datos — no escribiendo pruebas unitarias contra Eloquent, sino simplemente estando dispuesto a probar su aplicación completa.

Consideremos este escenario. Quiere realizar una prueba para asegurarse de que una página en particular muestre un contacto pero no otro. Parte de esa lógica tiene que ver con la interacción entre la URL, el controlador y la base de datos, por lo que la mejor manera de probarlo es una prueba de aplicación. Es posible que esté pensando en simular las llamadas de Eloquent e intentar evitar que el sistema acceda a la base de datos. _No lo haga._ Pruebe el ejemplo siguiente en su lugar.

_Prueba de interacciones de bases de datos con pruebas de aplicación simples_
```php
public function test_active_page_shows_active_and_not_inactive_contacts()
{
    $activeContact = Contact::factory()->create();
    $inactiveContact = Contact::factory()->inactive()->create();

    $this->get('active-contacts')
        ->assertSee($activeContact->name)
        ->assertDontSee($inactiveContact->name);
}
```

Como puede ver, las fábricas de modelos y las funciones de prueba de aplicaciones de Laravel son excelentes para probar las llamadas a bases de datos.

Alternativamente, puede buscar ese registro directamente en la base de datos, como en el ejemplo siguiente.

_Uso de `assertDatabaseHas()` para comprobar ciertos registros en la base de datos_
```php
public function test_contact_creation_works()
{
    $this->post('contacts', [
        'email' => 'jim@bo.com'
    ]);

    $this->assertDatabaseHas('contacts', [
        'email' => 'jim@bo.com'
    ]);
}
```

El framework de base de datos de Eloquent y Laravel se prueban exhaustivamente. _No es necesario que los pruebes ni que los simules._ Si realmente quieres evitar acceder a la base de datos, puedes usar un repositorio y luego devolver instancias no guardadas de tus modelos de Eloquent. Pero el mensaje más importante es este: prueba la forma en que tu aplicación usa la lógica de tu base de datos.

Si tiene accesores, mutadores, alcances o cualquier otra cosa personalizados, también puede probarlos directamente, como en el ejemplo siguiente.

_Prueba de accesores, mutadores y alcances_
```php
public function test_full_name_accessor_works()
{
    $contact = Contact::factory()->make([
        'first_name' => 'Alphonse',
        'last_name' => 'Cumberbund'
    ]);

    $this->assertEquals('Alphonse Cumberbund', $contact->fullName);
}

public function test_vip_scope_filters_out_non_vips()
{
    $vip = Contact::factory()->vip()->create();
    $nonVip = Contact::factory()->create();

    $vips = Contact::vips()->get();

    $this->assertTrue($vips->contains('id', $vip->id));
    $this->assertFalse($vips->contains('id', $nonVip->id));
}
```

Simplemente evite escribir pruebas que le hagan crear complejas “cadenas Demeter” para afirmar que se llamó a una pila fluida en particular en alguna simulación de base de datos. Si sus pruebas comienzan a volverse abrumadoras y complejas en torno a la capa de base de datos, es porque está permitiendo que nociones preconcebidas lo obliguen a utilizar sistemas innecesariamente complejos. Manténgalo simple.



## Resumen

Laravel viene con un conjunto de potentes herramientas de base de datos, que incluyen migraciones, propagación, un elegante generador de consultas y Eloquent, un potente ORM de ActiveRecord. Las herramientas de base de datos de Laravel no requieren que uses Eloquent en absoluto: puedes acceder y manipular la base de datos con una fina capa de comodidad sin tener que escribir SQL directamente. Pero agregar un ORM, ya sea Eloquent o Doctrine o cualquier otro, es fácil y puede funcionar perfectamente con las herramientas de base de datos principales de Laravel.

Eloquent sigue el patrón ActiveRecord, que simplifica la definición de una clase de objetos respaldados por una base de datos, incluida la tabla en la que están almacenados y la forma de sus columnas, accesores y mutadores. Eloquent puede manejar todo tipo de acción SQL normal y también relaciones complejas, hasta e incluyendo relaciones polimórficas de muchos a muchos.

Laravel también tiene un sistema robusto para probar bases de datos, incluidas las fábricas de modelos.
