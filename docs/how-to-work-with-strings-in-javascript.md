# Cómo Trabajar con Cadenas en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-work-with-strings-in-javascript)
:::

## Introducción

Una cadena es una secuencia de uno o más caracteres que pueden consistir en letras, números o símbolos. Las cadenas en JavaScript son [tipos de datos](./understanding-data-types.html#strings) primitivos e inmutables, lo que significa que no cambian.

Como las cadenas son la forma en que mostramos y trabajamos con el texto, y el texto es nuestra principal forma de comunicarnos y comprender a través de las computadoras, las cadenas son uno de los conceptos de programación más fundamentales con los que debemos estar familiarizados.

En este artículo, aprenderemos cómo crear y ver la salida de cadenas, cómo concatenar cadenas, cómo almacenar cadenas en variables y las reglas de uso de comillas, apóstrofos y nuevas líneas dentro de cadenas en JavaScript.

## Crear y Ver la Salida de Cadenas

En JavaScript, hay tres formas de escribir una cadena: se pueden escribir entre comillas simples (`' '`), comillas dobles (`" "`) o comillas invertidas (<code>\` \`</code>). El tipo de comilla utilizada debe coincidir en ambos lados; sin embargo, es posible que los tres estilos se puedan usar en el mismo script.

Las cadenas que utilizan comillas dobles y comillas simples son efectivamente las mismas. Como no existe ninguna convención ni preferencia oficial por las cadenas entre comillas simples o dobles, lo único que importa es mantener la coherencia dentro de los archivos de programa del proyecto.

```js
'This string uses single quotes.';
```

```js
"This string uses double quotes.";
```

La tercera y más nueva forma de crear una cadena se llama **literal de plantilla**. Los literales de plantilla usan la comilla invertida (también conocida como acento grave) y funcionan de la misma manera que las cadenas normales con algunas ventajas adicionales, que cubriremos en este artículo.

```js
`This string uses backticks.`;
```

La forma más sencilla de ver el resultado de una cadena es imprimirla en la consola, con `console.log()`:

```js
console.log("This is a string in the console.");
```

```sh
Output
This is a string in the console.
```

Otra forma sencilla de generar un valor es enviar una ventana emergente de alerta al navegador con `alert()`:

```js
alert("This is a string in an alert.");
```

Al ejecutar la línea anterior se producirá el siguiente resultado en la interfaz de usuario del navegador:

![how-to-work-with-strings-in-javascript](./img/how-to-work-with-strings-in-javascript-1.png)

`alert()` es un método menos común para probar y ver resultados, ya que cerrar las alertas puede volverse tedioso rápidamente.

## Almacenar una Cadena en una Variable

Las variables en JavaScript son contenedores con nombre que almacenan un valor, utilizando las palabras clave `var`, `const` o `let`. Podemos asignar el valor de una cadena a una variable con nombre.

```js
const newString = "This is a string assigned to a variable.";
```

Ahora que la variable `newString` contiene nuestra cadena, podemos hacer referencia a ella e imprimirla en la consola.

```js
console.log(newString);
```

Esto generará el valor de la cadena.

```sh
Output
This is a string assigned to a variable.
```

Al usar variables para sustituir cadenas, no tenemos que volver a escribir una cadena cada vez que queremos usarla, lo que nos facilita trabajar y manipular cadenas dentro de nuestros programas.

## Concatenación de Cadenas

La **concatenación** significa unir dos o más cadenas para crear una nueva cadena. Para concatenar utilizamos el operador de concatenación, representado por un símbolo `+`. El símbolo `+` también es el [operador de suma](./how-to-do-math-in-javascript-with-operators.html#adicion-y-sustraccion) cuando se usa con operaciones aritméticas.

Creemos una instancia simple de concatenación, entre `"Sea"` y `"horse"`.

```js
"Sea" + "horse";
```

```sh
Output
Seahorse
```

Unimos cadenas y variables que contienen valores de cadena con concatenación.

```js
const poem = "The Wide Ocean";
const author = "Pablo Neruda";

const favePoem = "My favorite poem is " + poem + " by " + author + ".";
```

```sh
Output
My favorite poem is The Wide Ocean by Pablo Neruda.
```

Cuando combinamos dos o más cadenas mediante concatenación estamos creando una nueva cadena que podemos usar en todo nuestro programa.


## Variables en Cadenas con Literales de Plantilla

Una característica especial de la característica literal de plantilla es la capacidad de incluir expresiones y variables dentro de una cadena. En lugar de tener que usar concatenación, podemos usar la sintaxis `${}` para insertar una variable.

```js
const poem = "The Wide Ocean";
const author = "Pablo Neruda";

const favePoem = `My favorite poem is ${poem} by ${author}.`;
```

```sh
Output
My favorite poem is The Wide Ocean by Pablo Neruda.
```

Como podemos ver, incluir expresiones en literales de plantilla es otra forma de lograr el mismo resultado. En este caso, usar literales de plantilla puede ser más fácil de escribir y más conveniente.

## Literales de Cadena y Valores de Cadena

Es posible que observe que las cadenas que escribimos en el código fuente están entre comillas o comillas invertidas, pero la salida impresa real no incluye ninguna comilla.

```js
"Beyond the Sea"; 
```

```sh
Output
Beyond the Sea
```

Hay una distinción al referirse a cada uno de estos. Un **literal de cadena** es la cadena tal como está escrita en el código fuente, incluidas las comillas. Un **valor de cadena** es lo que vemos en el resultado y no incluye comillas.

En el ejemplo anterior, `"Beyond the Sea"` es un literal de cadena y `Beyond the Sea` es un valor de cadena.

## Escapar de Comillas y Apóstrofes en Cadenas

Debido a que se utilizan comillas para indicar cadenas, se deben tener consideraciones especiales al utilizar apóstrofes y comillas en cadenas. Intentar utilizar un apóstrofo en medio de una cadena entre comillas simples, por ejemplo, finalizará la cadena y JavaScript intentará analizar el resto de la cadena deseada como código.

Podemos ver esto intentando usar un apóstrofe en la contracción `I'm` a continuación:

```js
const brokenString = 'I'm a broken string';

console.log(brokenString);
```

```sh
Output
unknown: Unexpected token (1:24)
```

Lo mismo se aplicaría al intentar utilizar comillas en una cadena entre comillas dobles.

Para evitar que se produzca un error en estas situaciones, tenemos algunas opciones que podemos usar:

- Sintaxis de cadena opuesta
- Caracteres de escape
- Literales de plantilla

Exploraremos estas opciones a continuación.

## Usando la Sintaxis de Cadena Alternativa

Una manera fácil de evitar casos aislados de cadenas potencialmente rotas es usar la sintaxis de cadena opuesta a la que estás usando actualmente.

Por ejemplo, apóstrofes en cadenas creadas con `"`.


```js
"We're safely using an apostrophe in double quotes."
```

Comillas en cadenas construidas con `'`.


```js
'Then he said, "Hello, World!"';
```

En la forma en que combinamos comillas simples y dobles, podemos controlar la visualización de comillas y apóstrofes dentro de nuestras cadenas. Sin embargo, cuando trabajamos para utilizar una sintaxis coherente dentro de los archivos de programación del proyecto, esto puede resultar difícil de mantener en todo el código base.

## Usando el Carácter de Escape (`\`)

Podemos usar el carácter de escape de barra invertida (`\`) para evitar que JavaScript interprete una comilla como el final de la cadena.

La sintaxis de `\'` siempre será una comilla simple, y la sintaxis de `\"` siempre será una comilla doble, sin temor a romper la cadena.

Usando este método, podemos usar apóstrofes en cadenas creadas con `"`.

```js
'We\'re safely using an apostrophe in single quotes.'
```

También podemos usar comillas en cadenas creadas con `"`.

```js
"Then he said, \"Hello, World!\"";
```

Este método tiene un aspecto un poco más complicado, pero es posible que necesites usar un apóstrofe y unas comillas dentro de la misma cadena, lo que hará que sea necesario escapar.

## Uso de Literales de Plantilla.

Los literales de plantilla se definen con comillas invertidas y, por lo tanto, tanto las comillas como los apóstrofes se pueden utilizar de forma segura sin ningún tipo de escape o consideración adicional.


```js
`We're safely using apostrophes and "quotes" in a template literal.`;
```

Además de evitar la necesidad de escape de caracteres y permitir expresiones incrustadas, los literales de plantilla también brindan soporte multilínea, lo cual discutiremos en la [siguiente sección](./how-to-work-with-strings-in-javascript.html#cadenas-largas-y-nuevas-lineas).

Con la sintaxis de cadena alterna, el uso de caracteres de escape y el uso de literales de plantilla, existen varias formas de crear una cadena de forma segura.

## Cadenas Largas y Nuevas Líneas

Hay ocasiones en las que es posible que desees insertar un carácter de nueva línea o un retorno de carro en tu cadena. Los caracteres de escape `\n` o `\r` se pueden utilizar para insertar una nueva línea en la salida del código.

```js
const threeLines = "This is a string\nthat spans across\nthree lines.";
```

```sh
Output
This is a string
that spans across
three lines.
```


Esto técnicamente funciona para obtener nuestra salida en múltiples líneas. Sin embargo, escribir una cadena muy larga en una sola línea rápidamente resultará muy difícil de leer y trabajar con ella. Podemos usar el operador de concatenación para mostrar la cadena en varias líneas.


```js
const threeLines = "This is a string\n" +
"that spans across\n" +
"three lines.";
```

En lugar de concatenar varias cadenas, podemos usar el carácter `\` escape para escapar de la nueva línea.


```js
const threeLines = "This is a string\n\
that spans across\n\
three lines.";
```

:::warning Nota
No se prefiere este método, ya que puede causar problemas con algunos navegadores y minificadores.
:::

Para que el código sea más legible, podemos utilizar cadenas literales de plantilla. Estos eliminan la necesidad de concatenación o escape en cadenas largas que contienen nuevas líneas. Se conservarán la cadena y las nuevas líneas.


```js
const threeLines = `This is a string
that spans across
three lines.`;
```

```sh
Output
This is a string
that spans across
three lines.
```

Es importante conocer todas las formas de crear nuevas líneas y cadenas que abarcan varias líneas, ya que diferentes bases de código pueden utilizar diversos estándares.


## Conclusión

En este artículo, repasamos los conceptos básicos del trabajo con cadenas en JavaScript, desde la creación y visualización de cadenas literales usando comillas simples y dobles, la creación de plantillas literales, la concatenación, el escape y la asignación de valores de cadena a variables.
