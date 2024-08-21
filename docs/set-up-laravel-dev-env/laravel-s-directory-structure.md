# Estructura de Directorios de Laravel

Cuando abres un directorio que contiene una aplicación Laravel de esqueleto, verás los siguientes archivos y directorios:

```sh
app/
bootstrap/
config/
database/
public/
resources/
routes/
storage/
tests/
vendor/
.editorconfig
.env
.env.example
.gitattributes
.gitignore
artisan
composer.json
composer.lock
package.json
phpunit.xml
readme.md
vite.config.js
```

Vamos a recorrerlos uno por uno para familiarizarnos.

## Los Carpetas

El directorio raíz contiene las siguientes carpetas de forma predeterminada:

### `app/`

Aquí se ubicará la mayor parte de la aplicación real. Aquí se ubican los modelos, controladores, comandos y el código de dominio PHP.

### `bootstrap/`

Contiene los archivos que el framework Laravel utiliza para arrancar cada vez que se ejecuta.

### `config/`

Donde residen todos los archivos de configuración.

### `database/`

Donde residen las migraciones, semillas y fábricas de bases de datos.

### `public/`

El directorio al que apunta el servidor cuando está sirviendo el sitio web. Contiene `index.php`, que es el controlador frontal que inicia el proceso de arranque y dirige todas las solicitudes de forma adecuada. También es donde se almacenan los archivos públicos, como imágenes, hojas de estilo, scripts o descargas.

### `resources/`

Aquí se encuentran los archivos necesarios para otros scripts. Aquí se encuentran las vistas y (opcionalmente) los archivos fuente CSS y fuente JavaScript.

### `routes/`

Donde residen todas las definiciones de ruta, tanto para rutas HTTP como para “rutas de consola” o comandos Artisan.

### `storage/`

Donde se almacenan los cachés, los registros y los archivos del sistema compilados.

### `tests/`

Donde residen las pruebas unitarias y de integración.

### `vendor/`

Donde Composer instala sus dependencias. Git lo ignora (está marcado para excluirlo de su sistema de control de versiones) porque se espera que Composer se ejecute como parte de su proceso de implementación en cualquier servidor remoto.

## Los Archivos Sueltos

El directorio raíz también contiene los siguientes archivos:

### `.editorconfig`

Proporciona a su IDE/editor de texto instrucciones sobre los estándares de codificación de Laravel (por ejemplo, el tamaño de las sangrías, el conjunto de caracteres y si se deben recortar los espacios en blanco finales).

### `.env` y `.env.example`

Dictar las variables de entorno (variables que se espera que sean diferentes en cada entorno y, por lo tanto, no se comprometen con el control de versiones). `.env.example` es una plantilla que cada entorno debe duplicar para crear su propio archivo `.env`, que Git ignora.

### `gitignore` y `.gitattributes`

Archivos de configuración de Git.

### `artisan`

Permite ejecutar comandos [Artisan](../artisan-and-tinker/an-introduction-to-artisan.html) desde la línea de comandos.

### `composer.json` y `composer.lock`

Archivos de configuración para Composer; `composer.json` es editable por el usuario y `composer.lock` no. Estos archivos comparten información básica sobre el proyecto y también definen sus dependencias PHP.

### `package.json`

Similar a `composer.json`, pero para los recursos de frontend y las dependencias del sistema de compilación; le indica a NPM qué dependencias basadas en JavaScript debe incorporar.

### `phpunit.xml`

Un archivo de configuración para PHPUnit, la herramienta que Laravel utiliza para realizar pruebas fuera de la caja.

### `readme.md`

Un archivo Markdown que ofrece una introducción básica a Laravel. No verá este archivo si utiliza el instalador de Laravel.

### `vite.config.js`

El archivo de configuración (opcional) para Vite. Este archivo le indica a su sistema de compilación cómo compilar y procesar sus activos de frontend.