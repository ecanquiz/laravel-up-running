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

## Inserciones y Actualizaciones con Eloquent

La inserción y actualización de valores es uno de los lugares donde Eloquent comienza a desviarse de la sintaxis normal del generador de consultas.

### Inserciones

Existen dos formas principales de insertar un nuevo registro con Eloquent. Primero, puede crear una nueva instancia de su clase Eloquent, configurar sus propiedades manualmente y llamar a `save()` en esa instancia, como en el ejemplo siguiente.

_Inserción de un registro Eloquent mediante la creación de una nueva instancia_
```php
$contact = new Contact;
$contact->name = 'Ken Hirata';
$contact->email = 'ken@hirata.com';
$contact->save();

// or

$contact = new Contact([
    'name' => 'Ken Hirata',
    'email' => 'ken@hirata.com',
]);
$contact->save();

// or

$contact = Contact::make([
   'name' => 'Ken Hirata',
   'email' => 'ken@hirata.com',
]);
$contact->save();
```

Hasta que guarde la operación `save()`, esta instancia de `Contact` representa el contacto por completo — excepto que nunca se guardó en la base de datos. Eso significa que no tiene un `id`, no persistirá si la aplicación se cierra y no tiene sus valores `created_at` y `updated_at` configurados

También puedes pasar una matriz a `Model::create()`, como se muestra en el siguiente ejemplo. A diferencia de `make()`, `create()` guarda la instancia en la base de datos tan pronto como se la llama.

_Insertar un registro Eloquent pasando una matriz a `create()`_
```php
$contact = Contact::create([
    'name' => 'Keahi Hale',
    'email' => 'halek481@yahoo.com',
]);
```

También tenga en cuenta que en cualquier contexto en el que pase una matriz (a `new Model()`, `Model::make()`, `Model::create()` o `Model::update()`), cada propiedad que configure a través de `Model::create()` debe ser aprobada para la "asignación masiva", que cubriremos en breve. Esto no es necesario con el primer ejemplo, donde asigna cada propiedad individualmente.

Tenga en cuenta que si está usando `Model::create()`, no necesita `save()` la instancia; eso se maneja como parte del método `create()` del modelo.

### Actualizaciones

La actualización de registros es muy similar a la inserción. Puede obtener una instancia específica, cambiar sus propiedades y luego guardarla, o puede realizar una única llamada y pasar una matriz de propiedades actualizadas. El ejemplo siguiente ilustra el primer enfoque.

_Actualizar un registro de Eloquent actualizando una instancia y guardándola_
```php
$contact = Contact::find(1);
$contact->email = 'natalie@parkfamily.com';
$contact->save();
```

Dado que este registro ya existe, ya tendrá una marca de tiempo `created_at` y un `id`, que permanecerán iguales, pero el campo `updated_at` se cambiará a la fecha y hora actuales. El ejemplo siguiente ilustra el segundo enfoque.

_Actualización de uno o más registros de Eloquent pasando una matriz al método `update()`_
```php
Contact::where('created_at', '<', now()->subYear())
    ->update(['longevity' => 'ancient']);

// or

$contact = Contact::find(1);
$contact->update(['longevity' => 'ancient']);
```

Este método espera una matriz donde cada clave es el nombre de la columna y cada valor es el valor de la columna.

### Asignación masiva

Hemos visto algunos ejemplos de cómo pasar matrices de valores a los métodos de clase de Eloquent. Sin embargo, ninguno de ellos funcionará hasta que definas qué campos se pueden "rellenar" en el modelo.

El objetivo de esto es protegerlo de entradas de usuarios (posiblemente maliciosas) que establezcan valores nuevos por accidente en campos que no desea cambiar. Considere el escenario común del ejemplo siguiente.

_Actualización de un modelo Eloquent utilizando la totalidad de la entrada de una solicitud_
```php
// ContactController
public function update(Contact $contact, Request $request)
{
    $contact->update($request->all());
}
```

El objeto `Request` de Illuminate en el ejemplo anterior tomará cada dato ingresado por el usuario y lo pasará al método `update()`. Ese método `all()` incluye cosas como parámetros de URL y entradas de formulario, por lo que un usuario malintencionado podría agregar fácilmente algunas cosas allí, como `id` y `owner_id`, que probablemente no desee que se actualicen.

Afortunadamente, eso no funcionará hasta que definas los campos rellenables de tu modelo. Puedes definir los “campos rellenables permitidos” o los “campos _protegidos_ no permitidos” para determinar qué campos se pueden o no editar mediante una _asignación_ masiva — es decir, pasando una matriz de valores a `create()` o `update()`. Ten en cuenta que las propiedades no rellenables aún se pueden cambiar mediante una asignación directa (por ejemplo, `$contact->password = 'abc';`). El ejemplo siguiente muestra ambos enfoques.

_Uso de propiedades rellenables o protegidas de Eloquent para definir campos asignables en masa_
```php
class Contact extends Model
{
    protected $fillable = ['name', 'email'];

    // or

    protected $guarded = ['id', 'created_at', 'updated_at', 'owner_id'];
}
```

:::info Uso de `Request::only()` con Eloquent Asignación Masiva
En el primer ejemplo, necesitábamos la protección de asignación masiva de Eloquent porque estábamos usando el método `all()` en el objeto `Request` para pasar la _totalidad_ de la entrada del usuario.

La protección de asignación masiva de Eloquent es una gran herramienta en este caso, pero también hay un truco útil para evitar que aceptes cualquier entrada anterior del usuario.

La clase `Request` tiene un método `only()` que te permite extraer solo algunas claves de la entrada del usuario. Ahora puedes hacer esto:
```php
Contact::create($request->only('name', 'email'));
```
:::

### `firstOrCreate()` y `firstOrNew()`

A veces, desea decirle a su aplicación: “Consígame una instancia con estas propiedades o, si no existe, créela”. Aquí es donde entran en juego los métodos `firstOr*()`.

Los métodos `firstOrCreate()` y `firstOrNew()` toman una matriz de claves y valores como su primer parámetro:

```php
$contact = Contact::firstOrCreate(['email' => 'luis.ramos@myacme.com']);
```

Ambos buscarán y recuperarán el primer registro que coincida con esos parámetros y, si no hay registros coincidentes, crearán una instancia con esas propiedades; `firstOrCreate()` conservará esa instancia en la base de datos y luego la devolverá, mientras que `firstOrNew()` la devolverá sin guardarla.

Si pasa una matriz de valores como segundo parámetro, esos valores se agregarán a la entrada creada (si se crea) pero _no se_ usarán para buscar si la entrada existe.

## Eliminar con Eloquent

Eliminar con Eloquent es muy similar a actualizar con Eloquent, pero con eliminaciones suaves (opcionales), puede archivar los elementos eliminados para inspeccionarlos más tarde o incluso recuperarlos.

### Eliminaciones normales

La forma más sencilla de eliminar un registro de modelo es llamar al método `delete()` en la propia instancia:

```php
$contact = Contact::find(5);
$contact->delete();
```

Sin embargo, si solo tiene el ID, no hay razón para buscar una instancia solo para eliminarla; puede pasar un ID o una matriz de ID al método `destroy()` del modelo para eliminarlos directamente:

```php
Contact::destroy(1);
// or
Contact::destroy([1, 5, 7]);
```

Por último, puedes eliminar todos los resultados de una consulta:

```php
Contact::where('updated_at', '<', now()->subYear())->delete();
```

### Eliminaciones suaves

Las _eliminaciones suaves_ marcan las filas de la base de datos como eliminadas sin eliminarlas realmente de la base de datos. Esto le permite inspeccionarlas más tarde, tener registros que muestren más que "sin información, eliminado" al mostrar información histórica y permitir que sus usuarios (o administradores) restauren algunos o todos los datos.

La parte difícil de codificar manualmente una aplicación con eliminaciones suaves es que _cada consulta_ que escriba deberá excluir los datos eliminados. Afortunadamente, si usa las eliminaciones suaves de Eloquent, cada consulta que realice tendrá el alcance para ignorar las eliminaciones suaves de manera predeterminada, a menos que solicite explícitamente recuperarlas.

La función de eliminación suave de Eloquent requiere que se agregue una columna `deleted_at` a la tabla. Una vez que habilite las eliminaciones suaves en ese modelo de Eloquent, todas las consultas que escriba (a menos que incluya explícitamente registros eliminados suavemente) tendrán un alcance que ignorará las filas eliminadas suavemente.

>### ¿Cuándo Debo Usar Eliminaciones Suaves?

>El hecho de que exista una característica no significa que deba usarla siempre. Muchas personas en la comunidad de Laravel usan por defecto eliminaciones suaves en cada proyecto solo porque la característica está ahí. Sin embargo, las eliminaciones suaves tienen costos reales. Es bastante probable que, si ve su base de datos directamente en una herramienta como Sequel Pro, se olvide de verificar la columna `delete_at` al menos una vez. Y si no limpia los registros antiguos eliminados de forma suave, sus bases de datos serán cada vez más grandes.

>Mi recomendación es la siguiente: no utilices las eliminaciones suaves de forma predeterminada. En su lugar, úsalas cuando las necesites y, cuando las necesites, limpia las eliminaciones suaves antiguas con la mayor intensidad posible utilizando una herramienta como [Quicksand](https://github.com/tighten/quicksand). La función de eliminación suave es una herramienta potente, pero no vale la pena usarla a menos que la necesites.

### Habilitar eliminaciones suaves

Puede habilitar las eliminaciones suaves haciendo dos cosas: agregando la columna `deleted_at` en una migración e importando el atributo `SoftDeletes` en el modelo. Hay un método `softDeletes()` disponible en el generador de esquemas para agregar la columna `deleted_at` a una tabla, como puede ver en el ejemplo siguiente. 

_Migración para agregar la columna de eliminación suave a una tabla_
```php
Schema::table('contacts', function (Blueprint $table) {
    $table->softDeletes();
});
```

El ejemplo siguiente muestra un modelo Eloquent con eliminaciones suaves habilitadas.

_Un modelo Eloquent con eliminaciones suaves habilitadas_
```php
<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use SoftDeletes; // use the trait
}
```

Una vez que realice estos cambios, cada llamada `delete()` y `destroy()` establecerá la columna `deleted_at` en su fila como la fecha y hora actuales en lugar de eliminar esa fila. Y todas las consultas futuras excluirán esa fila como resultado.

### Consultas con eliminaciones suaves

Entonces, ¿cómo obtenemos los elementos eliminados suavemente?

En primer lugar, puede agregar elementos eliminados suavemente a una consulta:

```php
$allHistoricContacts = Contact::withTrashed()->get();
```

A continuación, puede utilizar el método `trashed()` para ver si se ha eliminado suavemente una instancia particular:

```php
if ($contact->trashed()) {
// do something
}
```

Finalmente, puedes obtener _solo_ elementos eliminados suavemente:

```php
$deletedContacts = Contact::onlyTrashed()->get();
```

### Restauración de entidades eliminadas suavemente


Si desea restaurar un elemento eliminado suavemente, puede ejecutar `restore()` en una instancia o una consulta:

```php
$contact->restore();

// or

Contact::onlyTrashed()->where('vip', true)->restore();
```

### Eliminación forzada de entidades eliminadas suavemente

Puede eliminar una entidad eliminada suavemente llamando a `forceDelete()` en una entidad o consulta:

```php
$contact->forceDelete();

// or

Contact::onlyTrashed()->forceDelete();
```

## Scopes

