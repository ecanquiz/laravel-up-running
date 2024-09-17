# Bases de Datos y Eloquent

Laravel proporciona un conjunto de herramientas para interactuar con las bases de datos de su aplicación, la más notable de las cuales es Eloquent, el ORM ActiveRecord de Laravel.

Eloquent es una de las características más populares e influyentes de Laravel. Es un gran ejemplo de cómo Laravel se diferencia de la mayoría de los frameworks PHP; en un mundo de ORM DataMapper que son potentes pero complejos, Eloquent se destaca por su simplicidad. Hay una clase por tabla, que es responsable de recuperar, representar y conservar los datos en esa tabla.

Independientemente de si eliges utilizar Eloquent o no, obtendrás muchos beneficios de las otras herramientas de base de datos que ofrece Laravel. Por lo tanto, antes de profundizar en Eloquent, comenzaremos por cubrir los conceptos básicos de la funcionalidad de la base de datos de Laravel: migraciones, sembradores y el generador de consultas.

Luego, cubriremos Eloquent: definir sus modelos; insertar, actualizar y eliminar; personalizar sus respuestas con accesores, mutadores y conversión de atributos; y, finalmente, las relaciones. Hay mucho que hacer aquí y es fácil sentirse abrumado, pero si lo hacemos paso a paso, lo lograremos.

## Configuración

Antes de profundizar en cómo usar las herramientas de base de datos de Laravel, detengámonos un segundo y repasemos cómo configurar las credenciales y conexiones de su base de datos.

La configuración para el acceso a la base de datos se encuentra en `config/database.php` y `.env`. Como muchas otras áreas de configuración en Laravel, puedes definir múltiples "conexiones" y luego decidir cuál usará el código de manera predeterminada.

## Conexiones de Base de Datos

De forma predeterminada, hay una conexión para cada uno de los manejadores, como puede ver en el ejemplo siguiente.

_La lista de conexiones de base de datos predeterminada_
```php
'connections' => [
    'sqlite' => [
        'driver' => 'sqlite',
        'url' => env('DATABASE_URL'),
        'database' => env('DB_DATABASE', database_path('database.sqlite')),
        'prefix' => '',
        'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
    ],
    'mysql' => [
        'driver' => 'mysql',
        'url' => env('DATABASE_URL'),
        'host' => env('DB_HOST', '127.0.0.1'),
        'port' => env('DB_PORT', '3306'),
        'database' => env('DB_DATABASE', 'forge'),
        'username' => env('DB_USERNAME', 'forge'),
        'password' => env('DB_PASSWORD', ''),
        'unix_socket' => env('DB_SOCKET', ''),
        'charset' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'prefix' => '',
        'prefix_indexes' => true,
        'strict' => true,
        'engine' => null,
        'options' => extension_loaded('pdo_mysql') ? array_filter([
            PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
        ]) : [],
    ],
    'pgsql' => [
        'driver' => 'pgsql',
        'url' => env('DATABASE_URL'),
        'host' => env('DB_HOST', '127.0.0.1'),
        'port' => env('DB_PORT', '5432'),
        'database' => env('DB_DATABASE', 'forge'),
        'username' => env('DB_USERNAME', 'forge'),
        'password' => env('DB_PASSWORD', ''),
        'charset' => 'utf8',
        'prefix' => '',
        'prefix_indexes' => true,
        'search_path' => 'public',
        'sslmode' => 'prefer',
    ],
    'sqlsrv' => [
        'driver' => 'sqlsrv',
        'url' => env('DATABASE_URL'),
        'host' => env('DB_HOST', 'localhost'),
        'port' => env('DB_PORT', '1433'),
        'database' => env('DB_DATABASE', 'forge'),
        'username' => env('DB_USERNAME', 'forge'),
        'password' => env('DB_PASSWORD', ''),
        'charset' => 'utf8',
        'prefix' => '',
        'prefix_indexes' => true,
        // 'encrypt' => env('DB_ENCRYPT', 'yes'),
        // 'trust_server_certificate' => env('DB_TRUST_SERVER_CERTIFICATE', 'false'),
    ],
]
```

Nada le impide eliminar o modificar estas conexiones con nombre o crear las suyas propias. Puede crear nuevas conexiones con nombre y podrá configurar los manejadores (MySQL, PostgreSL, etc.) en ellas. Por lo tanto, aunque hay una conexión por manejador de forma predeterminada, eso no es una restricción; podría tener cinco conexiones diferentes, todas con el manejador `mysql`, si lo desea.

Cada conexión le permite definir las propiedades necesarias para conectarse y personalizar cada tipo de conexión.

Existen algunas razones para la idea de tener varios manejadores. Para empezar, la sección de “conexiones” que viene de fábrica es una plantilla sencilla que facilita el inicio de aplicaciones que utilizan cualquiera de los tipos de conexión de base de datos compatibles. En muchas aplicaciones, puedes elegir la conexión de base de datos que utilizarás, completar su información e incluso eliminar las demás si lo deseas. Normalmente, las dejo todas ahí, por si acaso las necesito en algún momento.

Pero también hay algunos casos en los que puede que necesites varias conexiones dentro de la misma aplicación. Por ejemplo, puedes usar diferentes conexiones de base de datos para dos tipos de datos diferentes, o puedes leer de una y escribir en otra. La compatibilidad con varias conexiones hace que esto sea posible.

## Configuraciones de URL

A menudo, los servicios como Heroku proporcionan una variable de entorno con una URL que contiene toda la información que necesitas para conectarte a la base de datos. Se verá así:

```php
mysql://root:password@127.0.0.1/forge?charset=UTF-8
```

No tienes que escribir código para analizar esta URL; en su lugar, pásala como la variable de entorno `DATABASE_URL` y Laravel la entenderá.

## Otra Base de Datos

La sección de configuración `config/database.php` tiene otras opciones de configuración. Puede configurar el acceso a Redis, personalizar el nombre de la tabla que se utiliza para las migraciones, determinar la conexión predeterminada y alternar si las llamadas que no son de Eloquent devuelven `stdClass` o instancias de matriz.

Con cualquier servicio en Laravel que permita conexiones desde múltiples fuentes — las sesiones pueden estar respaldadas por la base de datos o el almacenamiento de archivos, el caché puede usar Redis o Memcached, las bases de datos pueden usar MySQL o PostgreSQL —, puedes definir múltiples conexiones y también elegir que una conexión en particular sea la "predeterminada", lo que significa que se usará en cualquier momento en que no solicites explícitamente una conexión en particular. A continuación, se muestra cómo solicitar una conexión específica, si lo desea:

```php
$users = DB::connection('secondary')->select('select * from users');
```


