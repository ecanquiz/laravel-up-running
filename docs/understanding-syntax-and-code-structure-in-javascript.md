# Comprender Sintaxis y Estructura del Código en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/understanding-syntax-and-code-structure-in-javascript)
:::

## Introducción

Antes de aprender a escribir en un idioma hablado, primero debes aprender las reglas gramaticales. A continuación se muestran algunos ejemplos de reglas que puede encontrar en el idioma inglés:

- Una oración comienza con una letra mayúscula.
- Una oración termina en un punto.
- Un nuevo párrafo tiene sangría.
- El diálogo hablado se coloca entre comillas dobles.

De manera similar, todos los lenguajes de programación deben cumplir reglas específicas para poder funcionar. Este conjunto de reglas que determinan la correcta estructura de los lenguajes de programación se conoce como sintaxis. Muchos lenguajes de programación constan en gran medida de conceptos similares con variaciones en la sintaxis.

En este tutorial, repasaremos muchas de las reglas y convenciones de la sintaxis y la estructura del código de JavaScript.

## Funcionalidad y Legibilidad

La funcionalidad y la legibilidad son dos razones importantes para centrarse en la sintaxis al empezar a trabajar con JavaScript.

Existen algunas reglas de sintaxis que son obligatorias para la funcionalidad de JavaScript. Si no se siguen, la consola arrojará un error y el script dejará de ejecutarse.

Considere un error de sintaxis en el mensaje “¡Hola, mundo!” programa:

`broken.js`
```js
// Example of a broken JavaScript program
console.log("Hello, World!"
```

A este ejemplo de código le falta el paréntesis de cierre y, en lugar de imprimir el esperado "¡Hola, mundo!" a la consola, aparecerá el siguiente error:

```sh
Output
Uncaught SyntaxError: missing ) after argument list
```

El faltante `)` deben agregarse antes de que el script continúe ejecutándose. Este es un ejemplo de cómo un error en la sintaxis de JavaScript puede dañar el script, ya que se debe seguir la sintaxis correcta para que se ejecute el código.

Algunos aspectos de la sintaxis y el formato de JavaScript se basan en diferentes escuelas de pensamiento. Es decir, existen reglas o elecciones de estilo que no son obligatorias y no generarán errores cuando se ejecute el código. Sin embargo, existen muchas convenciones comunes que es sensato seguir, ya que los desarrolladores entre proyectos y bases de código estarán más familiarizados con el estilo. La adhesión a convenciones comunes conduce a una mejor legibilidad.

Considere los siguientes tres ejemplos de asignación de variables.

```js
const greeting="Hello";         // no whitespace between variable & string
const greeting =       "Hello"; // excessive whitespace after assignment
const greeting = "Hello";       // single whitespace between variable & string
```

Aunque los tres ejemplos anteriores funcionarán exactamente igual en el resultado, la tercera opción de `greeting = "Hello"` es, con diferencia, la forma más utilizada y la más legible de escribir el código, especialmente cuando se considera dentro del contexto de un programa más amplio.

Es importante mantener coherente el estilo de todo su proyecto de codificación. De una organización a otra te encontrarás con diferentes pautas a seguir, por lo que también debes ser flexible.

Repasaremos algunos ejemplos de código a continuación para que se familiarice con la sintaxis y la estructura del código JavaScript y consulte este artículo en caso de duda.

## Espacio en blanco

Los espacios en blanco en JavaScript constan de espacios, tabulaciones y nuevas líneas (presionando `ENTER` en el teclado). Como se demostró anteriormente, JavaScript ignora los espacios en blanco excesivos fuera de una cadena y los espacios entre operadores y otros símbolos. Esto significa que los siguientes tres ejemplos de asignación de variables tendrán exactamente el mismo resultado calculado:

```js
const userLocation      =    "New York City, "     +  "NY";
const userLocation="New York City, "+"NY";
const userLocation = "New York City, " + "NY";
```

`userLocation` representará  “New York City, NY” sin importar cuál de estos estilos esté escrito en el script, ni hará ninguna diferencia para JavaScript si el espacio en blanco está escrito con tabulaciones o espacios.

Una buena regla general para poder seguir las convenciones de espacios en blanco más comunes es seguir las mismas reglas a las que está acostumbrado en matemáticas y gramática del lenguaje.

Por ejemplo, `let x = 5 * y` es más legible que `let x=5*y`.

Una excepción notable a este estilo que puede ver es durante la asignación de múltiples variables. Tenga en cuenta la posición de `=` en el siguiente ejemplo:

```js
const companyName         = "DigitalOcean";
const companyHeadquarters = "New York City";
const companyHandle       = "digitalocean";
```

Todos los operadores de asignación (`=`) están alineados, con el espacio en blanco después de la variable. Este tipo de estructura organizativa no se utiliza en todos los códigos base, pero se puede utilizar para mejorar la legibilidad.

JavaScript también ignora el exceso de líneas nuevas. Generalmente, se insertará una nueva línea adicional encima de un comentario y después de un bloque de código.

## Paréntesis

Para palabras clave como `if`, `switch` y `for`, generalmente se agregan espacios antes y después de los paréntesis. Observe los siguientes ejemplos de comparación y bucles.

```js
// An example of if statement syntax
if () { }

// Check math equation and print a string to the console
if (4 < 5) {
	console.log("4 is less than 5.");
}

// An example of for loop syntax
for () { }

// Iterate 10 times, printing out each iteration number to the console
for (let i = 0; i <= 10; i++) {
	console.log(i);
}
```

Como se demostró, la instrucción `if` y el bucle `for` tienen espacios en blanco a cada lado de los paréntesis (pero no dentro de los paréntesis).

Cuando el código pertenece a una función, método o clase, los paréntesis estarán tocando el nombre respectivo.

```js
// An example function
function functionName() {}

// Initialize a function to calculate the volume of a cube
function cube(number) {
	return Math.pow(number, 3);
}

// Invoke the function
cube(5);
```

En el ejemplo anterior, `cube()` es una función y el par de paréntesis `()` contendrá los parámetros o argumentos. En este caso, los parámetros son el `number` o `5`, respectivamente. Aunque el `cubo ()` con un espacio adicional es válido porque el código se ejecutará como se espera, casi nunca se ve. Mantenerlos juntos ayuda a asociar fácilmente el nombre de la función con el par de paréntesis y cualquier argumento pasado asociado.

## Punto y coma

Los programas JavaScript constan de una serie de instrucciones conocidas como declaraciones, del mismo modo que los párrafos escritos constan de una serie de oraciones. Si bien una oración terminará con un punto, una declaración de JavaScript a menudo termina en un punto y coma (`;`).

```js
// A single JavaScript statement
const now = new Date();
```

Si dos o más declaraciones están una al lado de la otra, es obligatorio separarlas con punto y coma.

```js
// Get the current timestamp and print it to the console
const now = new Date(); console.log(now);
```

Si las declaraciones están separadas por una nueva línea, el punto y coma es opcional.

```js
// Two statements separated by newlines
const now = new Date()
console.log(now)
```

Una convención común y segura es separar las declaraciones con un punto y coma independientemente de las nuevas líneas. Generalmente se considera una buena práctica incluirlos para reducir la probabilidad de errores.

```js
// Two statements separated by newlines and semicolons
const now = new Date();
console.log(now);
```

También se requieren puntos y coma entre la inicialización, la condición y el incremento o decremento de un bucle `for`.

```js
for (initialization; condition; increment) {
	// run the loop
}
```

Los puntos y coma _no_ se incluyen después de ningún tipo de declaración de bloque, como `if`, `for`, `do`, `while`, `class`, `switch` y `function`. Estas declaraciones de bloque están contenidas entre llaves `{}`. Tenga en cuenta los ejemplos siguientes.

```js
// Initialize a function to calculate the area of a square
function square(number) {
	return Math.pow(number, 2);
}

// Calculate the area of a number greater than 0
if (number > 0) {
	square(number);
}
```

Tenga cuidado, ya que no todo el código entre llaves terminará sin punto y coma. Los objetos están entre llaves y deben terminar en punto y coma.

```js
// An example object
const objectName = {};

// Initialize triangle object
const triangle = {
	type: "right",
	angle: 90,
	sides: 3,
};
```

Es una práctica ampliamente aceptada incluir punto y coma después de cada declaración de JavaScript, excepto las declaraciones de bloque, que terminan entre llaves.

## Identación

Técnicamente, un programa JavaScript completo se puede escribir en una sola línea. Sin embargo, esto rápidamente resultaría muy difícil de leer y mantener. En su lugar, utilizamos nuevas líneas e identación.

A continuación se muestra un ejemplo de una declaración condicional `if`/`else`, escrita en una línea o con nuevas líneas e identación.

```js
// Conditional statement written on one line
if (x === 1) { /* execute code if true */ } else { /* execute code if false */ }

// Conditional statement with indentation
if (x === 1) {
	// execute code if true
} else {
	// execute code if false
}
```

Observe que cualquier código incluido dentro de un bloque tiene identación. La identación se puede hacer con dos espacios, cuatro espacios o presionando el carácter de tabulación. El uso de tabulaciones o espacios depende de sus preferencias personales (para un proyecto en solitario) o de las pautas de su organización (para un proyecto colaborativo).

Incluir la llave de apertura al final de la primera línea, como en el ejemplo anterior, es la forma convencional de estructurar objetos y declaraciones de bloque de JavaScript. Otra forma en que puede ver las declaraciones en bloque escritas es con las llaves en sus propias líneas.

```js
// Conditional statement with braces on newlines
if (x === 1)
{
	// execute code if true
}
else
{
	// execute code if false
}
```

Este estilo es mucho menos común en JavaScript que en otros lenguajes, pero no es inaudito.

Cualquier declaración de bloque anidado tendrá una identación adicional.

```js
// Initialize a function
function isEqualToOne(x) {
	// Check if x is equal to one
	if (x === 1) {
		// on success, return true
		return true;
	} else {
	  return false;
	}
}
```

La identación adecuada de su código es imperativa para mantener la legibilidad y mitigar la confusión. Una excepción a esta regla a tener en cuenta es que a las bibliotecas comprimidas se les eliminarán los caracteres innecesarios, por lo que se reducirán los tamaños de los archivos para permitir tiempos de carga de página más rápidos (como en `jquery.min.js` y `d3.min.js`).

## Identificadores

El nombre de una variable, función o propiedad se conoce como **identificador** en JavaScript. Los identificadores constan de letras y números, pero no pueden incluir ningún símbolo fuera de `$` y `_`, y no pueden comenzar con un número.

## Casos Sensitivos

Estos nombres son caso sensitivo (distinguen entre mayúsculas y minúsculas). Los dos ejemplos siguientes, `myVariable` y `myvariable` se referirían a dos variables distintas.

```js
var myVariable = 1;
var myvariable = 2;
```

La convención de los nombres de JavaScript es que están escritos en _camelCase_, lo que significa que la primera palabra está en minúscula, pero cada palabra siguiente comienza con una letra mayúscula. También puede ver variables globales o constantes escritas en mayúsculas, separadas por guiones bajos.

```js
const INSURANCE_RATE = 0.4;
```

La excepción a esta regla son los nombres de clases, que a menudo se escriben con cada palabra comenzando con una letra mayúscula (_PascalCase_).

```js
// Initialize a class
class ExampleClass {
	constructor() { }
}
```

## Palabras Clave Reservadas

Los identificadores tampoco deben consistir en palabras clave reservadas. Las palabras clave son palabras en el lenguaje JavaScript que tienen una funcionalidad incorporada, como `var`, `if`, `for` y `this`.

Por ejemplo, no podrá asignar un valor a una variable denominada `var`.

```js
var var = "Some value";
```

Dado que JavaScript entiende que `var` es una palabra clave, esto generará un error de sintaxis:

`Ouput`
```sh
SyntaxError: Unexpected token (1:4)
```

Para obtener una referencia completa, consulte esta [lista de palabras clave reservadas (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Reserved_keywords_as_of_ECMAScript_2015)

## Conclusión

Este artículo proporcionó una descripción general de la sintaxis básica y la estructura del código de JavaScript. La sintaxis es importante tanto para la ejecución adecuada del programa como para la legibilidad y el mantenimiento tanto para usted como para el colaborador de su código.

En este artículo revisamos muchas convenciones comunes de sintaxis y estilo de JavaScript, pero al final del día, lo más importante que debe recordar es ser flexible y coherente con su equipo u organización.




