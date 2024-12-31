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

## Alcances

Hemos hablado de consultas "filtradas", es decir, cualquier consulta en la que no se devuelvan todos los resultados de una tabla. Sin embargo, cada vez que las hemos escrito hasta ahora en este capítulo, ha sido un proceso manual utilizando el generador de consultas.

Los alcances locales y globales en Eloquent le permiten definir _alcances_ prediseñados (filtros) que puede usar cada vez que se consulta un modelo (global) o cada vez que lo consulta con una cadena de métodos particular (local).

### Alcances locales

Los alcances locales son los más sencillos de entender. Tomemos este ejemplo:

```php
$activeVips = Contact::where('vip', true)->where('trial', false)->get();
```

En primer lugar, si escribimos esta combinación de métodos de consulta una y otra vez, se volverá tedioso. Pero además, el _conocimiento_ de cómo definir a alguien como un "activeVIP" ahora está distribuido en nuestra aplicación. Queremos centralizar ese conocimiento. ¿Qué pasaría si pudiéramos escribir esto?

```php
$activeVips = Contact::activeVips()->get();
```

Podemos hacerlo — se llama alcance local y es fácil de definir en la clase `Contact`, como puede ver en el ejemplo siguiente.

_Definición de un alcance local en un modelo_
```php
class Contact extends Model
{
    public function scopeActiveVips($query)
    {
        return $query->where('vip', true)->where('trial', false);
    }
```

Para definir un alcance local, agregamos un método a la clase Eloquent que comienza con “scope” y luego contiene la versión en mayúsculas y minúsculas del nombre del ámbito. A este método se le pasa un generador de consultas y debe devolver un generador de consultas, pero, por supuesto, puede modificar la consulta antes de devolverla; ese es el objetivo.

También puede definir alcances que acepten parámetros, como se muestra en el ejemplo siguiente.

_Pasando parámetros a los alcances_
```php
class Contact extends Model
{
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }
```

Y los usas de la misma manera, simplemente pasando el parámetro al alcance:

```php
$friends = Contact::status('friend')->get();
```

También puedes encadenar `orWhere()` entre dos alcances locales.

```php
$activeOrVips = Contact::active()->orWhere()->vip()->get();
```

### Alcances globales

¿Recuerdas que hablamos de que las eliminaciones suaves solo funcionan si defines el alcance de _todas las consultas_ en el modelo para ignorar los elementos eliminados suavemente? Ese es un alcance global. Y podemos definir nuestros propios alcances globales, que se aplicarán en cada consulta realizada desde un modelo determinado.

Hay dos formas de definir un alcance global: mediante una clausura o mediante una clase entera. En cada una de ellas, registrará el alcance definido en el método `booted()` del modelo. Comencemos con el método de clausura, que se ilustra en el ejemplo siguiente.

_Agregar un alcance global mediante una clausura_
```php
...
class Contact extends Model
{
    protected static function booted()
    {
        static::addGlobalScope('active', function (Builder $builder) {
            $builder->where('active', true);
        });
    }
```

Eso es todo. Acabamos de agregar un alcance global llamado `active`, y ahora todas las consultas en este modelo tendrán como alcance solo las filas con `active` establecido como `true`.

A continuación, probemos el método más largo, como se muestra en el ejemplo siguiente. Ejecute el siguiente comando para crear una clase llamada `ActiveScope`.


```sh
php artisan make:scope ActiveScope
```

Tendrá un método `apply()` que toma una instancia de un generador de consultas y una instancia del modelo.

_Creación de una clase de alcance global_
```php
<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class ActiveScope implements Scope
{
    public function apply(Builder $builder, Model $model): void
    {
        $builder->where('active', true);
    }
}
```

Para aplicar este alcance a un modelo, anule una vez más el método `booted()` del padre y llame a `addGlobalScope()` en la clase usando `static`, como se muestra en el ejemplo siguiente.

_Aplicando un alcance global basado en clases_
```php
<?php

use App\Models\Scopes;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected static function booted()
    {
        static::addGlobalScope(new ActiveScope);
    }
}
```

:::info `Contact` sin espacio de nombres
Es posible que hayas notado que varios de estos ejemplos han utilizado la clase `Contact`, sin espacio de nombres. Esto no es normal y solo lo he hecho para ahorrar espacio en el libro. Normalmente, incluso tus modelos de nivel superior se ubicarían en algo como `App\Models\Contact`.
:::

### Eliminando alcances globales

Hay tres formas de eliminar un alcance global, y las tres utilizan el método `withoutGlobalScope()` o `withoutGlobalScopes()`. Si está eliminando un alcance basado en clausura, el primer parámetro del registro `addGlobalScope()` de ese alcance será la clave que utilizó para habilitarlo:

```php
$allContacts = Contact::withoutGlobalScope('active')->get();
```

Si está eliminando un único alcance global basado en una clase, puede pasar el nombre de la clase a `withoutGlobalScope()` o `withoutGlobalScopes()`:

```php
Contact::withoutGlobalScope(ActiveScope::class)->get();

Contact::withoutGlobalScopes([ActiveScope::class, VipScope::class])->get();
```

O bien, puede simplemente deshabilitar todos los alcances globales para una consulta:

```php
Contact::withoutGlobalScopes()->get();
```

## Personalizar Interacciones de Campo con Accesores, Mutadores y Conversión de atributos

Ahora que hemos cubierto cómo introducir y sacar registros de la base de datos con Eloquent, hablemos sobre cómo decorar y manipular los atributos individuales en sus modelos Eloquent.

Los accesores, mutadores y conversión de atributos le permiten personalizar la forma en que se ingresan o generan los atributos individuales de las instancias de Eloquent. Sin usar ninguno de estos, cada atributo de su instancia de Eloquent se trata como una cadena y no puede tener ningún atributo en sus modelos que no exista en la base de datos. Pero podemos cambiar eso.

### Accesores

Los _accesores_ le permiten definir atributos personalizados en sus modelos Eloquent para cuando esté _leyendo_ datos de la instancia del modelo. Esto puede deberse a que desea cambiar la forma en que se genera una columna en particular o a que desea crear un atributo personalizado que no existe en la tabla de la base de datos.

Para definir un accesor, debe crear un método en su modelo con el nombre de su propiedad, pero en _camelCased_. Por lo tanto, si el nombre de su propiedad es `first_name`, el método de acceso se denominaría `firstName`. Luego, este método debe tener su tipo de retorno que muestre que devuelve una instancia de `Illuminate\Database\Eloquent\Casts\Attribute`.

Vamos a probarlo. Primero, decoraremos una columna preexistente.

_Decorar una columna preexistente utilizando accesores Eloquent_
```php
// Model definition:
use Illuminate\Database\Eloquent\Casts\Attribute;

class Contact extends Model
{
    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => $value ?: '(No name provided)',
        );
    }
}

// Accessor usage:
$name = $contact->name;
```

Pero también podemos utilizar accesores para definir atributos que nunca existieron en la base de datos, como se ve en el ejemplo siguiente.

#### _Definición de un atributo sin columna de respaldo mediante accesores Eloquent_

```php
// Model definition:
class Contact extends Model
{
    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->first_name . ' ' . $this->last_name,
        );
    }
}

// Accessor usage:
$fullName = $contact->full_name;
```

### Mutadores

Los _mutadores_ funcionan de la misma manera que los accesores, excepto que sirven para determinar cómo procesar la _configuración_ de los datos en lugar de obtenerlos. Al igual que con los accesores, puedes usarlos para modificar el proceso de escritura de datos en columnas existentes o para permitir la configuración de columnas que no existen en la base de datos.

Los mutadores se definen de la misma manera que los accesores, pero en lugar del parámetro `get`, configuraremos el parámetro `set`.

Vamos a probarlo. Primero, agregaremos una restricción para actualizar una columna preexistente.

_Modificar la configuración del valor de un atributo mediante mutadores Eloquent_
```php
// Defining the mutator
class Order extends Model
{
    protected function amount(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => $value > 0 ? $value : 0,
        );
    }
}

// Using the mutator
$order->amount = '15';
```

Ahora, agreguemos una columna proxy para la configuración, como se muestra en el ejemplo siguiente. Si configuramos valores en más de una columna al mismo tiempo, o si personalizamos el nombre de la columna que configuramos, podemos devolver una matriz desde el método `set()`.

_Permitir establecer el valor de un atributo inexistente mediante mutadores Eloquent_
```php
// Defining the mutator
class Order extends Model
{
    protected function workgroupName(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => [
                'email' => "{$value}@ourcompany.com",
            ],
        );
    }
}

// Using the mutator
$order->workgroup_name = 'jstott';
```

Como probablemente puedas adivinar, es relativamente poco común crear un mutador para una columna inexistente, porque puede ser confuso establecer una propiedad y hacer que cambie una columna diferente — pero es posible.

### Convirtiendo atributos

Probablemente puedas imaginar escribir accesores para convertir todos tus campos de tipo entero en enteros, codificar y decodificar JSON para almacenar en una columna `TEXT`, o convertir `TINYINT 0` y `1` a y desde valores Booleanos.

Afortunadamente, ya existe un sistema para eso en Eloquent. Se llama _conversión de atributos_ y permite definir que cualquiera de las columnas se trate siempre, tanto en lectura como en escritura, como si perteneciera a un tipo de datos en particular. Las opciones se enumeran en la tabla siguiente.

_Posibles tipos de columnas de conversión de atributos_

|Tipo|Descripción|
|-|-|
|`int\|integer`|Convierte con PHP (`int`)|
|`real\|float\|double`|Convierte con PHP (`float`)|
|`decimal:<digits>`|Convierte con PHP `number_format()` la cantidad de decimales especificada|
|`string`|Convierte con PHP (`string`)|
|`bool\|boolean`|Convierte con PHP (`bool`)|
|`object\|json`|Parsea desde/hacia JSON, como un objeto `stdClass`|
|`array`|Parsea desde/hacia JSON, como una matriz|
|`collection`|Parsea desde/hacia JSON, como una colección|
|`date\|datetime`|Parsea desde la base de datos `DATETIME` a Carbon y viceversa|
|`timestamp`|Parsea desde la base de datos `TIMESTAMP` a Carbon y viceversa|
|`encrypted`|Maneja el cifrado y descifrado de una cadena|
|`enum`|Convierte a una enumeración|
|`hashed`|Maneja el hash de una cadena|

El ejemplo siguiente muestra cómo utilizar la conversión de atributos en su modelo.

_Uso de conversión de atributos en un modelo Eloquent_
```php
use App\Enums\SubscriptionStatus;

class Contact extends Model
{
    protected $casts = [
        'vip' => 'boolean',
        'children_names' => 'array',
        'birthday' => 'date',
        'subscription' => SubscriptionStatus::class
    ];
}
```

### Conversión de atributos personalizados

Si los tipos de atributos integrados no son suficientes, podemos crear tipos de conversión personalizados y usarlos en la matriz `$casts`.

Un tipo de conversión personalizada se puede definir como una clase PHP normal con un método `get` y `set`. El método `get` se llamará al recuperar el atributo dado de un modelo elocuente. El método `set` se llamará antes de guardar el atributo en la base de datos, como puede ver en el ejemplo siguiente.

_Un ejemplo de tipo de yeso personalizado_
```php
<?php

namespace App\Casts;

use Carbon\Carbon;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

class Encrypted implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param array<string, mixed> $attributes
    */
    public function get(Model $model, string $key, mixed $value, array $attributes)
    {
        return Crypt::decrypt($value);
    }

    /**
     * Prepare the given value for storage.
     *
     * @param array<string, mixed> $attributes
    */
    public function set(Model $model, string $key, mixed $value, array $attributes)
    {
        return Crypt::encrypt($value);
    }
}
```

Puede utilizar conversiones personalizadas en la propiedad `$casts` en su modelo Eloquent:

```php
protected $casts = [
  'ssn' => \App\Casts\Encrypted::class,
];
```

## Colecciones Elocuentes

Cuando realiza una llamada de consulta en Eloquent que tiene el potencial de devolver varias filas, en lugar de una matriz, se incluirán en una colección de Eloquent, que es un tipo especializado de colección. Echemos un vistazo a las colecciones y las colecciones de Eloquent, y qué las hace mejores que las matrices simples.

### Presentamos la colección básica

Los objetos de colección de Laravel (`Illuminate\Support\Collection`) son un poco como matrices con esteroides. Los métodos que exponen en objetos similares a matrices son tan útiles que, una vez que los hayas usado durante un tiempo, probablemente querrás incorporarlos a proyectos que no sean de Laravel — lo cual puedes hacer con el paquete [Illuminate/Collections](https://github.com/illuminate/collections).

La forma más sencilla de crear una colección es usar el asistente `collect()`. Pasa una matriz o úsala sin argumentos para crear una colección vacía y luego insertar elementos en ella. Probémoslo:

```php
$collection = collect([1, 2, 3]);
```

Ahora digamos que queremos filtrar todos los números pares:

```php
$odds = $collection->reject(function ($item) {
    return $item % 2 === 0;
});
```

O bien, ¿qué sucede si queremos obtener una versión de la colección en la que cada elemento se multiplique por 10? Podemos hacerlo de la siguiente manera:

```php
$multiplied = $collection->map(function ($item) {
    return $item * 10;
});
```

Incluso podemos obtener solo los números pares, multiplicarlos todos por 10 y reducirlos a un solo número mediante `sum()`:

```php
$sum = $collection
    ->filter(function ($item) {
        return $item % 2 == 0;
    })->map(function ($item) {
        return $item * 10;
    })->sum();
```

Como puede ver, las colecciones proporcionan una serie de métodos que, opcionalmente, se pueden encadenar para realizar operaciones funcionales en sus matrices. Proporcionan la misma funcionalidad que los métodos nativos de PHP, como `array_map()` y `array_reduce()`, pero no tiene que memorizar el orden impredecible de los parámetros de PHP y la sintaxis de encadenamiento de métodos es infinitamente más legible.

Hay más de 60 métodos disponibles en la clase `Collection`, incluidos los métodos `max()`, `whereIn()`, `flatten()` y `flip()` — no hay suficiente espacio para cubrirlos todos aquí. Hablaremos más sobre ellos [aquí](../helpers-and-collections/helpers.html), o puedes consultar la [documentación de colecciones de Laravel](https://laravel.com/docs/11.x/collections) para ver todos los métodos.

:::info Colecciones en lugar de matrices
Las colecciones también se pueden usar en cualquier contexto (excepto en la sugerencia de tipado) en el que se puedan usar matrices. Permiten la iteración, por lo que se pueden pasar a `foreach;` y permiten el acceso a matrices, por lo que si tienen claves, se puede probar `$a = $collection['a']`.
:::

### Colecciones deiferidas

Las [colecciones deiferidas](https://laravel.com/docs/11.x/collections#lazy-collections) aprovechan el poder de los generadores PHP para procesar conjuntos de datos muy grandes mientras mantienen muy bajo el uso de memoria de su aplicación.

Imagina que necesitas iterar sobre 100,000 contactos en tu base de datos. Si estuvieras usando las `Collections` normales de Laravel, probablemente te encontrarías con problemas de memoria muy rápidamente; todos los 100,000 registros se cargarían en la memoria, y eso es mucho pedirle a tu máquina:

```php
$verifiedContacts = App\Contact::all()->filter(function ($contact) {
    return $contact->isVerified();
});
```

Eloquent simplifica el uso de colecciones diferidas con sus modelos Eloquent. Si utiliza el método `cursor`, los modelos Eloquent devolverán una instancia de `LazyCollection` en lugar de la clase `Collection` predeterminada. Al utilizar colecciones diferidas, su aplicación solo cargará un registro a la vez en la memoria:

```php
$verifiedContacts = App\Contact::cursor()->filter(function ($contact) {
    return $contact->isVerified();
});
```

### ¿Qué agregan las colecciones elocuentes?

Cada colección Eloquent es una colección normal, pero ampliada para las necesidades particulares de una colección de resultados Eloquent.

Una vez más, aquí no hay suficiente espacio para cubrir todas las adiciones, pero se centran en los aspectos únicos de la interacción con una colección no solo de objetos genéricos, sino de objetos destinados a representar filas de bases de datos.

Por ejemplo, cada colección Eloquent tiene un método llamado `modelKeys()` que devuelve una matriz de las claves principales de cada instancia de la colección. `find($id)` busca una instancia que tenga la clave principal de `$id`.

Una característica adicional disponible aquí es la capacidad de definir que cualquier modelo dado debe devolver sus resultados envueltos en una clase específica de colección. Por lo tanto, si desea agregar métodos específicos a cualquier colección de objetos de su modelo `Order` — posiblemente relacionados con el resumen de los detalles financieros de sus pedidos — puede crear una `OrderCollection` personalizada que extienda `Illuminate\Database\Eloquent\Collection` y luego registrarla en su modelo, como se muestra en el ejemplo siguiente.

_Clases `Collection` personalizadas para modelos Eloquent_
```php
...
class OrderCollection extends Collection
{
    public function sumBillableAmount()
    {
        return $this->reduce(function ($carry, $order) {
            return $carry + ($order->billable ? $order->amount : 0);
        }, 0);
    }
}
```
```php
...
class Order extends Model
{
    public function newCollection(array $models = [])
    {
        return new OrderCollection($models);
    }
```

Ahora, cada vez que obtengas una colección de `Orders` (por ejemplo, de `Order::all()`), en realidad será una instancia de la clase `OrderCollection`:

```php
$orders = Order::all();
$billableAmount = $orders->sumBillableAmount();
```

## Serialización Elocuente

La _serialización_ es lo que sucede cuando tomas algo complejo — una matriz o un objeto — y lo conviertes en una cadena. En un contexto basado en la web, esa cadena suele ser JSON, pero también puede adoptar otras formas.

La serialización de registros complejos de bases de datos puede ser, bueno, compleja, y este es uno de los puntos en los que muchos ORMs fallan. Afortunadamente, con Eloquent obtienes dos métodos poderosos de forma gratuita: `toArray()` y `toJson()`. Las colecciones también tienen `toArray()` y `toJson()`, por lo que todos estos son válidos:

```php
$contactArray = Contact::first()->toArray();
$contactJson = Contact::first()->toJson();
$contactsArray = Contact::all()->toArray();
$contactsJson = Contact::all()->toJson();
```

También puedes convertir una instancia o colección de Eloquent a una cadena (`$string = (string) $contact;`), pero tanto los modelos como las colecciones simplemente ejecutarán `toJson()` y devolverán el resultado.

### Devolver modelos directamente desde los métodos de ruta

El enrutador de Laravel finalmente convierte todo lo que los métodos de ruta devuelven en una cadena, por lo que hay un truco inteligente que puedes usar. Si devuelves el resultado de una llamada Eloquent en un controlador, se convertirá automáticamente en una cadena y, por lo tanto, se devolverá como JSON. Eso significa que una ruta que devuelva JSON puede ser tan simple como cualquiera de las del ejemplo simple.

_Devolver JSON directamente desde las rutas_
```php
// routes/web.php
Route::get('api/contacts', function () {
    return Contact::all();
});

Route::get('api/contacts/{id}', function ($id) {
    return Contact::findOrFail($id);
});
```

### Ocultar atributos de JSON

Es muy común usar retornos JSON en las API, y es muy común querer ocultar ciertos atributos en estos contextos, por eso Eloquent hace que sea fácil ocultar cualquier atributo cada vez que se convierte a JSON.

Puede deshabilitar atributos específicos y ocultar los que enumera:

```php
class Contact extends Model
{
    public $hidden = ['password', 'remember_token'];
```

o permitir atributos específicos, mostrando solo los que enumera:

```php
class Contact extends Model
{
    public $visible = ['name', 'email', 'status'];
```

Esto también funciona para las relaciones:

```php
class User extends Model
{
    public $hidden = ['contacts'];

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }
```


:::info Cargando el Contenido de una Relación
De manera predeterminada, el contenido de una relación no se carga cuando se obtiene un registro de la base de datos, por lo que no importa si se oculta o no. Pero, como aprenderá en breve, es posible obtener un registro _con_ sus elementos relacionados y, en este contexto, esos elementos no se incluirán en una copia serializada de ese registro si decide ocultar esa relación.

En caso de que ahora tengas curiosidad, puedes obtener un `User` con todos los contactos — suponiendo que hayas configurado la relación correctamente — con la siguiente llamada:
```php
$user = User::with('contacts')->first();
```
:::

Puede haber ocasiones en las que desees que un atributo sea visible solo para una única llamada. Esto es posible con el método Eloquent `makeVisible()`:

```php
$array = $user->makeVisible('remember_token')->toArray()
```

:::info Agregar una Columna Generada a la Matriz y la Salida JSON
Si ha creado un accesor para una columna que no existe — [por ejemplo, nuestra columna `full_name`](./introduction-to-eloquent.html#definicion-de-un-atributo-sin-columna-de-respaldo-mediante-accesores-eloquent)  —, puede agregarlo a la matriz `$appends` en el modelo, lo que lo agregará a la matriz y a la salida JSON:
```php
class Contact extends Model
{
    protected $appends = ['full_name'];

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
```
:::

## Eloquent Relationships

