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

:::info Required Dependency Before Modifying Columns
If you are not using a database that natively supports renaming and dropping columns (the latest versions of the most common databases support these operations), before you can modify any columns, you’ll need to run composer require doctrine/dbal.
:::
