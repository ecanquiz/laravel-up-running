# Pruebas

En cada capítulo posterior a este, la sección “Pruebas” al final del capítulo te mostrará cómo escribir pruebas para la característica o características que se trataron. Dado que este capítulo no cubre una característica que se pueda probar, hablemos rápidamente de las pruebas. (Para obtener más información sobre cómo escribir y ejecutar pruebas en Laravel, [aquí](../testing/index.html)).

Fuera de caja, Laravel trae **PHPUnit** como una dependencia y está configurado para ejecutar las pruebas en cualquier archivo en el directorio `tests/` cuyo nombre termine con `Test.php` (por ejemplo, `tests/UserTest.php`).

Por lo tanto, la forma más sencilla de escribir pruebas es crear un archivo en el directorio `tests/` con un nombre que termine con `Test.php`. Y la forma más fácil de ejecutarlas es ejecutar `./vendor/bin/phpunit` desde la línea de comandos (en la raíz del proyecto).

Si alguna prueba requiere acceso a la base de datos, asegúrese de ejecutar las pruebas desde la máquina donde está alojada la base de datos — por lo tanto, si está alojando la base de datos en Vagrant, asegúrese de conectarse por SSH a su máquina Vagrant para ejecutar las pruebas desde allí. Nuevamente, puede aprender sobre esto y mucho más [aquí](../testing/index.html).

Además, algunas de las secciones de prueba utilizarán sintaxis y características de prueba con las que no estará familiarizado si está leyendo el libro por primera vez. Si el código de alguna de las secciones de prueba le resulta confuso, simplemente omítalo y vuelva a leerlo después de haber tenido la oportunidad de leer el capítulo de pruebas.