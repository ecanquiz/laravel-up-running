# Cómo Escribir Comentarios en Javascript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-write-comments-in-javascript)
:::

## Introducción

En programación, nuestra primera consideración suele ser la máquina: cómo la computadora lee e interpreta el código que escribimos. Sin embargo, es igualmente importante considerar a las personas que leerán y trabajarán con el código. Ya sea que esté trabajando con un equipo o solo, deberá aprender a comentar y estructurar adecuadamente su código para lectores humanos.

Los comentarios son anotaciones en el código fuente de un programa que el intérprete ignora y, por lo tanto, no tienen ningún efecto en la salida real del código. Los comentarios pueden ser de gran ayuda para explicar la intención de lo que es o debería hacer su código.

Como desarrollador, puede resultar frustrante profundizar en un código escrito por otra persona que no fue comentado adecuadamente, y es muy fácil olvidar lo que significaba tu propio código cuando ya no estás inmerso en el contexto de un programa. Comentar su código desde el principio reforzará los buenos hábitos de programación a lo largo de su carrera para evitar estos problemas más adelante.

## Sintaxis del Comentario

Echemos un vistazo rápido a los dos tipos diferentes de sintaxis de comentarios de JavaScript.

**Single-line**: Los comentarios de una sola línea se escriben con dos barras diagonales (`//`).

```js
// This is a comment
```

JavaScript ignorará todos los caracteres que siguen inmediatamente a la sintaxis `//` hasta el final de la línea.

**Block**: Los comentarios de bloque, a veces denominados comentarios **mutli-line** (de varias líneas), se escriben con etiquetas de apertura (`/*`) y etiquetas de cierre (`*/`). Si conoce CSS, entonces ya está familiarizado con los comentarios a nivel de bloque.

```js
/* This is
a comment */
```

Se ignorará todo lo que se encuentre entre la etiqueta de apertura y cierre en el bloque de código anterior.

Tanto los comentarios de una sola línea como los de varias líneas se escriben encima del código que deben explicar, como se demuestra en este ejemplo _“Hello, World!”_:

`hello.js`
```js
// Print "Hello, World!" to the console
console.log("Hello, World!");
```

Al escribir comentarios, identarlos al mismo nivel que el código inmediatamente debajo de ellos:

`ocean.js`
```js
// Initialize a function
function alphabetizeOceans() {
	// Define oceans variable as a list of strings
	const oceans = ["Pacific", "Atlantic", "Indian", "Antarctic", "Arctic"];

	// Print alphabetized array to the console
	console.log(oceans.sort());
}
```

Tenga en cuenta que los comentarios son tan parte del código como el programa mismo. Los comentarios desactualizados pueden ser más perjudiciales que ningún comentario, así que recuerde mantener y actualizar los comentarios periódicamente junto con todo lo demás.

## Comentarios en Línea

Los comentarios de una sola línea se denominan **inline comments** (comentarios en línea) cuando aparecen al final de una línea de código.

```js
let x = 99;    // assign numerical value to x
let y = x + 2; // assign the sum of x + 2 to y
```

Los comentarios en línea se pueden utilizar para realizar anotaciones rápidas en fragmentos de contenido pequeños y específicos. Dado que el comentario sólo debe relacionarse con la línea exacta en la que está escrito, es el tipo de comentario más obvio.

Recuerde que no hay forma de finalizar un comentario de una sola línea en una línea, así que asegúrese de no colocar ningún código después de la sintaxis `//`, como se ve en el ejemplo siguiente.

`broken.js`
```js
for (let i = 0; i === 10; i++) // for loop that runs ten times {
	// Running this code results in a syntax error
}
```

Aunque los comentarios en línea pueden ser útiles, deben usarse con moderación: el código cubierto por una gran cantidad de comentarios en línea rápidamente se volverá confuso y, por lo tanto, difícil de leer.

## Comentarios de Bloque

Los comentarios a nivel de bloque, o comentarios de varias líneas, son anotaciones de formato largo que se utilizan para presentar y explicar una sección de código. A menudo, este tipo de comentarios se colocan en la parte superior de un archivo o antes de un bloque de código particularmente complejo.

`greet.js`
```js
/* Initialize and invoke a the greetUser function
to assign user's name to a constant and print out
a greeting. */

function greetUser() {
	const name = prompt("What is your name?");
	console.log("Hello ," + name + "! How are you?");
}

greetUser();
```
A veces también puedes ver una versión ligeramente modificada de la sintaxis del comentario del bloque, que comienza con `/**` e incluye asteriscos en todo el lado izquierdo del bloque de comentarios.

`sea.js`
```js
/**
 * Initialize constant with an array of strings.
 * Loop through each item in the array and print
 * it to the console.
 */

const seaCreatures = ["Shark", "Fish", "Octopus"];

for (const seaCreature of seaCreatures) {
  console.log(seaCreature);
}
```

A veces, este tipo de comentario también incluirá detalles sobre el archivo de programación, incluido el nombre, la versión y el autor del script.

Si es principiante en JavaScript, puede escribir todo lo que sea necesario para aprender y comprender el código que escribe. A medida que avance como desarrollador de JavaScript, buscará responder la intención o el _por qué_ detrás del código, en lugar del _cómo_ o el _qué_.

## Comentar el Código para Realizar Pruebas

Los comentarios también se pueden utilizar para impedir rápida y fácilmente la ejecución de código con fines de prueba y depuración. Esto se conoce como _“commenting out code”_ (código de comentario).

Si hay un error en algún código que haya escrito, comentar las secciones evitará que se ejecuten y puede resultar útil para identificar el origen del problema. También puede usarlo para alternar entre códigos y probar diferentes resultados.

`math.js`
```js
// Function to add two numbers
function addTwoNumbers(x, y) {
  let sum = x + y;
  return sum;
}

// Function to multiply two numbers
function multiplyTwoNumbers(x, y) {
  let product = x * y;
  return product;
}

/* In this example, we're commenting out the addTwoNumbers
function, therefore preventing it from executing. Only the
multiplyTwoNumbers function will run */

// addTwoNumbers(3, 5);
multiplyTwoNumbers(5, 9);
```

Se pueden utilizar tanto comentarios de una sola línea como comentarios de bloque para comentar el código, según el tamaño de la sección que se alterna.

:::tip Nota
Comentar el código solo debe realizarse con fines de prueba. No dejes fragmentos de código comentado en tu script final.
:::

Al resolver la lógica de un programa, comentar el código puede resultar útil para determinar dónde están los errores o evaluar las líneas de código que ofrecen la mayor utilidad.

## Conclusión

El código JavaScript es interpretado por la computadora, pero siempre será leído por otros programadores, incluido usted mismo en el futuro. Tomarse el tiempo para dejar anotaciones adecuadas en secciones complicadas de código generará beneficios en el futuro, ya que facilitará que usted y sus colaboradores comprendan la intención del código que ha escrito.
