# Generador de Consultas

Ahora que está conectado y ha migrado y agregado las semillas a sus tablas, comencemos a usar las herramientas de base de datos. En el centro de cada pieza de la funcionalidad de base de datos de Laravel se encuentra el _generador de consultas_, una interfaz fluida para interactuar con varios tipos diferentes de bases de datos con una única API clara.


>## ¿Qué Es una Interfaz Fluida?
>Una _interfaz fluida_ es aquella que utiliza principalmente el encadenamiento de métodos para proporcionar una API más simple al usuario final. En lugar de esperar que todos los datos relevantes se pasen a un constructor o a una llamada de método, las cadenas de llamadas fluidas se pueden crear de forma gradual, con llamadas consecutivas. Considere esta comparación::
>```php
>// Non-fluent:
>$users = DB::select(['table' => 'users', 'where' => ['type' => 'donor']]);
>// Fluent:
>$users = DB::table('users')->where('type', 'donor')->get();
>```

La arquitectura de base de datos de Laravel puede conectarse a MySQL, PostgreSQL, SQLite y SQL Server a través de una única interfaz, con solo cambiar algunos ajustes de configuración.

Si alguna vez ha utilizado un framework PHP, probablemente haya utilizado una herramienta que le permite ejecutar consultas SQL _"raw"_ (crudo) con un escape básico para mayor seguridad. El generador de consultas es eso, con muchas capas de conveniencia y ayudantes encima. Entonces, comencemos con algunas llamadas simples.

## Uso Básico de la Fachada `DB`

Antes de comenzar a crear consultas complejas con encadenamiento de métodos fluido, veamos algunos ejemplos de comandos de creación de consultas. La fachada `DB` se utiliza tanto para el encadenamiento de consultas como para consultas crudas más simples, como se ilustra en el ejemplo siguiente.

_Ejemplo de uso de SQL crudo y generador de consultas_
```php
// Basic statement
DB::statement('drop table users');

// Raw select, and parameter binding
DB::select('select * from contacts where validated = ?', [true]);

// Select using the fluent builder
$users = DB::table('users')->get();

// Joins and other complex calls
DB::table('users')
    ->join('contacts', function ($join) {
        $join->on('users.id', '=', 'contacts.user_id')
            ->where('contacts.type', 'donor');
    })
    ->get();
```

## SQL Crudo

Como vio en el ejemplo anterior, es posible realizar cualquier llamada cruda a la base de datos utilizando la fachada `DB` y el método `statement()`: 

```php
DB::statement('SQL statement here');
```

Pero también hay métodos específicos para varias acciones comunes: `select()`, `insert()`, `update()` y `delete()`. Estas siguen siendo llamadas sin formato, pero hay diferencias. En primer lugar, el uso de `update()` y `delete()` devolverá el número de filas afectadas, mientras que `statement()` no lo hará; en segundo lugar, con estos métodos queda más claro para los futuros desarrolladores exactamente qué tipo de declaración estás haciendo.


### Selecciones crudas

El método específico de base de datos más simple es `select()`. Puede ejecutarlo sin parámetros adicionales:


```php
$users = DB::select('select * from users');
```

Esto devolverá una matriz de objetos `stdClass`.


### Vinculaciones de parámetros y vinculaciones con nombres

La arquitectura de base de datos de Laravel permite el uso de la vinculación de parámetros PDO (objeto de datos PHP, la capa de acceso a la base de datos nativa de PHP), que protege sus consultas de posibles ataques SQL. Pasar un parámetro a una declaración es tan simple como reemplazar el valor en su declaración con un `?`, y luego agregar el valor al segundo parámetro de su llamada:


```php
$usersOfType = DB::select(
    'select * from users where type = ?',
    [$type]
);
```

También puedes nombrar esos parámetros para mayor claridad:


```php
$usersOfType = DB::select(
    'select * from users where type = :type',
    ['type' => $userType]
);
```

### Inserciones crudas

Desde aquí, todos los comandos crudos tienen un aspecto muy similar. Las inserciones crudas tienen este aspecto:


```php
DB::insert(
    'insert into contacts (name, email) values (?, ?)',
    ['sally', 'sally@me.com']
);
```

### Actualizaciones crudas

Las actualizaciones se ven así:

```php
$countUpdated = DB::update(
    'update contacts set status = ? where id = ?',
    ['donor', $id]
);
```

### Eliminaciones crudas

Y las eliminaciones se ven así:

```php
$countDeleted = DB::delete(
    'delete from contacts where archived = ?',
    [true]
);
```

### Encadenamiento con el Generador de Consultas

Hasta ahora, no hemos utilizado el generador de consultas en sí. Solo hemos utilizado llamadas de método simples en la fachada DB. Vamos a crear algunas consultas.

El generador de consultas permite encadenar métodos para, como ya habrás adivinado, _generar una consulta_. Al final de tu cadena, usarás algún método (probablemente `get()`) para
activar la ejecución real de la consulta que acabas de crear.

Veamos un ejemplo rápido:
```php
$usersOfType = DB::table('users')
    ->where('type', $type)
    ->get();
```

Aquí, creamos nuestra consulta (tabla `users`, tipo `$type`) y luego ejecutamos la consulta y obtuvimos nuestro resultado. Tenga en cuenta que, a diferencia de las llamadas anteriores, esto devolverá una _colección_ de objetos `stdClass` en lugar de una matriz.

>### Colecciones `Illuminate`

>La fachada DB, como Eloquent, devuelve una colección para cualquier método encadenado que devuelva (o pueda devolver) múltiples filas y una matriz para cualquier método no encadenado que devuelva (o pueda devolver) múltiples filas. La fachada DB devuelve una instancia de `Illuminate\Support\Collection` y Eloquent devuelve una instancia de `Illuminate\Database\Eloquent\Collection`, que extiende `Illuminate\Support\Collection` con algunos métodos específicos de Eloquent.

>Una colección es como una matriz PHP con superpoderes que te permite ejecutar `map()`, `filter()`, `reduce()`, `each()` y mucho más en tus datos. Puedes aprender más sobre colecciones en [Ayudantes y Collecciones](../helpers-and-collections/helpers.html).

Veamos qué métodos permite encadenar el generador de consultas. Los métodos se pueden dividir en lo que llamaré métodos de restricción, métodos de modificación, métodos condicionales y métodos de finalización/retorno.

#### Constraining methods