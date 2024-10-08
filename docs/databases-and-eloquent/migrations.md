# Migraciones

Los frameworks modernos como Laravel facilitan la definición de la estructura de la base de datos con migraciones basadas en código. Cada nueva tabla, columna, índice y clave se puede definir en código, y cualquier nuevo entorno se puede trasladar de una base de datos simple al esquema perfecto de la aplicación en segundos.

## Definición de migraciones

Una migración es un archivo único que define dos cosas: las modificaciones deseadas al ejecutar esta migración _**up**_ y, opcionalmente, las modificaciones deseadas al ejecutar esta migración _**down**_.

>### "Up" y "Down" en las Migraciones
>
>Las migraciones siempre se ejecutan en orden por fecha. Cada archivo de migración se llama de la siguiente manera: `2018_10_12_000000_create_users_table.php`. Cuando se migra un nuevo sistema, el sistema toma cada migración, comenzando en la fecha más temprana, y ejecuta su método `up()` — En este punto, lo estás migrando "hacia arriba". Pero el sistema de migración también te permite "revertir" tu conjunto de migraciones más reciente. Tomará cada una de ellas y ejecutará su método `down()`, que debería deshacer los cambios que haya realizado la migración hacia arriba.
>
>Entonces, el método `up()` de una migración debería “hacer” su migración, y el método `down()` debería “deshacerla”.

El ejemplo siguiente muestra cómo se ve la migración “create users table” predeterminada que viene con Laravel.

_Migración predeterminada de "create users table" de Laravel_
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
```

:::info Verificación de correo electrónico
La columna `email_verified_at` almacena una marca de tiempo que indica cuándo el usuario verificó su dirección de correo electrónico
:::

Como puede ver, tenemos un método `up()` y un método `down()`. `up()` le dice a la migración que cree una nueva tabla llamada `users` con algunos campos, y `down()` le dice que elimine la tabla `users`.

### Creando una migración

Como verás en [Artisan y Tinker](../artisan-and-tinker/an-introduction-to-artisan.html#artisan-y-tinker), Laravel proporciona una serie de herramientas de línea de comandos que puedes usar para interactuar con tu aplicación y generar archivos repetitivos. Uno de estos comandos te permite crear un archivo de migración. Puedes ejecutarlo usando `php artisan make:migration`, y tiene un solo parámetro, que es el nombre de la migración. Por ejemplo, para crear la tabla que acabamos de cubrir, ejecutarías `php artisan make:migration create_users_table`.

Hay dos indicadores que puedes pasar opcionalmente a este comando. `--create=table_name` rellena previamente la migración con código diseñado para crear una tabla llamada `table_name`, y `--table=table_name` simplemente rellena previamente la migración para modificaciones a una tabla existente.

```sh
php artisan make:migration create_users_table
php artisan make:migration add_votes_to_users_table --table=users
php artisan make:migration create_users_table --create=users
```

### Creando tablas

Ya vimos en la migración predeterminada de `create_users_table` que nuestras migraciones dependen de la fachada `Schema` y sus métodos. Todo lo que podamos hacer en estas migraciones dependerá de los métodos de `Schema`.

Para crear una nueva tabla en una migración, utilice el método `create()` — el primer parámetro es el nombre de la tabla y el segundo es una clausura que define sus columnas:


```php
Schema::create('users', function (Blueprint $table) {
    // Create columns here
});
```

### Creando columnas

Para crear nuevas columnas en una tabla, ya sea en una llamada de creación de tabla o en una llamada de modificación de tabla, use la instancia de `Blueprint` que se pasa a su clausura:

```php
Schema::create('users', function (Blueprint $table) {
     $table->string('name');
});
```

Veamos los distintos métodos disponibles en las instancias de `Blueprint` para crear columnas. Describiré cómo funcionan en MySQL, pero si estás usando otra base de datos, Laravel simplemente usará el equivalente más cercano.

Los siguientes son los métodos de campo simples de `Blueprint`:

- **`id()`**: Un alias para `$table->bigIncrements('id')`
- **`integer(colName)`**, **`tinyInteger(colName)`**, **`smallInteger(colName)`**, **`mediumInteger(colName)`**, **`bigInteger(colName)`**, **`unsignedTinyInteger(colName)`**, **`unsignedSmallInteger(colName)`**, **`unsignedMediumInteger(colName)`**, **`unsignedBigInteger(colName)`**: Agrega una columna de tipo `INTEGER`, o una de sus muchas variaciones
- **`string(colName, length)`**: Agrega una columna de tipo `VARCHAR` con una longitud opcional
- **`binary(colName)`**: Agrega una columna de tipo `BLOB`
- **`boolean(colName)`**: Agrega una columna de tipo `BOOLEAN` (una `TINYINT(1)` en MySQL)
- **`char(colName, length)`**: Agrega una columna `CHAR` con una longitud opcional
- **`date(colName)`**, **`datetime(colName)`**, **`dateTimeTz(colName)`**: Agrega una columna `DATE` o `DATETIME`; si se necesita conocer la zona horaria, utilice el método de fecha `TimeTz()` para crear una columna `DATETIME` con zona horaria
- **`decimal(colName, precision, scale)`**, **`unsignedDecimal(colName, precision, scale)`**: Agrega una columna `DECIMAL`, con precisión y escala — por ejemplo, `decimal('amount', 5, 2)` especifica una precisión de `5` y una escala de `2`; para una columna sin signo, use el método `unsignedDecimal`
- **`double(colName, total digits, digits after decimal)`**: Agrega una columna `DOUBLE` — por ejemplo, `double('tolerance', 12, 8)` especifica `12` dígitos de longitud, con `8` de esos dígitos a la derecha del decimal, como en `7204.05691739`
- **`enum(colName, [choiceOne, choiceTwo])`**: Agrega una columna `ENUM`, con las opciones proporcionadas
- **`float(colName, precision, scale)`**: Agrega una columna `FLOAT` (igual que `double` en MySQL)
- **`foreignId(colName), foreignUuid(colName)`**: Agrega una columna `UNSIGNED BIGINT` o `UUID`, con las opciones proporcionadas
- **`foreignIdFor(colName)`**: Agrega una columna `UNSIGNED BIG INT` con el nombre `colName`
- **`geometry(colName)`**, **`geometryCollection(colName)`**: Agrega una columna `GEOMETRY` o `GEOMETRYCOLLECTION`
- **`ipAddress(colName)`**: Agrega una columna VARCHAR
- **`json(colName)`**, **`jsonb(colName)`**: Agrega una columna `JSON` o `JSONB`
- **`lineString(colName)`**, **`multiLineString(colName)`**: Agrega una columna `LINESTRING` o `MULTILINESTRING` con el `colName` indicado
- **`text(colName)`**, **`tinyText(colName)`**, **`mediumText(colName)`**, **`longText(colName)`**: Agrega una columna de `TEXT` (o sus distintos tamaños)
- **`macAddress(colName)`**: Agrega una columna `MACADDRESS` en las bases de datos que la admiten (como PostgreSQL); en otros sistemas de bases de datos, crea una cadena equivalente
- **`multiPoint(colName)`**, **`multiPolygon(colName)`**, **`polygon(colName)`**, **`point(colName)`**: Agrega columnas de los tipos `MULTIPOINT`, `MULTIPOLYGON`, `POLYGON` y `POINT`, respectivamente
- **`set(colName, membersArray)`**: Crea una columna `SET` con el nombre `colName` y `membersArray` como miembros
- **`time(colName, precision)`**, **`timeTz(colName, precision)`**: Agrega una columna `TIME` con el nombre `colName`; para conocer la zona horaria, utilice el método `timeTz()`
- **`timestamp(colName, precision)`**, **`timestampTz(colName, precision)`**: Agrega una columna `TIMESTAMP`; para conocer la zona horaria, utilice el método `timestampTz()`
- **`uuid(colName)`**: Agrega una columna `UUID (CHAR(36)` en MySQL)
- **`year()`**: Agrega una columna de `YEAR`

Y estos son los métodos especiales (unidos) de `Blueprint`:

- **`increments(colName)`**, **`tinyIncrements(colName)`**, **`smallIncrements(colName)`**, **`mediumIncrements(colName)`**, **`bigIncrements(colName)`**: Agrega un `ID` de clave principal `INTEGER` incremental sin signo, o una de sus muchas variaciones
- **`timestamps(precision)`**, **`nullableTimestamps(precision)`**, **`timestampsTz(precision)`**: Agrega columnas de marca de tiempo `created_at` y `updated_at` con precisión opcional, valores nulos y variaciones que reconocen la zona horaria
- **`rememberToken()`**: Agrega una columna `remember_token (VARCHAR(100))` para los tokens _"remember me"_ del usuario
- **`softDeletes(colName, precision)`**, **`softDeletesTz(colName, precision)`**: Agrega una marca de tiempo `delete_at` para usar con _soft deletes_ con precisión opcional y variaciones que tienen en cuenta la zona horaria
- **`morphs(colName)`**, **`nullableMorphs(colName)`**, **`uuidMorphs(relationshipName)`**, **`nullableUuidMorphs(relationshipName)`**: Para un `colName` proporcionado, agrega un entero `colName_id` y una cadena `colName_type` (por ejemplo, `morphs(tag)` agrega un entero `tag_id` y una cadena `tag_type`); para usar en relaciones polimórficas, usando `ID` o `UUID`, y se puede configurar como _nullable_ según el nombre del método

### Construir propiedades extra con fluidez

La mayoría de las propiedades de una definición de campo — por ejemplo, su longitud — se establecen como segundo parámetro del método de creación de campo, como vimos en la sección anterior. Pero hay algunas otras propiedades que estableceremos encadenando más llamadas de método después de la creación de la columna. Por ejemplo, este campo `email` es nulo y se colocará (en MySQL) justo después del campo `last_name`:

```php
Schema::table('users', function (Blueprint $table) {
    $table->string('email')->nullable()->after('last_name');
});
```

Los siguientes métodos son algunos de los que se utilizan para establecer propiedades adicionales de un campo; consulte la [documentación de migraciones](https://laravel.com/docs/11.x/migrations#column-modifiers) para obtener una lista exhaustiva.

- `nullable()`: Permite insertar valores `NULL` en esta columna
- `default('default content')`: Especifica el contenido predeterminado para esta columna si no se proporciona ningún valor
- `unsigned()`: Marca las columnas de números enteros como sin signo (no negativos ni positivos, sino simplemente un número entero)
- `first()` _(sólo MySQL)_: Coloca la columna primero en el orden de columnas
- `after(colName)` _(sólo MySQL)_: Coloca la columna después de otra columna en el orden de columnas
- `charset(charset)` _(solo MySQL)_: Establece el conjunto de caracteres para una columna
- `collation(collation)`: Establece la colación para una columna
- `invisible()` _(sólo MySQL)_: Hace que la columna sea invisible para las consultas `SELECT`
- `useCurrent()`: Se utiliza en columnas `TIMESTAMP` para usar `CURRENT_TIMESTAMP` como valor predeterminado
- `isGeometry()` _(sólo PostgreSQL)_: Establece un tipo de columna en `GEOMETRY` (el valor predeterminado es `GEOGRAPHY`)
- `unique()`: Agrega un índice `UNIQUE`
- `primary()`: agrega un índice de clave principal
- `index()`: Agrega un índice básico

Tenga en cuenta que `unique()`, `primary()` e `index()` también se pueden usar fuera del contexto de construcción de columnas fluidas, que cubriremos más adelante.

### Eliminar tablas

Si desea eliminar una tabla, utilice el método `dropIfExists()` en `Schema`, que toma un parámetro, el nombre de la tabla:

```php
Schema::dropIfExists('contacts');
```

### Modificar columnas

Para modificar una columna, simplemente escriba el código que escribiría para crear la columna como si fuera nueva y luego agregue una llamada al método `change()` después de ella.

:::info Dependencia Requerida Antes de Modificar Columnas
Si no está utilizando una base de datos que admita de forma nativa el cambio de nombre y la eliminación de columnas (las últimas versiones de las bases de datos más comunes admiten estas operaciones), antes de poder modificar cualquier columna, deberá ejecutar `composer require doctrina/dbal`.
:::

Entonces, si tenemos una columna de cadena llamada `name` que tiene una longitud de `255` y queremos cambiar su longitud a `100`, así es como lo escribiríamos:

```php
Schema::table('users', function (Blueprint $table) {
    $table->string('name', 100)->change();
});
```

Lo mismo sucede si queremos ajustar alguna de sus propiedades que no estén definidas en el nombre del método. Para hacer que un campo sea anulable, hacemos esto:


```php
Schema::table('contacts', function (Blueprint $table) {
    $table->string('deleted_at')->nullable()->change();
});
```

Así es como cambiamos el nombre de una columna:

```php
Schema::table('contacts', function (Blueprint $table)
{
    $table->renameColumn('promoted', 'is_promoted');
});
```

Y así es como eliminamos una columna:

```php
Schema::table('contacts', function (Blueprint $table)
{
    $table->dropColumn('votes');
});
```

>### Modificar Varias Columnas a la Vez en SQLite
>
>Si intenta eliminar o modificar varias columnas dentro de una única clausura de migración y está utilizando SQLite, se encontrará con errores.
>
>En la [Pruebas](../testing/) recomiendo que utilices SQLite para tu base de datos de prueba, por lo que incluso si estás usando una base de datos más tradicional, es posible que quieras considerar esto como una limitación para fines de prueba.
>
>Sin embargo, no es necesario crear una nueva migración para cada una de ellas. En su lugar, solo es necesario crear varias llamadas a `Schema::table()` dentro del método `up()` de la migración:
>```php
>public function up(): void
>{
>    Schema::table('contacts', function (Blueprint $table)
>    {
>        $table->dropColumn('is_promoted');
>    );
>
>    Schema::table('contacts', function (Blueprint $table)
>    {
>        $table->dropColumn('alternate_email');
>    });
>}
>```

### Aplastar migraciones

Si tienes demasiadas migraciones como para pensar en ellas, puedes fusionarlas todas en un único archivo SQL que Laravel ejecutará antes de ejecutar cualquier migración futura. Esto se llama "aplastar" tus migraciones.

```sh
# Squash the schema but keep your existing migrations
php artisan schema:dump

# Dump the current database schema and delete all existing migrations
php artisan schema:dump --prune
```

Laravel solo ejecuta estos volcados si detecta que no se han ejecutado migraciones hasta el momento. Eso significa que puedes comprimir tus migraciones y no dañará tus aplicaciones ya implementadas.

:::info
Si usa volcados de esquema, no puede usar SQLite en memoria; solo funciona en MySQL, PostgreSQL y SQLite de archivos locales.
:::

### Índices y claves foráneas

Hemos explicado cómo crear, modificar y eliminar columnas. Pasemos ahora a indexarlas y relacionarlas.

Si no está familiarizado con los índices, sus bases de datos pueden sobrevivir si no los utiliza nunca, pero son bastante importantes para la optimización del rendimiento y para algunos controles de integridad de datos con respecto a las tablas relacionadas. Le recomiendo que lea sobre ellos, pero si es absolutamente necesario, puede omitir esta sección por ahora.

### Cómo agregar índices

Consulte el ejemplo siguiente para ver cómo agregar índices a su columna.

_Cómo agregar índices de columna en migraciones_
```php
// After columns are created...
$table->primary('primary_id'); // Primary key; unnecessary if used increments()
$table->primary(['first_name', 'last_name']); // Composite keys
$table->unique('email'); // Unique index
$table->unique('email', 'optional_custom_index_name'); // Unique index
$table->index('amount'); // Basic index
$table->index('amount', 'optional_custom_index_name'); // Basic index
```

Tenga en cuenta que el primer ejemplo, `primary()`, no es necesario si está utilizando los métodos `increments()` o `bigIncrements()` para crear su índice; esto agregará automáticamente un índice de clave principal para usted.


### Eliminando índices

Podemos eliminar índices como se muestra en el ejemplo siguiente.

_Eliminar índices de columnas en migraciones_
```php
$table->dropPrimary('contacts_id_primary');
$table->dropUnique('contacts_email_unique');
$table->dropIndex('optional_custom_index_name');

// If you pass an array of column names to dropIndex, it will
// guess the index names for you based on the generation rules
$table->dropIndex(['email', 'amount']);
```

### Agregar y eliminar claves foráneas

Para agregar una clave foránea que defina que una columna particular hace referencia a una columna de otra tabla, la sintaxis de Laravel es simple y clara:

```php
$table->foreign('user_id')->references('id')->on('users');
```

Aquí agregamos un índice `foreign` en la columna `user_id`, lo que muestra que hace referencia a la columna `id` en la tabla `users`. No podría ser más simple.

Si queremos especificar restricciones de clave foránea, también podemos hacerlo con `cascadeOnUpdate()`, `restrictOnUpdate()`, `cascadeOnDelete()`, `restrictOnDelete()` y `nullOnDelete()`. Por ejemplo:

```php
$table->foreign('user_id')
    ->references('id')
    ->on('users')
    ->cascadeOnDelete();
```

También hay un alias para crear restricciones de clave foránea. Usándolo, el ejemplo anterior se puede escribir así:

```php
$table->foreignId('user_id')->constrained()->cascadeOnDelete();
```

Para eliminar una clave foránea, podemos eliminarla haciendo referencia a su nombre de índice (que se genera automáticamente al combinar los nombres de las columnas y tablas a las que se hace referencia):

```php
$table->dropForeign('contacts_user_id_foreign');
```

o pasándole una matriz de los campos a los que hace referencia en la tabla local:

```php
$table->dropForeign(['user_id']);
```

## Ejecución de Migraciones

Una vez que haya definido sus migraciones, ¿cómo las ejecuta? Hay un comando de Artisan para eso:

```sh
php artisan migrate
```

Este comando ejecuta todas las migraciones “pendientes” (ejecutando el método `up()` en cada una). Laravel lleva un registro de las migraciones que has ejecutado y las que no. Cada vez que ejecutas este comando, comprueba si has ejecutado todas las migraciones disponibles y, si no lo has hecho, ejecutará las que queden.

Hay algunas opciones en este espacio de nombres con las que puedes trabajar. Primero, puedes ejecutar tus migraciones _y_ tus semillas (que abordaremos a continuación):

```sh
php artisan migrate --seed
```

También puede ejecutar cualquiera de los siguientes comandos:

- `migrate:install`: Crea la tabla de base de datos que realiza un seguimiento de las migraciones que ha ejecutado y las que no; esto se ejecuta automáticamente cuando ejecuta sus migraciones, por lo que básicamente puede ignorarlo.
- `migrate:reset`: Revierte cada migración de base de datos que haya ejecutado en esta instancia.
- `migrate:refresh`: Revierte todas las migraciones de bases de datos que haya ejecutado en esta instancia y, a continuación, ejecuta todas las migraciones disponibles. Es lo mismo que ejecutar `migrate:reset` seguido de `migrate`.
- `migrate:fresh`: Elimina todas las tablas y vuelve a ejecutar cada migración. Es lo mismo que `refresh`, pero no se ocupa de las migraciones _"down"_ — simplemente elimina las tablas y luego vuelve a ejecutar las migraciones _"up"_.
- `migrate:rollback`: Revierte _solo_ las migraciones que se ejecutaron la última vez que ejecutó `migrate` o, con la opción agregada `--step=n`, revierte la cantidad de migraciones que especifique.
- `migrate:status`: Muestra una tabla que enumera cada migración, con una `Y` o `N` al lado de cada una indicando si ya se ejecutó o no en este entorno.

:::info Migración con Homestead/Vagrant
Si está ejecutando migraciones en su máquina local y su archivo `.env` apunta a una base de datos en un equipo Vagrant, sus migraciones fallarán. Deberá ingresar por `ssh` a su equipo Vagrant y luego ejecutar las migraciones desde allí. Lo mismo se aplica a las semillas y cualquier otro comando Artisan que afecte o lea desde la base de datos.
:::
