# Introducción a Eloquent

Ahora que hemos cubierto el generador de consultas, hablemos de Eloquent, la herramienta de base de datos insignia de Laravel que se basa en el generador de consultas.

Eloquent es un _ORM de ActiveRecord_, lo que significa que es una capa de abstracción de base de datos que proporciona una única interfaz para interactuar con múltiples tipos de bases de datos. “ActiveRecord” significa que una única clase de Eloquent es responsable no solo de proporcionar la capacidad de interactuar con la tabla en su totalidad (por ejemplo, `User::all()` obtiene todos los usuarios), sino también de representar una fila de tabla individual (por ejemplo, `$sharon = new User`). Además, cada instancia es capaz de administrar su propia persistencia; puede llamar a `$sharon->save()` o `$sharon->delete()`.

Eloquent se centra principalmente en la simplicidad y, al igual que el resto del framework, se basa en la “convención sobre la configuración” para permitirle construir modelos potentes con un código mínimo.

Por ejemplo, con el modelo definido en el ejemplo siguiente:

_El modelo Eloquent más simple_
```php
<?php

use Illuminate\Database\Eloquent\Model;

class Contact extends Model {}
```

Puede realizar todas las operaciones del ejemplo siguiente:

_Operaciones alcanzables con el modelo Eloquent más simple_
```php
// In a controller
public function save(Request $request)
{
    // Create and save a new contact from user input
    $contact = new Contact();
    $contact->first_name = $request->input('first_name');
    $contact->last_name = $request->input('last_name');
    $contact->email = $request->input('email');
    $contact->save();

    return redirect('contacts');
}

public function show($contactId)
{
    // Return a JSON representation of a contact based on a URL segment;
    // if the contact doesn't exist, throw an exception
    return Contact::findOrFail($contactId);
}

public function vips()
{
    // Unnecessarily complex example, but still possible with basic Eloquent
    // class; adds a "formalName" property to every VIP entry
    return Contact::where('vip', true)->get()->map(function ($contact) {
        $contact->formalName = "The exalted {$contact->first_name} of the
        {$contact->last_name}s";

        return $contact;
    });
}
```

¿Cómo? Por convención. Eloquent asume el nombre de la tabla (`Contact` se convierte en `contacts`) y, con eso, tienes un modelo Eloquent completamente funcional.

Veamos cómo trabajamos con los modelos Eloquent.

## Creando y Definiendo Modelos Elocuentes

Primero, vamos a crear un modelo. Hay un comando Artisan para eso:

```sh
php artisan make:model Contact
```

Esto es lo que obtendremos en `app/Models/Contact.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    //
}
```

:::info Creando una Migración Junto con Su Modelo
Si desea crear automáticamente una migración cuando crea
su modelo, pase el indicador `-m` o `--migration`:
```sh
php artisan make:model Contact --migration
```
:::


### Nombre de la tabla

El comportamiento predeterminado para los nombres de tabla es que Laravel convierte en "snake cases" y pluraliza el nombre de la clase, por lo que `SecondaryContact` accedería a una tabla llamada `secondary_contacts`. Si desea personalizar el nombre, configure la propiedad `$table` explícitamente en el modelo:

```php
protected $table = 'contacts_secondary';
```

### Clave primaria

Laravel asume, por defecto, que cada tabla tendrá una clave primaria de número entero que se incrementa automáticamente y se llamará `id`.

Si quieres cambiar el nombre de tu clave primaria, cambia la propiedad `$primaryKey`:

```php
protected $primaryKey = 'contact_id';
```

Y si quieres configurarlo para que no se incremente, utiliza:

```php
public $incrementing = false;
```

>### Impresión de un Resumen de un Modelo Elocuente

>A medida que su proyecto crece, puede resultar un poco complicado realizar un seguimiento de la definición, los atributos y las relaciones de cada modelo. El comando `model:show` puede ayudarle con esto al ofrecerle un resumen de su modelo e imprimir los nombres de las bases de datos y las tablas. También enumera los atributos junto con los modificadores de columna SQL, el tipo y el tamaño; enumera los mutadores junto con los atributos; enumera todas las relaciones del modelo; y enumera los observadores del modelo.

### Marcas de tiempo

Eloquent espera que cada tabla tenga las columnas de marca de tiempo `created_at` y `updated_at`. Si su tabla no las necesita, deshabilite la funcionalidad `$timestamps`:

```php
public $timestamps = false;
```

Puede personalizar el formato que utiliza Eloquent para almacenar sus marcas de tiempo en la base de datos configurando la propiedad de clase `$dateFormat` en una cadena personalizada. La cadena se analizará utilizando la sintaxis `date()` de PHP, por lo que el siguiente ejemplo almacenará la fecha como segundos desde la época de Unix:


```php
protected $dateFormat = 'U';
```

## Recuperación de Datos con Eloquent

La mayoría de las veces, cuando extraes datos de tu base de datos con Eloquent, utilizarás llamadas estáticas en tu modelo Eloquent.

Comencemos por obtener todo:


```php
$allContacts = Contact::all();
```

Eso fue fácil. Vamos a filtrarlo un poco:

```php
$vipContacts = Contact::where('vip', true)->get();
```

Podemos ver que la fachada `Eloquent` nos da la capacidad de encadenar restricciones, y a partir de allí las restricciones se vuelven muy familiares:

```php
$newestContacts = Contact::orderBy('created_at', 'desc')
    ->take(10)
    ->get();
```

Resulta que una vez que pasas del nombre de la fachada inicial, solo estás trabajando con el generador de consultas de Laravel. Puedes hacer mucho más (lo abordaremos pronto), pero todo lo que puedes hacer con el generador de consultas en la fachada `DB`, también puedes hacerlo en tus objetos Eloquent.

### Obtener uno

Como ya hemos explicado antes en este capítulo, puedes usar `first()` para devolver solo el primer registro de una consulta, o usar `find()` para extraer solo el registro con el ID proporcionado. En ambos casos, si añades "OrFail" al nombre del método, se generará una excepción si no hay resultados coincidentes. Esto hace que `findOrFail()` sea una herramienta común para buscar una entidad por un segmento de URL (o generar una excepción si no existe una entidad coincidente), como puedes ver en el ejemplo siguiente.

_Uso de un método `OrFail()` de Eloquent en un método de controlador_
```php
// ContactController
public function show($contactId)
{
    return view('contacts.show')
        ->with('contact', Contact::findOrFail($contactId));
}
```

:::info Excepciones
Como puede ver en el ejemplo anterior, no necesitamos capturar la excepción de modelo no encontrado de Eloquent (`Illuminate\Database\Eloquent\ModelNotFoundException`) en nuestros controladores; el sistema de enrutamiento de Laravel la capturará y arrojará un error 404 por nosotros.

Por supuesto, puede capturar esa excepción en particular y manejarla, si lo desea.
:::

Cualquier método que tenga como objetivo devolver un único registro (`first()`, `firstOrFail()`, `find()` o `findOrFail()`) devolverá una instancia de la clase Eloquent. Por lo tanto, `Contact::first()` devolverá una instancia de la clase `Contact` con los datos de la primera fila de la tabla completándola.

También puedes utilizar el método `firstWhere()`, que es un atajo que combina `where()` y `first()`:

```php
// With where() and first()
Contact::where('name', 'Wilbur Powery')->first();
```
```php
// With firstWhere()
Contact::firstWhere('name', 'Wilbur Powery');
```

### Obtener muchos

`get()` funciona con Eloquent tal como lo hace en las llamadas normales del generador de consultas — crea una consulta y llama a `get()` al final para obtener los resultados:

```php
$vipContacts = Contact::where('vip', true)->get();
```

Sin embargo, hay un método exclusivo de Eloquent, `all()`, que verás que a menudo la gente usa cuando quiere obtener una lista sin filtrar de todos los datos de la tabla:

```php
$contacts = Contact::all();
```

:::info Usando `get()` en lugar de `all()`
Siempre que puedas usar `all()`, puedes usar `get()`. `Contact::get()` tiene la misma respuesta que `Contact::all()`. Sin embargo, en el momento en que comiences a modificar tu consulta (agregando un filtro `where()`, por ejemplo) — `all()` dejará de funcionar, pero `get()` seguirá funcionando.

Entonces, aunque `all()` es muy común, recomendaría usar `get()` para todo e ignorar el hecho de que `all()` incluso existe.
:::

### Fragmentación de respuestas con `chunk()`

Si alguna vez ha tenido que procesar una gran cantidad (miles o más) de registros a la vez, es posible que haya tenido problemas de memoria o de bloqueo. Laravel permite dividir sus solicitudes en partes más pequeñas (fragmentos) y procesarlas en lotes, manteniendo más pequeña la carga de memoria de su solicitud grande. El ejemplo siguiente ilustra el uso de `chunk()` para dividir una consulta en "fragmentos" de 100 registros cada uno.

_Fragmentación de una consulta Eloquent para limitar el uso de memoria_
```php
Contact::chunk(100, function ($contacts) {
    foreach ($contacts as $contact) {
        // Do something with $contact
    }
});
```

### Agregados

Los agregados que están disponibles en el generador de consultas también están disponibles en las consultas de Eloquent. Por ejemplo:

```php
$countVips = Contact::where('vip', true)->count();
$sumVotes = Contact::sum('votes');
$averageSkill = User::avg('skill_level');
```

## Inserts and Updates with Eloquent

