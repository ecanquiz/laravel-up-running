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

## Relaciones Elocuentes

En un modelo de base de datos relacional, se espera que tenga tablas _relacionadas_ entre sí — de ahí el nombre. Eloquent ofrece herramientas simples y potentes para que el proceso de relacionar las tablas de su base de datos sea más fácil que nunca.

Muchos de nuestros ejemplos en este capítulo se han centrado en un `user` que tiene muchos `contacts`, una situación relativamente común.

En un ORM como Eloquent, esto se llamaría una relación _de uno a muchos_: un usuario tiene muchos contactos.

Si se tratara de un CRM en el que un contacto pudiera asignarse a muchos usuarios, se trataría de una relación de _muchos a muchos_: muchos usuarios pueden estar relacionados con un contacto y cada usuario puede estar relacionado con muchos contactos. Un usuario _tiene y pertenece a muchos_ contactos.

Si cada contacto puede tener muchos números de teléfono y un usuario quiere una base de datos de cada número de teléfono para su CRM, diría que el usuario _tiene muchos_ números de teléfono _a través de_ contactos, es decir, un usuario _tiene muchos_ contactos y el contacto _tiene muchos_ números de teléfono, por lo que el contacto es una especie de intermediario.

¿Y si cada contacto tiene una dirección, pero solo te interesa hacer un seguimiento de una de ellas? Puedes tener todos los campos de dirección en el `Contact`, pero también puedes crear un modelo `Address`, es decir, que el contacto _tiene_ una dirección.

Por último, ¿qué ocurre si desea poder darle estrellas (como favoritos) a los contactos, pero también a los eventos? Se trataría de una relación _polimórfica_, en la que un usuario _tiene muchas_ estrellas, pero algunas pueden ser contactos y otras eventos.

Veamos ahora cómo definir y acceder a estas relaciones.

### Uno a uno

Empecemos por algo sencillo: un `Contact` _tiene un_ número de teléfono. Esta relación se define en el ejemplo siguiente.

_Definición de una relación uno a uno_
```php
class Contact extends Model
{
    public function phoneNumber()
    {
        return $this->hasOne(PhoneNumber::class);
    }
```

Como puedes ver, los métodos que definen relaciones están en el propio modelo Eloquent (`$this->hasOne()`) y toman, al menos en esta instancia, el nombre de clase completo de la clase con la que los estás relacionando.

¿Cómo debería definirse esto en su base de datos? Dado que hemos definido que `Contact` tiene un `PhoneNumber`, Eloquent espera que la tabla que admite la clase `PhoneNumber` (probablemente `phone_numbers`) tenga una columna `contact_id`. Si le dio un nombre diferente (por ejemplo, `owner_id`), deberá cambiar su definición:

```php
return $this->hasOne(PhoneNumber::class, 'owner_id');
```

Así es como accedemos al `PhoneNumber` de un `Contact`:

```php
$contact = Contact::first();
$contactPhone = $contact->phoneNumber;
```

Ten en cuenta que definimos el método en el ejemplo anterior con `phoneNumber()`, pero accedemos a él con `->phoneNumber`. Esa es la magia. También puedes acceder a él con `->phone_number`. Esto devolverá una instancia completa de Eloquent del registro `PhoneNumber` relacionado.

Pero ¿qué pasa si queremos acceder al `Contact` desde el `PhoneNumber`? También hay un método para eso (consulte el ejemplo siguiente).

_Definición de la inversa de una relación uno a uno_
```php
class PhoneNumber extends Model
{
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
```

Luego accedemos de la misma manera:

```php
$contact = $phoneNumber->contact;
```

>### Insertar Elementos Relacionados
>Cada tipo de relación tiene sus propias peculiaridades sobre cómo relacionar modelos, pero aquí está el núcleo de cómo funciona: pasa una instancia a `save()`, o una matriz de instancias a `saveMany()`. También puedes pasar propiedades a `create()` o `createMany()` y ellos crearán nuevas instancias para ti:
>```php
>$contact = Contact::first();
>
>$phoneNumber = new PhoneNumber;
>$phoneNumber->number = 8008675309;
>$contact->phoneNumbers()->save($phoneNumber);
>
>// or
>
>$contact->phoneNumbers()->saveMany([
>    PhoneNumber::find(1),
>    PhoneNumber::find(2),
>]);
>
>// or
>
>$contact->phoneNumbers()->create([
>    'number' => '+13138675309',
>]);
>
>// or
>
>$contact->phoneNumbers()->createMany([
>    ['number' => '+13138675309'],
>    ['number' => '+15556060842'],
>]);
>```

### Uno a muchos

La relación de uno a muchos es, por lejos, la más común. Veamos cómo definir que nuestro `User` _tiene muchos_ `Contact` (ejemplo siguiente).

_Definición de una relación de uno a muchos_
```php
class User extends Model
{
    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }
```

Una vez más, esto espera que la tabla de respaldo del modelo `Contact` (probablemente `contacts`) tenga una columna `user_id`. Si no la tiene, anúlela pasando el nombre de columna correcto como segundo parámetro de `hasMany()`.

Podemos obtener los `Contacts` de un `User` de la siguiente manera:

```php
$user = User::first();
$usersContacts = $user->contacts;
```

Al igual que con la relación uno a uno, utilizamos el nombre del método de relación y lo llamamos como si fuera una propiedad en lugar de un método. Sin embargo, este método devuelve una colección en lugar de una instancia de modelo. Y esta es una colección Eloquent normal, por lo que podemos divertirnos con ella:

```php
$donors = $user->contacts->filter(function ($contact) {
    return $contact->status == 'donor';
});

$lifetimeValue = $contact->orders->reduce(function ($carry, $order) {
    return $carry + $order->amount;
}, 0);
```

Al igual que con uno a uno, también podemos definir la inversa (ejemplo siguiente).

_Definición de la inversa de una relación de uno a muchos_
```php
class Contact extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
```

Y al igual que en el uno a uno, podemos acceder al `User` desde el `Contact`:

```php
$userName = $contact->user->name;
```

:::info Adjuntar y Despegar Elementos Relacionados del Elemento Adjunto
La mayoría de las veces adjuntamos un elemento ejecutando `save()` en el elemento principal y pasando el elemento relacionado, como en `$user->contacts()->save($contact)`. Pero si desea realizar estos comportamientos en el elemento adjunto (“secundario”), puede usar `associate()` y `dissociate()` en el método que devuelve la relación `belongsTo`:
```php
$contact = Contact::first();

$contact->user()->associate(User::first());
$contact->save();

// and later

$contact->user()->dissociate();
$contact->save();
```
:::

#### Uso de relaciones como generadores de consultas

Hasta ahora, hemos tomado el nombre del método (por ejemplo, `contacts()`) y lo hemos llamado como si fuera una propiedad (por ejemplo, `$user->contacts`). ¿Qué sucede si lo llamamos como un método? En lugar de procesar la relación, devolverá un generador de consultas con un ámbito predefinido.

Entonces, si tienes `User` `1`, y llamas a su método `contacts()`, ahora tendrás un generador de consultas con un alcance predeterminado para “todos los contactos que tienen un campo `user_id` con el valor `1`”. Luego puedes crear una consulta funcional desde allí:

```php
$donors = $user->contacts()->where('status', 'donor')->get();
```

#### Seleccionar solo registros que tengan un elemento relacionado

Puede elegir seleccionar solo registros que cumplan con criterios particulares con respecto a sus elementos relacionados utilizando `has()`:

```php
$postsWithComments = Post::has('comments')->get();
```

También puedes ajustar aún más los criterios:

```php
$postsWithManyComments = Post::has('comments', '>=', 5)->get();
```

Puedes anidar los criterios:

```php
$usersWithPhoneBooks = User::has('contacts.phoneNumbers')->get();
```

Y por último, puedes escribir consultas personalizadas sobre los elementos relacionados:

```php
// Gets all contacts with a phone number containing the string "867-5309"
$jennyIGotYourNumber = Contact::whereHas('phoneNumbers', function ($query) {
    $query->where('number', 'like', '%867-5309%');
})->get();

// Shortened version of the same code above
$jennyIGotYourNumber = Contact::whereRelation(
    'phoneNumbers',
    'number',
    'like',
    '%867-5309'
)->get();
```

### Tiene uno de muchos

Un escenario común al recuperar registros de una relación de uno a muchos es que desea recuperar solo un elemento de esa relación, a menudo el más nuevo o el más antiguo. Laravel proporciona una herramienta conveniente para estas situaciones: tiene uno de muchos.

Las relaciones _has-one-of-many_ le permiten definir que un método determinado debe recuperar el elemento más nuevo en una colección relacionada, o el elemento más antiguo, o el elemento con el valor mínimo o máximo de cualquier columna en particular, como puede ver en el ejemplo siguiente.

_Definición de relaciones de tipo "tiene uno de muchos"_
```php
class User extends Model
{
    public function newestContact(): HasOne
    {
        return $this->hasOne(Contact::class)->latestOfMany();
    }

    public function oldestContact(): HasOne
    {
        return $this->hasOne(Contact::class)->oldestOfMany();
    }

    public function emergencyContact(): HasOne
    {
        return $this->hasOne(Contact::class)->ofMany('priority', 'max');
    }
```

### Tiene muchos a través

`hasManyThrough()` es realmente un método conveniente para extraer relaciones de una relación. Piense en el ejemplo que di antes, donde un `User` tiene muchos `Contacts` y cada `Contact` tiene muchos `PhoneNumbers`. ¿Qué sucede si desea obtener la lista de números de teléfono de contacto de un usuario? Esa es una relación de tipo tiene-muchos-a-través.

Esta estructura supone que la tabla `contacts` tiene un `user_id` para relacionar los contactos con los usuarios y la tabla `phone_numbers` tiene un `contact_id` para relacionarla con los contactos. Luego, definimos la relación en `User` como en el ejemplo siguiente.

_Definición de una relación de tiene-muchos-a-través_
```php
class User extends Model
{
    public function phoneNumbers()
    {
        // Newer string-based syntax
        return $this->through('contact')->has('phoneNumber');

        // Traditional syntax
        return $this->hasManyThrough(PhoneNumber::class, Contact::class);
    }
```

Para acceder a esta relación, utilice `$user->phone_numbers`. Si necesita personalizar la clave de la relación en los modelos intermedios o distantes, utilice la sintaxis tradicional; puede definir la clave en el modelo intermedio (con el tercer parámetro de `hasManyThrough()`) y la clave de la relación en el modelo distante (con el cuarto parámetro).

### Tiene uno a través

`hasOneThrough()` es como `hasManyThrough()`, pero en lugar de acceder a muchos elementos relacionados a través de elementos intermedios, solo accede a un único elemento relacionado a través de un único elemento intermedio.

¿Qué sucedería si cada usuario perteneciera a una empresa y esa empresa tuviera un único número de teléfono y quisieras poder obtener el número de teléfono de un usuario extrayendo el número de teléfono de su empresa? Esa es una relación de tipo "tiene uno a través", como se muestra en el ejemplo siguiente.

_Definición de una relación de tiene-uno-a-través_
```php
class User extends Model
{
    public function phoneNumber()
    {
        // Newer string-based syntax
        return $this->through('company')->has('phoneNumber');

        // Traditional syntax
        return $this->hasOneThrough(PhoneNumber::class, Company::class);
    }
```

### Muchos a muchos

Aquí es donde las cosas empiezan a complicarse. Tomemos como ejemplo un CRM que permite que un `User` tenga muchos `Contacts` y que cada `Contact` esté relacionado con varios `Useres`.

Primero, definimos la relación con el `User` como en el ejemplo siguiente.

_Definición de una relación de muchos-a-muchos_
```php
class User extends Model
{
    public function contacts()
    {
        return $this->belongsToMany(Contact::class);
    }
}
```

Y como esto es de muchos a muchos, la inversa se ve exactamente igual (ejemplo siguiente).

_Definición de la inversa de una relación de muchos-a-muchos_
```php
class Contact extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
```

Dado que un único `Contact` no puede tener una columna `user_id` y un único `User` no puede tener una columna `contact_id`, las relaciones de varios a varios se basan en una tabla dinámica que conecta a los dos. La denominación convencional de esta tabla se realiza colocando los dos nombres de tabla singulares juntos, ordenados alfabéticamente y separándolos con un guión bajo.

Entonces, dado que estamos vinculando `users` y `contacts`, nuestra tabla dinámica debería llamarse `contact_user` (si desea personalizar el nombre de la tabla, páselo como segundo parámetro al método `belongsToMany()`). Necesita dos columnas: `contact_id` y `user_id`.

Al igual que con `hasMany()`, obtenemos acceso a una colección de elementos relacionados, pero esta vez es desde ambos lados (ejemplo siguiente).

_Acceder a los elementos relacionados desde ambos lados de una relación de muchos-a-muchos_
```php
$user = User::first();

$user->contacts->each(function ($contact) {
    // do something
});

$contact = Contact::first();

$contact->users->each(function ($user) {
    // do something
});

$donors = $user->contacts()->where('status', 'donor')->get();
```

#### Obtener datos de tabla pivote

Una característica exclusiva de muchos a muchos es que es nuestra primera relación que tiene una tabla pivote. Cuantos menos datos tenga en una tabla pivote, mejor, pero hay algunos casos en los que es valioso almacenar información en su tabla pivote — por ejemplo, es posible que desee almacenar un campo `created_at` para ver cuándo se creó esta relación.

Para almacenar estos campos, debe agregarlos a la definición de la relación, como en el ejemplo siguiente. Puede definir campos específicos utilizando `withPivot()` o agregar marcas de tiempo `created_at` y `updated_at` utilizando `withTimestamps()`.

_Agregar campos a un registro pivote_
```php
public function contacts()
{
    return $this->belongsToMany(Contact::class)
        ->withTimestamps()
        ->withPivot('status', 'preferred_greeting');
    }
```

Cuando obtienes una instancia de modelo a través de una relación, tendrá una propiedad `pivot`, que representará su lugar en la tabla pivote de la que la acabas de extraer. Por lo tanto, puedes hacer algo como el ejemplo siguiente.

_Obtención de datos de la entrada pivote de un elemento relacionado_
```php
$user = User::first();

$user->contacts->each(function ($contact) {
    echo sprintf(
        'Contact associated with this user at: %s',
        $contact->pivot->created_at
    );
});
```

Si lo desea, puede personalizar la clave `pivot` para que tenga un nombre diferente usando el método `as()`, como se muestra en el ejemplo siguiente.

_Personalizar el nombre del atributo pivote_
```php
// User model
public function groups()
{
    return $this->belongsToMany(Group::class)
        ->withTimestamps()
        ->as('membership');
}

// Using this relationship:
User::first()->groups->each(function ($group) {
    echo sprintf(
        'User joined this group at: %s',
        $group->membership->created_at
    );
});
```

>#### Aspectos Únicos de Adjuntar y Desacoplar Elementos Relacionados de Muchos-a-Muchos
>Dado que su tabla pivote puede tener sus propias propiedades, debe poder configurarlas cuando adjunte un elemento relacionado de muchos-a-muchos. Puede hacerlo pasando una matriz como segundo parámetro a `save()`:
>```php
>$user = User::first();
>$contact = Contact::first();
>$user->contacts()->save($contact, ['status' => 'donor']);
>```
>Además, puedes usar `attach()` y `detach()` y, en lugar de pasar una instancia de un elemento relacionado, puedes pasar simplemente un ID. Funcionan de la misma manera que `save()` pero también pueden aceptar una matriz de IDs sin que necesites cambiar el nombre del método a algo como `attachMany()`:
>```php
>$user = User::first();
>$user->contacts()->attach(1);
>$user->contacts()->attach(2, ['status' => 'donor']);
>$user->contacts()->attach([1, 2, 3]);
>$user->contacts()->attach([
>    1 => ['status' => 'donor'],
>    2,
>    3,
>]);
>
>$user->contacts()->detach(1);
>$user->contacts()->detach([1, 2]);
>$user->contacts()->detach(); // Detaches all contacts
>```
>Si su objetivo no es adjuntar o separar, sino simplemente invertir el estado actual del adjunto, necesitará el método `toggle()`. Cuando utilice `toggle()`, si el ID dado está actualmente adjunto, se desacoplará; y si está actualmente acoplado, se adjuntará:
>```php
>$user->contacts()->toggle([1, 2, 3]);
>```
>También puedes usar `updateExistingPivot()` para realizar cambios solo en el registro pivote:
>```php
>$user->contacts()->updateExistingPivot($contactId, [
>    'status' => 'inactive',
>]);
>```
>Y si desea reemplazar las relaciones actuales, separando efectivamente todas las relaciones anteriores y adjuntando otras nuevas, puede pasar una matriz a `sync()`:
>```php
>$user->contacts()->sync([1, 2, 3]);
>$user->contacts()->sync([
>    1 => ['status' => 'donor'],
>    2,
>    3,
>]);
>```

### Polimórfico

Recuerde, nuestra relación polimórfica es donde tenemos múltiples clases Eloquent correspondientes a la misma relación. Vamos a utilizar `Starts` (como favoritos) ahora. Un usuario puede marcar con una estrella tanto `Contacts` como `Events`, y de ahí proviene el nombre _polimórfico_: hay una única interfaz para objetos de múltiples tipos.

Entonces, necesitaremos tres tablas (`stars`, `contacts`, `events`) y tres modelos (`Star`, `Contact` y `Event`). En realidad, necesitarás cuatro de cada una porque también necesitaremos `users` y `User`, pero llegaremos a eso en un segundo. Las tablas `contacts` y `events` estarán como normalmente están, y la tabla `stars` contendrá los campos `id`, `starrable_id` y `starrable_type`. Para cada `Star`, definiremos qué "tipo" (por ejemplo, `Contact` o `Event`) y qué ID de ese tipo (por ejemplo, `1`) es.

Vamos a crear nuestros modelos, como se ve en el ejemplo siguiente.

_Creación de modelos para un sistema estelar polimórfico_
```php
class Star extends Model
{
    public function starrable()
    {
        return $this->morphTo();
    }
}

class Contact extends Model
{
    public function stars()
    {
        return $this->morphMany(Star::class, 'starrable');
    }
}

class Event extends Model
{
    public function stars()
    {
        return $this->morphMany(Star::class, 'starrable');
    }
}
```

Entonces, ¿cómo creamos un `Star`?

```php
$contact = Contact::first();
$contact->stars()->create();
```

Es así de fácil. El `Contact` ahora está marcado con una estrella.

Para encontrar todas las `Stars` en un `Contact` dado, llamamos al método `stars()` como en el ejemplo siguiente.

_Recuperación de las instancias de una relación polimórfica_
```php
$contact = Contact::first();

$contact->stars->each(function ($star) {
    // Do stuff
});
```

Si tenemos una instancia de `Star`, podemos obtener su _target_ llamando al método que usamos para definir su relación `morphTo`, que en este contexto es `starrable()`. Observa el ejemplo siguiente.

_Recuperar el target de una instancia polimórfica_
```php
$stars = Star::all();

$stars->each(function ($star) {
    var_dump($star->starrable); // An instance of Contact or Event
});
```

Por último, puede que te preguntes: "¿Qué pasa si quiero saber quién marcó con una estrella este contacto?". Es una gran pregunta. Es tan simple como agregar `user_id` a tu tabla `stars` y luego configurar que un `User` _tiene muchas_ `Stars` y una `Star` _pertenece_ a un `User` — una relación de uno a muchos (ejemplo siguiente). La tabla `stars` se convierte casi en una tabla pivote entre tu `User` y tus `Contacts` y `Events`.

_Extender un sistema polimórfico para diferenciar por usuario_
```php
class Star extends Model
{
    public function starrable()
    {
        return $this->morphsTo;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

class User extends Model
{
    public function stars()
    {
        return $this->hasMany(Star::class);
    }
}
```

¡Eso es todo! Ahora puedes ejecutar `$star->user` o `$user->stars` para buscar una lista de `Stars` de un `User` o para buscar el `User` que tiene la estrella en un `Star`. Además, cuando creas una nueva `Star`, ahora querrás pasar el `User`:

```php
$user = User::first();
$event = Event::first();
$event->stars()->create(['user_id' => $user->id]);
```

### Polimórfico de muchos-a-muchos

El más complejo y menos común de los tipos de relación, las relaciones polimórficas de muchos-a-muchos, son como relaciones polimórficas, excepto que en lugar de ser de uno a muchos, son de muchos a muchos.

El ejemplo más común de este tipo de relación es la etiqueta, así que lo dejaré a segura y lo usaré como nuestro ejemplo. Imaginemos que desea poder etiquetar `Contacts` y `Events`. La singularidad del polimorfismo de muchos-a-muchos es que es de muchos a muchos: cada etiqueta se puede aplicar a varios elementos y cada elemento etiquetado puede tener varias etiquetas. Y para agregar a eso, es polimórfico: las etiquetas se pueden relacionar con elementos de varios tipos diferentes. Para la base de datos, comenzaremos con la estructura normal de la relación polimórfica, pero también agregaremos una tabla pivote.

Esto significa que necesitaremos una tabla `contacts`, una tabla `events` y una tabla `tags`, todas con la forma normal, con un ID y las propiedades que desees, _y_ una nueva tabla `taggables`, que tendrá los campos `tag_id`, `taggable_id` y `taggable_type`. Cada entrada en la tabla `taggables` relacionará una etiqueta con uno de los tipos de contenido etiquetables.

Ahora definamos esta relación en nuestros modelos, como se ve en el ejemplo siguiente.

_Definición de una relación polimórfica de muchos-a-muchos_
```php
class Contact extends Model
{
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
```
```php
class Event extends Model
{
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
```
```php
class Tag extends Model
{
    public function contacts()
    {
        return $this->morphedByMany(Contact::class, 'taggable');
    }

    public function events()
    {
        return $this->morphedByMany(Event::class, 'taggable');
    }
}
```

Aquí cómo crear su primera etiqueta:

```php
$tag = Tag::firstOrCreate(['name' => 'likes-cheese']);
$contact = Contact::first();
$contact->tags()->attach($tag->id);
```

Obtenemos los resultados de esta relación de forma normal, como se ve en el ejemplo siguiente.

_Acceder a los elementos relacionados desde ambos lados de una relación polimórfica de muchos-a-muchos_
```php
$contact = Contact::first();

$contact->tags->each(function ($tag) {
// Do stuff
});

$tag = Tag::first();

$tag->contacts->each(function ($contact) {
// Do stuff
});
```

### Registros secundarios que actualizan marcas de tiempo de registros principales

Recuerde que, de manera predeterminada, todos los modelos de Eloquent tendrán las marcas de tiempo `created_at` y `updated_at`. Eloquent establecerá la marca de tiempo `updated_at` automáticamente cada vez que realice cambios en un registro.

Cuando un elemento relacionado tiene una relación de tipo `belongsTo` o `belongsToMany` con otro elemento, puede resultar útil marcar el otro elemento como actualizado cada vez que se actualice el elemento relacionado. Por ejemplo, si se actualiza un `PhoneNumber`, tal vez el `Contact` al que está conectado también debería marcarse como actualizado.

Podemos lograr esto agregando el nombre del método para esa relación a una propiedad de matriz `$touches` en la clase secundaria, como en el ejemplo siguiente.

_Actualizar un registro principal cada vez que se actualiza el registro secundario_
```php
class PhoneNumber extends Model
{
    protected $touches = ['contact'];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
```

### Eager Loading

