# Siembras

La propagación con Laravel es tan sencilla que se ha adoptado ampliamente como parte de los flujos de trabajo de desarrollo normales de una forma que no había sucedido en los frameworks PHP anteriores. Hay una carpeta `database/seeders` que viene con una clase `DatabaseSeeder`, que tiene un método `run()` que se llama cuando se llama al sembrador.

Hay dos formas principales de ejecutar las sembradoras: junto con una migración o por separado.

Para ejecutar un sembrador junto con una migración, simplemente agregue `-- seed` a cualquier llamada de migración:

```sh
php artisan migrate --seed
php artisan migrate:refresh --seed
```

Y para ejecutarlo de forma independiente:

```sh
php artisan db:seed
php artisan db:seed VotesTableSeeder
```

Esto llamará al método `run()` de `DatabaseSeeder` de manera predeterminada, o a la clase seeder especificada cuando pasa un nombre de clase.

## Creando una Sembradora

Para crear un sembrador, utilice el comando Artisan `make:seeder`:

```sh
php artisan make:seeder ContactsTableSeeder
```

Ahora verás que aparece una clase `ContactsTableSeeder` en el directorio `database/seeders`. Antes de editarla, agreguémosla a la clase `DatabaseSeeder`, como se muestra en el ejemplo siguiente, para que se ejecute cuando ejecutemos nuestros sembradores.

_Cómo llamar a un sembrador personalizado desde `DatabaseSeeder.php`_
```php
// database/seeders/DatabaseSeeder.php
...
public function run(): void
{
    $this->call(ContactsTableSeeder::class);
}
```

Ahora editemos el sembrador en sí. Lo más sencillo que podemos hacer es insertar manualmente un registro utilizando la fachada `DB`, como se ilustra en el ejemplo siguiente.

_Inserción de registros de base de datos en un sembrador personalizado_
```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ContactsTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('contacts')->insert([
            'name' => 'Lupita Smith',
             'email' => 'lupita@gmail.com',
        ]);
    }
}
```

Esto nos dará un solo registro, lo cual es un buen comienzo. Pero para semillas verdaderamente funcionales, probablemente querrás recorrer algún tipo de generador aleatorio y ejecutar este `insert()` muchas veces, ¿cierto? Laravel tiene una función para eso.

## Fábricas de Modelos

Las fábricas de modelos definen uno (o más) patrones para crear entradas falsas para las tablas de la base de datos. De manera predeterminada, cada fábrica recibe el nombre de una clase de Eloquent.

En teoría, puede nombrar estas fábricas como desee, pero nombrar la fábrica con el nombre de su clase de Eloquent es el enfoque más idiomático. Si sigue una convención diferente para nombrar sus fábricas, puede establecer el nombre de la clase de fábrica en el modelo relacionado.

### Creando una Fábrica de Modelos

Las fábricas de modelos se encuentran en `database/factories`. Cada fábrica se define en su propia clase, con un método de definición. En este método se definen los atributos y sus valores que se utilizarán al crear un modelo con la fábrica.

Para generar una nueva clase de fábrica, use el comando `make:factory` de Artisan; nuevamente, lo más común es nombrar las clases de fábrica según los modelos Eloquent de los que se supone que deben generar instancias:

```sh
php artisan make:factory ContactFactory
```

Esto generará un nuevo archivo dentro del directorio `database/factories` llamado `ContactFactory.php`. La fábrica más simple que podríamos definir para un contacto podría verse como la del ejemplo siguiente:

_La definición de fábrica más simple posible_
```php

<?php

namespace Database\Factories;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => 'Lupita Smith',
            'email' => 'lupita@gmail.com',
        ];
    }
}
```

Ahora debe utilizar el rasgo `Illuminate\Database\Eloquent\Factories\HasFactory` en su modelo.

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;
}
```

El rasgo `HasFactory` proporciona un método estático `factory()`, que utiliza las convenciones de Laravel para determinar la fábrica adecuada para el modelo. Buscará una fábrica en el espacio de nombres `Database\Factories` que tenga un nombre de clase que coincida con el nombre del modelo y tenga como sufijo `Factory`. Si no sigue estas convenciones, puede anular el método `newFactory()` en su modelo para especificar la clase de fábrica que se debe utilizar:

```php
// app/Models/Contact.php
...
 /* Create a new factory instance for the model.
 *
 * @return \Illuminate\Database\Eloquent\Factories\Factory
 */
protected static function newFactory()
{
    return \Database\Factories\Base\ContactFactory::new();
}
```

Ahora podemos llamar al método estático `factory()` en el modelo, para crear una instancia de `Contact` en nuestra siembra y prueba:

```php
// Create one
$contact = Contact::factory()->create();

// Create many
Contact::factory()->count(20)->create();
```

Sin embargo, si usáramos esa fábrica para crear 20 contactos, los 20 tendrían la misma información, lo que sería menos útil.

Obtendremos aún más beneficios de las fábricas de modelos cuando aprovechemos [Faker](https://github.com/FakerPHP/Faker), que está disponible globalmente en Laravel a través del asistente `fake()`; Faker facilita la aleatorización de la creación de datos falsos estructurados. El ejemplo anterior ahora se convierte en el ejemplo siguiente.

_Una fábrica sencilla, modificada para utilizar Faker_
```php
<?php

namespace Database\Factories;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->email(),
        ];
    }
}
```

Ahora, cada vez que creamos un contacto falso utilizando esta fábrica de modelos, todas nuestras propiedades se generarán aleatoriamente.

Las fábricas de modelos deben, como mínimo, devolver los campos de base de datos necesarios para esta tabla.

:::info Garantizar la Unicidad de los Datos Generados Aleatoriamente
Si desea garantizar que los valores generados aleatoriamente de cualquier entrada dada sean únicos en comparación con los otros valores generados aleatoriamente durante ese proceso PHP, puede utilizar el método `unique()` de Faker:
```php
return ['email' => fake()->unique()->email()];
```
:::

### Utilizando una Fábrica Modelo

Existen dos contextos principales en los que utilizaremos fábricas de modelos: [pruebas](../testing/), y siembras, que abordaremos aquí. Escribamos una siembra utilizando una fábrica de modelos; observemos el ejemplo siguiente.

_Uso de fábricas de modelos_
```php
$post = Post::factory()->create([
    'title' => 'My greatest post ever',
]);

// Pro-level factory; but don't get overwhelmed!
User::factory()->count(20)->has(Address::factory()->count(2))->create()
```

Para crear un objeto, utilizamos el método `factory()` en el modelo. Luego podemos ejecutar uno de dos métodos en él: `make()` o `create()`.

Ambos métodos generan una instancia de este modelo especificado, utilizando la definición en la clase de fábrica. La diferencia es que `make()` crea la instancia pero no la guarda (aún) en la base de datos, mientras que `create()` la guarda en la base de datos al instante.

### Reemplazo de propiedades al llamar a una fábrica de modelos

Si pasa una matriz a `make()` o `create()`, puede remplazar claves específicas de la fábrica, como hicimos en el ejemplo anterior para establecer manualmente el título en la publicación.

### Generar más de una instancia con una fábrica de modelos.

Si llamas al método `count()` después del método `factory()`, puedes especificar que estás creando más de una instancia. En lugar de devolver una sola instancia, devolverá una colección de instancias. Esto significa que puedes tratar el resultado como una matriz, iterando sobre ellas o pasándolas a cualquier método que tome más de un objeto:

```php
$posts = Post::factory()->count(6);
```

También puedes, opcionalmente, definir una “secuencia” de cómo remplazar cada uno:

```php
$posts = Post::factory()
    ->count(6)
    ->state(new Sequence(
        ['is_published' => true],
        ['is_published' => false],
    ))
    ->create();
```

### Fábricas de modelos de nivel profesional

Ahora que hemos cubierto los usos y disposiciones más comunes de las fábricas modelo, profundicemos en algunas de las formas más complicadas en que podemos usarlas.

### Adjuntar relaciones al definir fábricas de modelos

A veces, es necesario crear un elemento relacionado junto con el elemento que se está creando. Puede llamar al método de fábrica en el modelo relacionado para obtener su ID, como se muestra en el ejemplo siguiente.

_Creación de un elemento relacionado en una fábrica_
```php
<?php

namespace Database\Factories;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactFactory extends Factory
{
    protected $model = Contact::class;

    public function definition(): array
    {
        return [
            'name' => 'Lupita Smith',
            'email' => 'lupita@gmail.com',
            'company_id' => \App\Models\Company::factory(),
        ];
    }
}
```

También puede pasar una clausura en el que se pasa un único parámetro, que contiene la forma de matriz del elemento generado hasta ese momento. Esto se puede utilizar de otras maneras, como se muestra en el ejemplo siguiente.

_Uso de valores desde otros parámetros en una fábrica_
```php
// ContactFactory.php
public function definition(): array
{
    return [
        'name' => 'Lupita Smith',
        'email' => 'lupita@gmail.com',
        'company_id' => Company::factory(),
        'company_size' => function (array $attributes) {
            // Uses the "company_id" property generated above
            return Company::find($attributes['company_id'])->size;
        },
    ];
}
```

### Adjuntar elementos relacionados al generar instancias de fábrica de modelos

Si bien ya hemos cubierto cómo definir una relación en una definición de fábrica, es mucho más común que definamos los elementos relacionados de nuestra instancia justo cuando la creamos.

Hay dos métodos principales que usaremos para esto: `has()` y `for()`. `has()` nos permite definir que la instancia que estamos creando “has” hijos u otros elementos en una relación de tipo “hasMany”, mientras que `for()` nos permite definir que la instancia que estamos creando “belongsTo” otro elemento. Veamos algunos ejemplos para tener una mejor idea de cómo funcionan.

En el ejemplo siguiente, supongamos que un `Contact` tiene muchas `Addresses`.

_Uso de `has()` al generar modelos relacionados_
```php
// Attach 3 addresses
Contact::factory()
    ->has(Address::factory()->count(3))
    ->create()
```
```php
// Accessing information about each user in the child factory
$contact = Contact::factory()
    ->has(
        Address::factory()
            ->count(3)
            ->state(function (array $attributes, User $user) {
                return ['label' => $user->name . ' address'];
            })
    )
    ->create();
```

Ahora imaginemos que estamos creando la instancia secundaria en lugar de la instancia principal. Generemos una dirección.

En este tipo de circunstancias, normalmente se puede asumir que la definición de fábrica del hijo se encargará de generar la instancia del padre. Entonces, ¿para qué sirve `for()`? Es más útil si desea definir algo específico sobre el padre, normalmente una o más de sus propiedades, o pasar una instancia de modelo específica. Eche un vistazo al ejemplo siguiente para ver cómo se usa más comúnmente.

_Uso de `for()` al generar modelos relacionados_
```php
// Specify details about the created parent
Address::factory()
    ->count(3)
    ->for(Contact::factory()->state([
        'name' => 'Imani Carette',
    ]))
    ->create();
```
```php
// Use an existing parent model (assuming we already have it as $contact)
Address::factory()
    ->count(3)
    ->for($contact)
    ->create();
```

### Defining and accessing multiple model factory states
