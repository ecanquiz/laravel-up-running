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

### _app_

Aquí se ubicará la mayor parte de la aplicación real. Aquí se ubican los modelos, controladores, comandos y el código de dominio PHP.

### _bootstrap_

Contiene los archivos que el framework Laravel utiliza para arrancar cada vez que se ejecuta.

### _config_

Donde residen todos los archivos de configuración.

### _database_

Donde residen las migraciones, semillas y fábricas de bases de datos.

### _public_

El directorio al que apunta el servidor cuando está sirviendo el sitio web. Contiene `index.php`, que es el controlador frontal que inicia el proceso de arranque y dirige todas las solicitudes de forma adecuada. También es donde se almacenan los archivos públicos, como imágenes, hojas de estilo, scripts o descargas.

### _resources_

Aquí se encuentran los archivos necesarios para otros scripts. Aquí se encuentran las vistas y (opcionalmente) los archivos fuente CSS y fuente JavaScript.

### _routes_

Donde residen todas las definiciones de ruta, tanto para rutas HTTP como para “rutas de consola” o comandos Artisan.

### _storage_

Donde se almacenan los cachés, los registros y los archivos del sistema compilados.

### _tests_

Donde residen las pruebas unitarias y de integración.

### _vendor_

Donde Composer instala sus dependencias. Git lo ignora (está marcado para excluirlo de su sistema de control de versiones) porque se espera que Composer se ejecute como parte de su proceso de implementación en cualquier servidor remoto.

## Los Archivos Sueltos
## The Loose Files


