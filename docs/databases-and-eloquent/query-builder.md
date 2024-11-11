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

### Métodos condicionales

Hay dos métodos que le permiten aplicar condicionalmente sus “contenidos” (una clausura que les pasa) según el estado booleano de un valor que pasa:

- `when()`: Dado un primer parámetro verdadero, aplica la modificación de la consulta contenida en la clausura; dado un primer parámetro falso, no hace nada. Tenga en cuenta que el primer parámetro podría ser un valor booleano (por ejemplo, `$ignoreDrafts`, establecido en `true` o `false`), un valor opcional (`$status`, extraído de la entrada del usuario y con valor predeterminado `null`) o una clausura que devuelva cualquiera de los dos; lo que importa es que evalúe como verdadero o falso. Por ejemplo:

```php
$status = request('status'); // Defaults to null if not set

$posts = DB::table('posts')
    ->when($status, function ($query) use ($status) {
        return $query->where('status', $status);
    })
    ->get();
```

```php
// Or
$posts = DB::table('posts')
    ->when($ignoreDrafts, function ($query) {
        return $query->where('draft', false);
    })
    ->get();
```

También puedes pasar un tercer parámetro, otra clausura, que se aplicará solo si el primer parámetro es falso.

- `unless()`: la inversa exacta de `when()`. Si el primer parámetro es falso, se ejecutará la segunda clausura.


### Métodos de finalización/retorno

Estos métodos detienen la cadena de consultas y activan la ejecución de la consulta SQL. Sin uno de estos métodos al final de la cadena de consultas, su retorno siempre será solo una instancia del generador de consultas; encadene uno de estos métodos a un generador de consultas y obtendrá un resultado:

- `get()`: Obtiene todos los resultados de la consulta creada:
```php
$contacts = DB::table('contacts')->get();
$vipContacts = DB::table('contacts')->where('vip', true)->get();
```

- `first()`, `firstOrFail()`: Obtiene solo el primer resultado, como `get()`, pero con un `LIMIT 1` agregado:
```php
$newestContact = DB::table('contacts')
    ->orderBy('created_at', 'desc')
    ->first();
```
`first()` falla silenciosamente si no hay resultados, mientras que `firstOrFail()` lanzará una excepción.

Si pasa una matriz de nombres de columnas a cualquiera de los métodos, devolverá los datos solo de esas columnas en lugar de todas las columnas.

- `find(id)`, `findOrFail(id)`: Al igual que `first()`, pero se pasa un valor ID que corresponde a la clave principal a buscar. `find()` falla silenciosamente si no existe una fila con ese ID, mientras que `findOrFail()` lanza una excepción:
```php
$contactFive = DB::table('contacts')->find(5);
```

- `value()`: Extrae solo el valor de un único campo de la primera fila. Como `first()`, pero si solo quieres una única columna:
```php
$newestContactEmail = DB::table('contacts')
    ->orderBy('created_at', 'desc')
    ->value('email');
```

- `count()`: Devuelve un recuento entero de todos los resultados coincidentes:
```php
$countVips = DB::table('contacts')
    ->where('vip', true)
    ->count();
```

- `min()`, `max()`: Devuelve el valor mínimo o máximo de una columna particular:
```php
$highestCost = DB::table('orders')->max('amount');
```

- `sum()`, `avg()`: Devuelve la suma o el promedio de todos los valores en una columna particular:
```php
$averageCost = DB::table('orders')
   ->where('status', 'completed')
   ->avg('amount');
```

- `dd()`, `dump()`: Vuelca la consulta SQL subyacente y los enlaces y, si se usa `dd()`, finaliza el script.
```php
DB::table('users')->where('name', 'Wilbur Powery')->dd();

// "select * from `users` where `name` = ?"
// array:1 [ 0 => "Wilbur Powery"]
```

:::info Explicar el método
El método `explain()` devuelve una explicación de cómo SQL ejecutará la consulta. Puede usarlo junto con los métodos `dd()` o `dump()` para depurar su consulta:
```php
User::where('name', 'Wilbur Powery')->explain()->dd();

/*
array:1 [
    0 => {#5111
        +"id": 1
        +"select_type": "SIMPLE"
        +"table": "users"
        +"type": "ALL"
        +"possible_keys": null
        +"key": null
        +"key_len": null
        +"ref": null
        +"rows": "209"
        +"Extra": "Using where"
    }
]
*/
```
:::

### Escribir consultas sin procesar dentro de métodos del generador de consultas con `DB::raw`

Ya ha visto algunos métodos personalizados para declaraciones `raw` — por ejemplo, `select()` tiene una contraparte `selectRaw()` que le permite pasar una cadena para que el generador de consultas la coloque después de la declaración `WHERE`.

Sin embargo, también puedes pasar el resultado de una llamada `DB::raw()` a casi cualquier método en el generador de consultas para lograr el mismo resultado:
```php
$contacts = DB::table('contacts')
    ->select(DB::raw('*, (score * 100) AS integer_score'))
    ->get();
```

### Joins

A veces, definir uniones puede ser complicado y un framework solo puede hacer lo que puede para simplificarlas, pero el generador de consultas hace todo lo posible. Veamos un ejemplo:
```php
$users = DB::table('users')
    ->join('contacts', 'users.id', '=', 'contacts.user_id')
    ->select('users.*', 'contacts.name', 'contacts.status')
    ->get();
```

El método `join()` crea una unión interna. También puedes encadenar varias uniones una tras otra o usar `leftJoin()` para obtener una unión izquierda.

Finalmente, puedes crear uniones más complejas pasando una clausura al método `join()`:
```php
DB::table('users')
    ->join('contacts', function ($join) {
        $join
            ->on('users.id', '=', 'contacts.user_id')
            ->orOn('users.id', '=', 'contacts.proxy_user_id');
    })
    ->get();
```

### Unions

Puede unir dos consultas (unir sus resultados en un conjunto de resultados) creándolas primero y luego utilizando el método `union()` o `unionAll()`:
```php
$first = DB::table('contacts')
    ->whereNull('first_name');

$contacts = DB::table('contacts')
    ->whereNull('last_name')
    ->union($first)
    ->get();
```

### Inserts

El método `insert()` es bastante simple. Páselo como una matriz para insertar una sola fila o como una matriz de matrices para insertar varias filas y use `insertGetId()` en lugar de `insert()` para obtener el ID de la clave principal que se incrementa automáticamente como un valor de retorno:
```php
$id = DB::table('contacts')->insertGetId([
    'name' => 'Abe Thomas',
    'email' => 'athomas1987@gmail.com',
]);

DB::table('contacts')->insert([
    ['name' => 'Tamika Johnson', 'email' => 'tamikaj@gmail.com'],
    ['name' => 'Jim Patterson', 'email' => 'james.patterson@hotmail.com'],
]);
```

### Updates

Las actualizaciones también son sencillas. Cree su consulta de actualización y, en lugar de `get()` o `first()`, utilice `update()` y pásele una matriz de parámetros:
```php
DB::table('contacts')
    ->where('points', '>', 100)
    ->update(['status' => 'vip']);
```

También puede incrementar y decrementar rápidamente columnas utilizando los métodos `increment()` y `decrement()`. El primer parámetro de cada uno es el nombre de la columna y el segundo parámetro (opcional) es el número por el que se incrementará o decrementará:
```php
DB::table('contacts')->increment('tokens', 5);
DB::table('contacts')->decrement('tokens');
```

### Deletes

Las eliminaciones son aún más sencillas. Cree su consulta y luego finalícela con `delete()`:
```php
DB::table('users')
    ->where('last_login', '<', now()->subYear())
    ->delete();
```

También puede truncar la tabla, lo que elimina todas las filas y también restablece el ID de incremento automático:
```php
DB::table('contacts')->truncate();
```

### Operaciones JSON

Si tiene columnas JSON, puede actualizar o seleccionar filas según aspectos de la estructura JSON utilizando la sintaxis de flecha para recorrer los elementos secundarios:
```php
// Select all records where the "isAdmin" property of the "options"
// JSON column is set to true
DB::table('users')->where('options->isAdmin', true)->get();

// Update all records, setting the "verified" property
// of the "options" JSON column to true
DB::table('users')->update(['options->isVerified', true]);
```

## Transacciones

Las _transacciones de base de datos_ son herramientas que permiten finalizar una serie de consultas de base de datos que se realizarán en un lote, y que se pueden revertir, deshaciendo así toda la serie de consultas. Las transacciones se utilizan a menudo para garantizar que se realicen _todas_ o ninguna, pero no algunas, de una serie de consultas relacionadas — si una falla, el ORM revertirá toda la serie de consultas.

Con la función de transacciones del generador de consultas de Laravel, si se lanza alguna excepción en cualquier momento durante el cierre de la transacción, se revertirán todas las consultas de la transacción. Si la clausura de la transacción finaliza correctamente, se confirmarán todas las consultas y no se revertirán.

Echemos un vistazo a la transacción de muestra en el ejemplo siguiente.

_Una transacción de base de datos simple_
```php
DB::transaction(function () use ($userId, $numVotes) {
    // Possibly failing DB query
    DB::table('users')
        ->where('id', $userId)
        ->update(['votes' => $numVotes]);

    // Caching query that we don't want to run if the above query fails
    DB::table('votes')
        ->where('user_id', $userId)
        ->delete();
});
```

En este ejemplo, podemos suponer que teníamos algún proceso previo que resumía la cantidad de votos de la tabla `votes` para un usuario determinado. Queremos almacenar en caché esa cantidad en la tabla `users` y luego borrar esos votos de la tabla `votes`. Pero, por supuesto, no queremos borrar los votos hasta que la actualización de la tabla `users` se haya ejecutado correctamente. Y no queremos mantener la cantidad actualizada de votos en la tabla `users` si falla la eliminación de la tabla `votes`.

Si algo sale mal con una de las consultas, la otra no se aplicará. Esa es la magia de las transacciones de bases de datos.

Tenga en cuenta que también puede iniciar y finalizar transacciones manualmente — y esto se aplica tanto a las consultas del generador de consultas como a las consultas de Eloquent. Comience con `DB::beginTransaction()`, finalice con `DB::commit()` y cancele con `DB::rollBack()`:

```php
DB::beginTransaction();

// Take database actions

if ($badThingsHappened) {
    DB::rollBack();
}

// Take other database actions
DB::commit();
```








