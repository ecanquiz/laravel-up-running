# Comprender la Fecha y la Hora en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript)
:::

## Introducción

La fecha y la hora son una parte habitual de nuestra vida cotidiana y, por lo tanto, ocupan un lugar destacado en la programación informática. En JavaScript, es posible que tengas que crear un sitio web con un calendario, un horario de trenes o una interfaz para programar citas. Estas aplicaciones deben mostrar horas relevantes según la zona horaria actual del usuario, o realizar cálculos sobre llegadas y salidas o horas de inicio y finalización. Además, es posible que necesite utilizar JavaScript para generar un informe a una hora determinada todos los días o filtrar los restaurantes y establecimientos abiertos actualmente.

Para lograr todos estos objetivos y más, JavaScript viene con el objeto `Date` integrado y métodos relacionados. Este tutorial explicará cómo formatear y usar la fecha y la hora en JavaScript.

## El Objeto de Fecha

El [objeto](./understanding-objects-in-javascript.html) `Date` es un objeto integrado en JavaScript que almacena la fecha y la hora. Proporciona una serie de métodos integrados para formatear y administrar esos datos.

De forma predeterminada, un nueva instancia `Date` sin argumentos proporcionados crea un objeto correspondiente a la fecha y hora actuales. Esto se creará de acuerdo con la configuración del sistema de la computadora actual.

Para demostrar el `Date` de JavaScript, creemos una variable y le asignaremos la fecha actual. Este artículo se escribió el miércoles 18 de octubre en Londres (GMT), por lo que la fecha, hora y zona horaria actuales se representan a continuación.

📃`now.js`
```js
// Set variable to current date and time
const now = new Date();

// View the output
now;
```

```sh
Output
Wed Oct 18 2017 12:41:34 GMT+0000 (UTC)
```

Al observar el resultado, tenemos una cadena de fecha que contiene lo siguiente:

|Día de la Semana|Mes|Día|Año|Hora|Minuto|Segundo|Zona Horaria|
|-|-|-|-|-|-|-|-|
|Wed|Oct|18|2017|12|41|34|GMT+0000 (UTC)|


La fecha y la hora están divididas e impresas de una manera que podemos entender como humanos.

JavaScript, sin embargo, entiende la fecha basándose en una **marca de tiempo** derivado del [tiempo de Unix](https://en.wikipedia.org/wiki/Unix_time#History), que es un valor que consiste en el número de milisegundos que han pasado desde la medianoche del 1 de enero de 1970. Podemos obtener la marca de tiempo con el método `getTime()`.


```js
// Get the current timestamp
now.getTime();
```

```sh
Output
1508330494000
```

El número grande  que aparece en nuestra salida para la marca de tiempo actual representa el mismo valor que el anterior, 18 de octubre de 2017.

El **tiempo de Época**, también referido como hora cero, está representada por la cadena de fecha `01 January, 1970 00:00:00 Universal Time (UTC)` y por la marca de tiempo `0`. Podemos probar esto en el navegador creando una nueva variable y asignándole una nueva instancia `Date` basada en una marca de tiempo de `0`.


📃`epoch.js`
```js

// Assign the timestamp 0 to a new variable
const epochTime = new Date(0);

epochTime;
```

```sh
Output
01 January, 1970 00:00:00 Universal Time (UTC)
```

El tiempo de Época se eligió como estándar para que las computadoras midieran el tiempo en los primeros días de la programación, y es el método que utiliza JavaScript. Es importante comprender el concepto de marca de tiempo y cadena de fecha, ya que ambos pueden usarse dependiendo de la configuración y el propósito de una aplicación.

Hasta ahora, hemos aprendido cómo crear una nueva instancia `Date` basada en la hora actual y cómo crear una basada en una marca de tiempo. En total, existen cuatro formatos mediante los cuales puede crear un nuevo `Date` en JavaScript. Además de la hora actual predeterminada y la marca de tiempo, también puede usar una cadena de fecha o especificar fechas y horas particulares.


|Creación de Fecha|Salida|
|-|-|
|`new Date()`|Fecha y hora actual|
|`new Date(timestamp)`|Crea una fecha basada en milisegundos desde el tiempo de Época|
|`new Date(date string)`|Crea una fecha basada en una cadena de fecha|
|`new Date(year, month, day, hours, minutes, seconds, milliseconds)`|Crea una fecha basada en la fecha y hora especificadas|

Para demostrar las diferentes formas de hacer referencia a una fecha específica, crearemos nuevos objetos `Date` que representarán el 4 de julio de 1776 a las 12:30 p.m. GMT de tres maneras diferentes.


📃`usa.js`
```js
// Timestamp method
new Date(-6106015800000);

// Date string method
new Date("July 4 1776 12:30");

// Date and time method
new Date(1776, 6, 4, 12, 30, 0, 0);
```

Los tres ejemplos anteriores crean una fecha que contiene la misma información.

Notarás que el método de marca de tiempo tiene un número negativo; cualquier fecha anterior al tiempo de Época se representará como un número negativo.

En el método de fecha y hora, nuestros segundos y milisegundos se establecen en `0`. Si falta algún número en la creación del `Date`, el valor predeterminado será `0`. Sin embargo, el orden no se puede cambiar, así que téngalo en cuenta si decide omitir un número. También notarás que el mes de julio está representado por el `6`, no por el habitual `7`. Esto se debe a que los números de fecha y hora comienzan desde `0`, como lo hace la mayoría de los conteos en programación. Consulte la siguiente sección para obtener un cuadro más detallado.

## Recuperar la Fecha con `get`

Una vez que tenemos una fecha, podemos acceder a todos los componentes de la fecha con varios métodos integrados. Los métodos devolverán cada parte de la fecha relativa a la zona horaria local. Cada uno de estos métodos comienza con `get` y devolverá el número relativo. A continuación se muestra una tabla detallada de los métodos `get` del objeto `Date`.

|Fecha/Hora|Método|Rango|Ejemplo|
|-|-|-|-|
|Año|`getFullYear()`|YYYY|1970|
|Mes|`getMonth()`|0-11|0 = Enero|
|Día (del mes)|`getDate()`|1-31|1 = 1° del mes|
|Día (de la semana)|`getDay()`|0-6|0 = Domingo|
|Hora|`getHours()`|0-23|0 = medianoche|
|Minuto|`getMinutes()`|0-59||
|Second|`getSeconds()`|0-59||
|Milisegundo|`getMilliseconds()`|0-999||
|Marca de tiempo|`getTime()`|Milisegundos desde el tiempo de Época||


Hagamos una nueva fecha, basada en el 31 de julio de 1980, y asignémosla a una variable.


📃`harryPotter.js`
```js
// Initialize a new birthday instance
const birthday = new Date(1980, 6, 31);
```

Ahora podemos usar todos nuestros métodos para obtener cada componente de fecha, desde año hasta milisegundo.


📃`getDateComponents.js`
```js
birthday.getFullYear();      // 1980
birthday.getMonth();         // 6
birthday.getDate();          // 31
birthday.getDay();           // 4
birthday.getHours();         // 0
birthday.getMinutes();       // 0
birthday.getSeconds();       // 0
birthday.getMilliseconds();  // 0
birthday.getTime();          // 333849600000 (for GMT)
```

A veces puede ser necesario extraer sólo una parte de una fecha, y los métodos `get` integrados son la herramienta que utilizará para lograrlo.

Como ejemplo de esto, podemos comparar la fecha actual con el día y mes del 3 de octubre para ver si es 3 de octubre o no.

📃`oct3.js`
```js
// Get today's date
const today = new Date();

// Compare today with October 3rd
if (today.getDate() === 3 && today.getMonth() === 9) {
  console.log("It's October 3rd.");
} else {
  console.log("It's not October 3rd.");
}
```

```sh
Output
It's not October 3rd.
```

Dado que, al momento de escribir este artículo, no es el 3 de octubre, la consola lo refleja.

Los métodos `Date` integrados que comienzan con `get` nos permiten acceder a componentes de fecha que devuelven el número asociado con lo que estamos recuperando del objeto instanciado.

## Modificando la Fecha con `set`

Para todos los métodos `get` que aprendimos anteriormente, existe un método `set` correspondiente. Donde `get` se usa para recuperar un componente específico de una fecha, `set` se usa para modificar componentes de una fecha. A continuación se muestra un cuadro detallado de los métodos `set` del objeto `Date`.


|Fecha/Hora|Método|Rango|Ejemplo|
|-|-|-|-|
|Año|`setFullYear()`|YYYY|1970|
|Mes|`setMonth()`|0-11|0 = Enero|
|Día (del mes)|`setDate()`|1-31|1 = 1° del mes|
|Día (de la semana)|`setDay()`|0-6|0 = Domingo|
|Hora|`setHours()`|0-23|0 = medianoche|
|Minuto|`setMinutes()`|0-59||
|Second|`setSeconds()`|0-59||
|Milisegundo|`setMilliseconds()`|0-999||
|Marca de tiempo|`setTime()`|Milisegundos desde el tiempo de Época||


Podemos utilizar estos métodos `set` para modificar uno, más o todos los componentes de una fecha. Por ejemplo, podemos cambiar el año de nuestra variable `birthday` anterior para que sea `1997` en lugar de `1980`.


📃`harryPotter.js`
```js
// Change year of birthday date
birthday.setFullYear(1997);

birthday;
```


```sh
Output
Thu Jul 31 1997 00:00:00 GMT+0000 (UTC)
```

Vemos en el ejemplo anterior que cuando llamamos a la variable `birthday` recibimos el año nuevo como parte del resultado.

Los métodos integrados que comienzan con `set` nos permiten modificar diferentes partes de un objeto `Date`.

## Métodos Fecha con UTC

Los métodos `get` discutidos anteriormente recuperan los componentes de fecha según la configuración de zona horaria local del usuario. Para un mayor control sobre las fechas y horas, puede utilizar los métodos `getUTC`, que son exactamente iguales a los métodos `get`, excepto que calculan la hora basándose en el estándar [UTC (Tiempo Universal Coordinado)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). A continuación se muestra una tabla de los métodos UTC para el objeto `Date` de JavaScript.


|Fecha/Hora|Método|Rango|Ejemplo|
|-|-|-|-|
|Año|`getUTCFullYear()`|YYYY|1970|
|Mes|`getUTCMonth()`|0-11|0 = Enero|
|Día (del mes)|`getUTCDate()`|1-31|1 = 1° del mes|
|Día (de la semana)|`getUTCDay()`|0-6|0 = Domingo|
|Hora|`getUTCHours()`|0-23|0 = medianoche|
|Minuto|`getUTCMinutes()`|0-59||
|Second|`getUTCSeconds()`|0-59||
|Milisegundo|`getUTCMilliseconds()`|0-999||


Para probar la diferencia entre los métodos `get` local y UTC, podemos ejecutar el siguiente código.


📃`UTC.js`
```js
// Assign current time to a variable
const now = new Date();

// Print local and UTC timezones
console.log(now.getHours());
console.log(now.getUTCHours());
```

Al ejecutar este código se imprimirá la hora actual y la hora de la zona horaria UTC. Si actualmente se encuentra en la zona horaria UTC, los números que se obtienen al ejecutar el programa anterior serán los mismos.

UTC es útil porque proporciona una referencia estándar de hora internacional y, por lo tanto, puede mantener su código consistente en todas las zonas horarias si eso es aplicable a lo que está desarrollando.

## Conclusión

En este tutorial, aprendimos cómo crear una instancia del objeto `Date` y usar sus métodos integrados para acceder y modificar componentes de una fecha específica. Para obtener una vista más detallada de las fechas y horas en JavaScript, puede leer la [referencia de Fecha en Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

Saber cómo trabajar con fechas es esencial para muchas tareas comunes en JavaScript, ya que esto puede permitirle hacer muchas cosas, desde configurar un informe repetido hasta mostrar fechas y programaciones en la zona horaria correcta.
