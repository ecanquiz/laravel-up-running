# En Marcha y Pruebas

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

En cada capítulo posterior a este, la sección “Pruebas” al final del capítulo te mostrará cómo escribir pruebas para la característica o características que se trataron. Dado que este capítulo no cubre una característica que se pueda probar, hablemos rápidamente de las pruebas. (Para obtener más información sobre cómo escribir y ejecutar pruebas en Laravel, [aquí](../testing/index.html)).

Fuera de caja, Laravel trae **PHPUnit** como una dependencia y está configurado para ejecutar las pruebas en cualquier archivo en el directorio `tests/` cuyo nombre termine con `Test.php` (por ejemplo, `tests/UserTest.php`).

Por lo tanto, la forma más sencilla de escribir pruebas es crear un archivo en el directorio `tests/` con un nombre que termine con `Test.php`. Y la forma más fácil de ejecutarlas es ejecutar `./vendor/bin/phpunit` desde la línea de comandos (en la raíz del proyecto).

Si alguna prueba requiere acceso a la base de datos, asegúrese de ejecutar las pruebas desde la máquina donde está alojada la base de datos — por lo tanto, si está alojando la base de datos en Vagrant, asegúrese de conectarse por SSH a su máquina Vagrant para ejecutar las pruebas desde allí. Nuevamente, puede aprender sobre esto y mucho más [aquí](../testing/index.html).

Además, algunas de las secciones de prueba utilizarán sintaxis y características de prueba con las que no estará familiarizado si está leyendo el libro por primera vez. Si el código de alguna de las secciones de prueba le resulta confuso, simplemente omítalo y vuelva a leerlo después de haber tenido la oportunidad de leer el capítulo de pruebas.


## Resumen

Dado que Laravel es un framework PHP, es muy sencillo servirlo localmente. Laravel también provee tres herramientas para gestionar el desarrollo local: 

- **Sail** — una configuración Docker
- **Valet** — una herramienta más sencilla basada en macOS
- **Homestead** — una configuración preconfigurada de Vagrant

Laravel se basa en Composer y se puede instalar con él, y viene de fábrica con una serie de carpetas y archivos que reflejan tanto sus convenciones como su relación con otras herramientas de código abierto.