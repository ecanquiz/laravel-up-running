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
