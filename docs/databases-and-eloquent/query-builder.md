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

## Encadenamiento con el Generador de Consultas

Hasta ahora, no hemos utilizado el generador de consultas en sí. Solo hemos utilizado llamadas de método simples en la fachada `DB`. Vamos a crear algunas consultas.

El generador de consultas permite encadenar métodos para, como ya habrás adivinado, _crear una consulta_. Al final de la cadena, utilizarás algún método — probablemente `get()`— para activar la ejecución real de la consulta que acabas de crear.

Veamos un ejemplo rápido:

```php
$usersOfType = DB::table('users')
    ->where('type', $type)
    ->get();
```

Aquí, creamos nuestra consulta (tabla `users`, tipo `$type`) y luego ejecutamos la consulta y obtuvimos nuestro resultado. Tenga en cuenta que, a diferencia de las llamadas anteriores, esto devolverá una _colección_ de objetos `stdClass` en lugar de una matriz.

>### Illuminate Collections

>La fachada `DB`, al igual que Eloquent, devuelve una colección para cualquier método encadenado que devuelva (o pueda devolver) varias filas y una matriz para cualquier método no encadenado que devuelva (o pueda devolver) varias filas. La fachada `DB` devuelve una instancia de `Illuminate\Support\Collection` y Eloquent devuelve una instancia de `Illuminate\Database\Eloquent\Collection`, que extiende `Illuminate\Support\Collection` con algunos métodos específicos de Eloquent.

>`Collection` es como una matriz PHP con superpoderes, que le permite ejecutar `map()`, `filter()`, `reduce()`, `each()` y mucho más en sus datos. Puede obtener más información sobre colecciones en la sección de [Ayudantes y Coleciones](../helpers-and-collections/helpers.html).

Veamos qué métodos permite encadenar el generador de consultas. Los métodos se pueden dividir en lo que llamaré métodos de restricción, métodos de modificación, métodos condicionales y métodos de finalización/retorno.

### Métodos de restricción

Estos métodos toman la consulta tal como es y la restringen para devolver un subconjunto más pequeño de datos posibles:

- `select()`: Le permite elegir qué columnas está seleccionando.
```php
$emails = DB::table('contacts')
    ->select('email', 'email2 as second_email')
    ->get();
// Or
$emails = DB::table('contacts')
    ->select('email')
    ->addSelect('email2 as second_email')
    ->get();
```

- `where()`: Le permite limitar el alcance de lo que se devuelve utilizando `WHERE`. De forma predeterminada, la firma del método `where()` toma tres parámetros: la columna, el operador de comparación y el valor:
```php
$newContacts = DB::table('contact')
    ->where('created_at', '>', now()->subDay())
    ->get();
```
Sin embargo, si su comparación es `=`, que es la comparación más común, puede omitir el segundo operador.
```php
$vipContacts = DB::table('contacts')->where('vip',true)->get();
```
Si desea combinar declaraciones `where()`, puede encadenarlas una tras otra o pasar una matriz de matrices.
```php
$newVips = DB::table('contacts')
    ->where('vip', true)
    ->where('created_at', '>', now()->subDay());
// Or
$newVips = DB::table('contacts')->where([
    ['vip', true],
    ['created_at', '>', now()->subDay()],
]);
```

- `orWhere()`: Crea declaraciones `OR WHERE` simples.
```php
$priorityContacts = DB::table('contacts')
    ->where('vip', true)
    ->orWhere('created_at', '>', now()->subDay())
    ->get();
```

Para crear una declaración `OR WHERE` más compleja con múltiples condiciones, pase a `orWhere()` una clausura.
```php
$contacts = DB::table('contacts')
    ->where('vip', true)
    ->orWhere(function ($query) {
        $query->where('created_at', '>', now()->subDay())
            ->where('trial', false);
    })
    ->get();
```

>### Posible Confusión con Múltiples Llamadas `where()` y `orWhere()`

>Si estás usando llamadas `orWhere()` junto con múltiples llamadas `where()`, debes tener mucho cuidado para asegurarte de que la consulta esté haciendo lo que crees que debe hacer. Esto no se debe a ningún fallo de Laravel, sino a que una consulta como la siguiente podría no hacer lo que esperas:
>```php
>$canEdit = DB::table('users')
>    ->where('admin', true)
>    ->orWhere('plan', 'premium')
>    ->where('is_plan_owner', true)
>    ->get();
>```
>```sql
>SELECT * FROM users
>    WHERE admin = 1
>    OR plan = 'premium'
>    AND is_plan_owner = 1;
>```
>Si desea escribir SQL que diga “si esto O (esto y esto)”, que es claramente la intención en el ejemplo anterior, deberá pasar una clausura a la llamada `orWhere()`:
>```php
>$canEdit = DB::table('users')
>    ->where('admin', true)
>    ->orWhere(function ($query) {
>        $query->where('plan', 'premium')
>        ->where('is_plan_owner', true);
>    })
>    ->get();
>```
>```sql
>SELECT * FROM users
>WHERE admin = 1
>OR (plan = 'premium' AND is_plan_owner = 1);
>```

- `whereBetween(colName, [low, high])`: Le permite limitar una consulta para devolver solo filas donde una columna está entre dos valores (incluidos los dos valores):
```php
$mediumDrinks = DB::table('drinks')
    ->whereBetween('size', [6, 12])
    ->get();
```
Lo mismo funciona para `whereNotBetween()`, pero seleccionará la inversa.

- `whereIn(colName, [1, 2, 3])`: Le permite limitar una consulta para devolver solo filas donde un valor de columna está en una lista de opciones proporcionada explícitamente:
```php
$closeBy = DB::table('contacts')
    ->whereIn('state', ['FL', 'GA', 'AL'])
    ->get();
```
Lo mismo funciona para `whereNotIn()`, pero seleccionará lo inverso.

- `whereNull(colName), whereNotNull(colName)`: Le permite seleccionar solo filas donde una columna determinada es `NULL` o es `NOT NULL`, respectivamente.

- `whereRaw()`: Le permite pasar una cadena cruda, sin escape, para agregarla después de la declaración `WHERE`:
```php
$goofs = DB::table('contacts')->whereRaw('id = 12345')->get();
```
:::info ¡Cuidado con la Inyección SQL!
No se escaparán las consultas SQL que se pasen a `whereRaw()`. Utilice este método con cuidado y con poca frecuencia; esta es una excelente oportunidad para que se produzcan ataques de inyección SQL en su aplicación.
:::

- `whereExists()`: Le permite seleccionar solo las filas que, cuando se pasan a una subconsulta proporcionada, devuelven al menos una fila. Imagine que solo desea obtener aquellos usuarios que hayan dejado al menos un comentario:
```php
$commenters = DB::table('users')
    ->whereExists(function ($query) {
        $query->select('id')
            ->from('comments')
            ->whereRaw('comments.user_id = users.id');
    })
    ->get();
```

- `distinct()`: Selecciona solo las filas en las que los datos seleccionados son únicos en comparación con las otras filas de los datos devueltos. Normalmente, esto se combina con `select()`, porque si se utiliza una clave principal, no habrá filas duplicadas:
```php
$lastNames = DB::table('contacts')->select('city')->distinct()->get();
```

### Métodos de modificación

Estos métodos cambian la forma en que se mostrarán los resultados de la consulta, en lugar de simplemente limitar sus resultados:

- `orderBy(colName, direction)`: Ordena los resultados. El segundo parámetro puede ser `asc` (el valor predeterminado, orden ascendente) o `desc` (orden descendente).
```php
$contacts = DB::table('contacts')
    ->orderBy('last_name', 'asc')
    ->get();
```

- `groupBy()`, `having()`, `havingRaw()`: Agrupa los resultados por una columna. Opcionalmente, `having()` y `havingRaw()` te permiten filtrar los resultados en función de las propiedades de los grupos. Por ejemplo, puedes buscar solo ciudades con al menos 30 habitantes.
```php
$populousCities = DB::table('contacts')
    ->groupBy('city')
    ->havingRaw('count(contact_id) > 30')
    ->get();
```

- `skip()`, `take()`: Se utilizan con mayor frecuencia para la paginación y permiten definir cuántas filas devolver y cuántas omitir antes de comenzar la devolución — como un número de página y un tamaño de página en un sistema de paginación.
```php
// returns rows 31-40
$page4 = DB::table('contacts')->skip(30)->take(10)->get();
```

- `latest(colName)`, `oldest(colName)`: Ordena por la columna pasada (o `created_at` si no se pasa ningún nombre de columna) en orden descendente (`latest()`) o ascendente (`oldest()`).

- `inRandomOrder()`: Ordena el resultado aleatoriamente.

### Conditional methods


