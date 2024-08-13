# Configuración

Las configuraciones principales de su aplicación Laravel — configuración de conexión de base de datos, configuración de cola y correo, etc. — se encuentran en archivos en la carpeta `config/`. Cada uno de estos archivos devuelve una matriz PHP y cada valor de la matriz es accesible mediante una clave de configuración que se compone del nombre del archivo y todas las claves descendientes, separadas por puntos (`.`).

Entonces, si creas un archivo en `config/services.php` que se ve así:


```php
// config/services.php
<?php
return [
    'sparkpost' => [
        'secret' => 'abcdefg',
    ],
];
```

Puede acceder a esa variable de configuración usando `config('services.sparkpost.secret')`.

Las variables de configuración que deberían ser distintas para cada entorno (y, por lo tanto, no estar asignadas al control de código fuente) se guardarán en los archivos `.env`. Supongamos que desea utilizar una clave API de Bugsnag diferente para cada entorno. Configuraría el archivo de configuración para que la extraiga de `.env`:


```php
// config/services.php
<?php
return [
    'bugsnag' => [
        'api_key' => env('BUGSNAG_API_KEY'),
    ],
];
```

Esta función auxiliar `env()` extrae un valor de su archivo `.env` con esa misma clave. Ahora, agregue esa clave a sus archivos `.env` (configuración para este entorno) y `.env.example` (plantilla para todos los entornos):


```sh
# In .env
BUGSNAG_API_KEY=oinfp9813410942

# In .env.example
BUGSNAG_API_KEY=
```

Su archivo `.env` ya contendrá algunas variables específicas del entorno que necesita el framework, como qué controlador de correo utilizará y cuáles son sus configuraciones básicas de base de datos.

:::info Uso de `env()` fuera de los archivos de configuración

Ciertas funciones de Laravel, incluidas algunas funciones de almacenamiento en caché y optimización, no están disponibles si utiliza llamadas `env()` en cualquier lugar fuera de los archivos de configuración.

La mejor manera de incorporar variables de entorno es configurar elementos de configuración para cualquier cosa que desee que sea específica del entorno. Haga que esos elementos de configuración lean las variables de entorno y luego hagan referencia a las variables de configuración en cualquier lugar dentro de su aplicación:

```php
// config/services.php
return [
    'bugsnag' => [
        'key' => env('BUGSNAG_API_KEY'),
    ],
];

// In controller, or whatever
$bugsnag = new Bugsnag(config('services.bugsnag.key'));
```
:::

## El Archivo `.env`

Echemos un vistazo rápido al contenido predeterminado del archivo `.env`. Las claves exactas variarán según la versión de Laravel que estés usando, pero echa un vistazo al ejemplo para ver cómo se ven.

Las variables de entorno predeterminadas en Laravel:
```sh
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

No voy a analizarlas todas, porque muchas de ellas son simplemente grupos de información de autenticación para varios servicios (Pusher, Redis, DB, Mail). Sin embargo, hay dos variables de entorno importantes que debería conocer:

- `APP_KEY`

Una cadena generada aleatoriamente que se utiliza para cifrar datos. Si alguna vez está vacía, puede aparecer el error _“No application encryption key has been specified”_. En ese caso, simplemente ejecute `php artisan key:generate` y Laravel generará una para usted.

- `APP_DEBUG`

Un valor _Boolean_ que determina si los usuarios de esta instancia de su aplicación deben ver errores de depuración (excelente para entornos locales y de prueba, terrible para producción).

El resto de las configuraciones de no autenticación (`BROADCAST_DRIVER`, `QUEUE_CONNECTION`, etc.) reciben valores predeterminados que funcionan con la menor dependencia posible de servicios externos, lo que es perfecto para cuando estás empezando.

Cuando inicias tu primera aplicación Laravel, el único cambio que probablemente querrás hacer para la mayoría de los proyectos es en las configuraciones de la base de datos. Yo uso Laravel Valet, así que cambio `DB_DATABASE` por el nombre de mi proyecto, `DB_USERNAME` por `root` y `DB_PASSWORD` por una cadena vacía:


```sh
DB_DATABASE=myProject
DB_USERNAME=root
DB_PASSWORD=
```

Luego, creo una base de datos con el mismo nombre que mi proyecto en mi cliente MySQL favorito y estoy listo para comenzar.

## En Marcha

Ahora estás listo en funcionamiento con una instalación básica de Laravel. Ejecuta `git init`, confirma los archivos con `git add .` y `git commit`, y ya estás listo para comenzar a codificar. ¡Eso es todo! Y si estás usando Valet, puedes ejecutar los siguientes comandos y ver tu sitio en vivo al instante en tu navegador:

```sh
laravel new myProject && cd myProject && valet open
```

Cada vez que comienzo un nuevo proyecto, estos son los pasos que sigo:


```sh
laravel new myProject
cd myProject
git init
git add .
git commit -m "Initial commit"
```

Mantengo todos mis sitios en una carpeta `~/Sites`, que he configurado como mi directorio principal de Valet, por lo que en este caso tendría `myProject.test` accesible instantáneamente en mi navegador sin trabajo adicional. Puedo editar `.env` y apuntarlo a una base de datos en particular, agregar esa base de datos en mi aplicación MySQL y estoy listo para comenzar a codificar.

## Pruebas

En cada capítulo posterior a este, la sección “Pruebas” al final del capítulo te mostrará cómo escribir pruebas para la característica o características que se trataron. Dado que este capítulo no cubre una característica que se pueda probar, hablemos rápidamente de las pruebas. (Para obtener más información sobre cómo escribir y ejecutar pruebas en Laravel, [aquí](./testing.html)).

Fuera de caja, Laravel trae **PHPUnit** como una dependencia y está configurado para ejecutar las pruebas en cualquier archivo en el directorio `tests/` cuyo nombre termine con `Test.php` (por ejemplo, `tests/UserTest.php`).

Por lo tanto, la forma más sencilla de escribir pruebas es crear un archivo en el directorio `tests/` con un nombre que termine con `Test.php`. Y la forma más fácil de ejecutarlas es ejecutar `./vendor/bin/phpunit` desde la línea de comandos (en la raíz del proyecto).

Si alguna prueba requiere acceso a la base de datos, asegúrese de ejecutar las pruebas desde la máquina donde está alojada la base de datos — por lo tanto, si está alojando la base de datos en Vagrant, asegúrese de conectarse por SSH a su máquina Vagrant para ejecutar las pruebas desde allí. Nuevamente, puede aprender sobre esto y mucho más [aquí](./testing.html).

Además, algunas de las secciones de prueba utilizarán sintaxis y características de prueba con las que no estará familiarizado si está leyendo el libro por primera vez. Si el código de alguna de las secciones de prueba le resulta confuso, simplemente omítalo y vuelva a leerlo después de haber tenido la oportunidad de leer el capítulo de pruebas.

## Resumen

Dado que Laravel es un framework PHP, es muy sencillo servirlo localmente. Laravel también provee tres herramientas para gestionar el desarrollo local: Sail, una configuración Docker; Valet, una herramienta más sencilla basada en macOS; y Homestead, una configuración preconfigurada de Vagrant. Laravel se basa en Composer y se puede instalar con él, y viene de fábrica con una serie de carpetas y archivos que reflejan tanto sus convenciones como su relación con otras herramientas de código abierto.


