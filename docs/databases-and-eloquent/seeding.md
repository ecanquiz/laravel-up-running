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

## Model Factories