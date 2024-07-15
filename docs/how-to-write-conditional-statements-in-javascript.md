# Cómo Escribir Declaraciones Condicionales en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-write-conditional-statements-in-javascript)
:::

## Introducción

En programación, habrá muchas ocasiones en las que querrás ejecutar diferentes bloques de código dependiendo de la entrada del usuario u otros factores.

Por ejemplo, es posible que desee enviar un formulario si cada campo se completa correctamente, pero es posible que desee evitar que se envíe ese formulario si faltan algunos campos obligatorios. Para lograr tareas como estas contamos con **declaraciones condicionales**, que son una parte integral de todos los lenguajes de programación.

Las declaraciones condicionales ejecutan una acción específica basada en los resultados de un desenlace de [`true` o `false`](./understanding-data-types.html#booleans).

Algunos ejemplos de declaraciones condicionales de JavaScript que puede ver incluyen:

- Verificar la ubicación de un usuario y muestrar el idioma correcto según el país
- Enviar un formulario a hacer _submit_ o mostrar advertencias junto a los campos obligatorios que faltan
- Abrir un menú desplegable en un evento de clic o cerrar un menú desplegable si ya está abierto
- Mostrar el sitio web de un proveedor de alcohol si el usuario tiene más de la edad legal para beber
- Mostrar el formulario de reserva de un hotel, pero no si el hotel está reservado

Las declaraciones condicionales son parte de la lógica, la toma de decisiones o el control de flujo de un programa de computadora. Puedes comparar una declaración condicional con un libro "[Elige Tu Propia Aventura](https://en.wikipedia.org/wiki/Choose_Your_Own_Adventure)" o con un diagrama de flujo.

En este tutorial, repasaremos las declaraciones condicionales, incluidas las palabras clave `if`, `else` y `else if`. También cubriremos el operador ternario.

## Declaración `if`

La más fundamental de las declaraciones condicionales es la declaración `if`. Una declaración `if` evaluará si una declaración es verdadera o falsa y solo se ejecutará si la declaración devuelve `true`. El bloque de código se ignorará en el caso de un resultado `false` y el programa pasará a la siguiente sección.

Una declaración `if` se escribe con la palabra clave `if`, seguida de una condición entre paréntesis, con el código que se ejecutará entre llaves. En resumen, se puede escribir como `if () {}`.


```js
if (condition) {
	// code that will execute if condition is true
}
```

El contenido de una declaración `if` tiene sangría y las llaves que contienen el bloque de código a ejecutar no terminan en punto y coma, como un bloque de funciones.

Como ejemplo, consideremos una aplicación de compras. Digamos que, para la funcionalidad de esta aplicación, un usuario que ha depositado una cierta cantidad de fondos en su cuenta le gustaría comprar un artículo en la tienda.


📃`shop.js`
```js
// Set balance and price of item
const balance = 500;
const jeans = 40;

// Check if there are enough funds to purchase item
if (jeans <= balance) {
  console.log("You have enough money to purchase the item!");
}
```

```sh
Output
You have enough money to purchase the item!
```

Tenemos un saldo balance de `500` y queremos comprar un par de jeans por `40`. Usando el operador menor o igual, podemos verificar si el precio de los jeans es menor o igual a la cantidad de fondos que tenemos. Dado que `jeans <= balance` se evalúa como `true`, la condición pasará y se ejecutará el bloque de código.

En un nuevo ejemplo, crearemos un nuevo artículo de tienda que cueste más que el saldo balance.


📃`shop.js`
```js
// Set balance and price of item
const balance = 500;
const phone = 600;

// Check if there is enough funds to purchase item
if (phone <= balance) {
	console.log("You have enough money to purchase the item!");
}
```

Este ejemplo no tendrá resultados, ya que `phone <= balance` se evalúa como `false`. El bloque de código simplemente será ignorado y el programa pasará a la siguiente línea.

## Declaración `Else` 

Con las declaraciones `if`, solo ejecutamos código cuando una declaración se evalúa como `true`, pero a menudo querremos que suceda algo más si la condición falla.

Por ejemplo, es posible que queramos mostrar un mensaje que le indique al usuario qué campos se completaron correctamente si un formulario no se envió correctamente. En este caso, utilizaríamos la instrucción `else`, que es el código que se ejecutará si la condición original no se cumple.

La declaración `else` se escribe después de la declaración `if` y no tiene ninguna condición entre paréntesis. Aquí está la sintaxis de una declaración básica `if...else`.


```js
if (condition) {
	// code that will execute if condition is true
} else {
	// code that will execute if condition is false
}
```

Usando el mismo ejemplo anterior, podemos agregar un mensaje para mostrar si los fondos en la cuenta son demasiado bajos.

📃`shop.js`
```js
// Set balance and price of item
const balance = 500;
const phone = 600;

// Check if there is enough funds to purchase item
if (phone <= balance) {
	console.log("You have enough money to purchase the item!");
} else {
	console.log("You do not have enough money in your account to purchase this item.");
}
```


```sh
Output
You do not have enough money in your account to purchase this item.
```

Dado que la condición `if` no tuvo éxito, el código pasa a lo que hay en la declaración `else`.

Esto puede resultar muy útil para mostrar advertencias o permitirle al usuario saber qué acciones tomar para seguir adelante. Por lo general, se requerirá una acción tanto en caso de éxito como de fracaso, por lo que `if...else` es más común que una declaración `if` en solitario.




## Declaración `Else if`

Con `if` y `else` podemos ejecutar bloques de código dependiendo de si una condición es `true` o `false`. Sin embargo, a veces podemos tener múltiples condiciones y resultados posibles y necesitar más de dos opciones. Una forma de hacerlo es con la declaración `else if`, que puede evaluar más de dos resultados posibles.

A continuación se muestra un ejemplo básico de un bloque de código que contiene una declaración `if`, varias declaraciones `else if` y una declaración `else` en caso de que ninguna de las condiciones se evalúe como `true`.


```js
if (condition a) {
	// code that will execute if condition a is true
} else if (condition b) {
	// code that will execute if condition b is true
} else if (condition c) {
	// code that will execute if condition c is true
} else {
	// code that will execute if all above conditions are false
}
```


JavaScript intentará ejecutar todas las declaraciones en orden y, si ninguna de ellas tiene éxito, utilizará de forma predeterminada el bloque `else`.

Puede tener tantas declaraciones como sea necesario. En el caso de muchas otras declaraciones `if`, podría preferirse la [declaración `switch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) para facilitar la lectura.

Como ejemplo de varias declaraciones `else if`, podemos crear una aplicación de calificación que generará una calificación con letras basada en una puntuación de 100.

Los requisitos de esta aplicación son los siguientes:

- Calificación de 90 y superior es una A
- Calificación de 80 a 89 es una B
- Calificación de 70 a 79 es una C
- Calificación de 60 a 69 es una D
- Calificación de 59 o menos es una F

A continuación, crearemos un conjunto simple de declaraciones `if`, `else` y `else if`, y las probaremos con una calificación determinada.


📃`grades.js`
```js
// Set the current grade of the student
let grade = 87;

// Check if grade is an A, B, C, D, or F
if (grade >= 90) {
  console.log("A");
} else if (grade >= 80) {
  console.log("B");
} else if (grade >= 70) {
  console.log("C");
} else if (grade >= 60) {
  console.log("D");
} else {
  console.log("F");
}
```

```sh
Output
B
```

En nuestro ejemplo, primero comprobamos la puntuación más alta, que será mayor o igual a `90`. Después de eso, las declaraciones `else if` comprobarán si hay más de `80`, `70` y `60` hasta llegar al valor predeterminado `els`e de una calificación reprobatoria. .

Aunque nuestro valor de calificación de `87` también es válido técnicamente para `C`, `D` y `F`, las afirmaciones se detendrán en el primero que tenga éxito. Por lo tanto, obtenemos una salida de `B`, que es la primera coincidencia.

## Operador Ternario

El **operador ternario**, también conocido como operador condicional, se utiliza como abreviatura de una declaración `if...else`.

Un operador ternario se escribe con la sintaxis de un signo de interrogación (`?`) seguido de dos puntos (`:`), como se muestra a continuación.


```js
(condition) ? expression on true : expression on false
```

En la declaración anterior, la condición se escribe primero, seguida de `?`. La primera expresión se ejecutará en caso de `true` y la segunda expresión se ejecutará en caso de `false`. Es muy similar a una declaración `if...else`, con una sintaxis más compacta.

En este ejemplo, crearemos un programa que verifique si un usuario tiene `21` años o más. Si es así, imprimirá `"You may enter."` en la consola. Si no es así, imprimirá `"You may not enter."` en la consola.


📃`age.js`
```js
// Set age of user
let age = 20;

// Place result of ternary operation in a variable
const oldEnough = (age >= 21) ? "You may enter." : "You may not enter.";

// Print output
oldEnough;
```


```sh
Output
'You may not enter.'
```


Dado que la `age` del usuario era menor de `21` años, el mensaje fallido se envió a la consola. El equivalente `if...else` a esto sería `"You may enter."` en la declaración `if` y `"You may not enter."` en la declaración `else`.


## Conclusión

Las declaraciones condicionales nos proporcionan control de flujo para determinar el resultado de nuestros programas. Son uno de los pilares fundamentales de la programación y se pueden encontrar en prácticamente todos los lenguajes de programación.

En este artículo, aprendimos cómo usar las palabras clave `if`, `else` y `else if`, y cubrimos el anidamiento de declaraciones y el uso del operador ternario.



