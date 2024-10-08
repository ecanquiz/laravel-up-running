# Entornos de Desarrollo Local

Para muchos proyectos, será suficiente alojar su entorno de desarrollo utilizando un conjunto de herramientas más simple. Si ya tiene MAMP, WAMP o XAMPP instalado en su sistema, probablemente estará bien para ejecutar Laravel.

También puedes ejecutar Laravel con el servidor web integrado de PHP. Ejecute `php -S localhost: 8000 -t public` desde la carpeta raíz de su sitio Laravel y el servidor web integrado de PHP atenderá su sitio en `http://localhost:8000/`.

Sin embargo, si desea un poco más de potencia en su entorno de desarrollo (diferentes dominios locales para cada proyecto, administración de dependencias como MySQL, etc.), querrá buscar una herramienta más poderosa que solo el servidor integrado de PHP.

Laravel ofrece cinco herramientas para el desarrollo local: Artisan Serve, Sail, Valet, Herd y Homestead. Cubriremos cada uno brevemente. Si no está seguro de cuál utilizar, personalmente soy fanático de Valet para usuarios de Mac y Sail para todos los demás.


## Artisan Serve

Si ejecuta `php artisan serve` después de configurar su aplicación Laravel, la entregará en `http://localhost:8000`, tal como lo configuramos anteriormente usando el servidor web integrado de PHP. Aquí no obtienes nada más gratis, por lo que su único beneficio significativo es que es más fácil de recordar.


## Laravel Sail

Sail es la forma más sencilla de comenzar con el desarrollo local de Laravel de una manera igual independientemente de su sistema operativo. Viene con un servidor web PHP, bases de datos y una serie de otras sutilezas que hacen que sea muy fácil ejecutar una única instalación de Laravel que sea consistente para todos los desarrolladores de su proyecto, independientemente de las dependencias del proyecto o los entornos de trabajo de sus desarrolladores.

¿Por qué no uso Sail? Utiliza Docker para lograr lo anterior, y Docker en macOS es lo suficientemente lento como para que prefiera Valet. Pero si eres nuevo en Laravel, especialmente si no usas una Mac, Sail se creó intencionalmente como la forma más sencilla de comenzar a crear tus aplicaciones Laravel.

## Laravel Valet

Si es usuario de macOS (también existen bifurcaciones no oficiales para Windows y Linux), Laravel Valet facilita el servicio de cada una de sus aplicaciones locales de Laravel (y la mayoría de las demás aplicaciones estáticas y basadas en PHP) en diferentes dominios locales.

Necesitará instalar algunas herramientas usando Homebrew, que la documentación le guiará, pero hay muy pocos pasos desde la instalación inicial hasta la entrega de sus aplicaciones.

Instale Valet (consulte los [documentos de Valet](https://laravel.com/docs/11.x/valet) para obtener las instrucciones de instalación más recientes) y apúntelo a uno o más directorios donde residirán sus sitios. Ejecuté `valet park` desde mi directorio `~/Sites`, que es donde puse todas mis aplicaciones en desarrollo. Ahora, puedes simplemente agregar `.test` al final del nombre del directorio y visitarlo en tu navegador.

Valet facilita el servicio de aplicaciones de Laravel; podemos usar `valet park` para servir todas las subcarpetas en una carpeta determinada como `{foldername}.test`, `valet link` para servir solo una carpeta, `valet open` para abrir un navegador y mostrar el dominio servido por Valet para una carpeta, `valet secure` para servir el sitio Valet con HTTPS y `valet share` para abrir un túnel ngrok o Expose para que pueda compartir su sitio con otros.

## Laravel Homestead

Homestead es otra herramienta que quizás desee utilizar para configurar su entorno de desarrollo local. Es una herramienta de configuración que se encuentra encima de Vagrant (que es una herramienta para administrar máquinas virtuales) y proporciona una imagen de máquina virtual preconfigurada que está perfectamente configurada para el desarrollo de Laravel y refleja el entorno de producción más común en el que se ejecutan muchos sitios de Laravel.

Los [documentos de Homestead](https://laravel.com/docs/11.x/homestead) son sólidos y se mantienen constantemente actualizados, por lo que te recomendaré que los consultes si quieres aprender cómo funciona y cómo configurarlo.
