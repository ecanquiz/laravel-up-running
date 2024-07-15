# Comprender Matrices en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript)
:::

## Introducción

Una **matriz** en JavaScript es un tipo de objeto global que se utiliza para almacenar datos. Las matrices constan de una colección o lista ordenada que contiene cero o más tipos de datos y utilizan índices numerados que comienzan desde `0` para acceder a elementos específicos.

Las matrices son muy útiles ya que almacenan múltiples valores en una sola variable, lo que puede condensar y organizar nuestro código, haciéndolo más legible y mantenible. Las matrices pueden contener cualquier [tipo de datos](./understanding-data-types.html), incluidos [números](./understanding-data-types.html#numbers), [cadenas](./understanding-data-types.html#strings) y [objetos](./understanding-data-types.html#objects).

Para demostrar cómo pueden resultar útiles las matrices, considere asignar los cinco océanos del mundo a sus propias variables.

📃`oceans.js`
```js
// Assign the five oceans to five variables
const ocean1 = "Pacific";
const ocean2 = "Atlantic";
const ocean3 = "Indian";
const ocean4 = "Arctic";
const ocean5 = "Antarctic";
```

Este método es muy detallado y rápidamente puede volverse difícil de mantener y seguir.

Usando matrices, podemos simplificar nuestros datos.

📃`oceans.js`
```js
let oceans = [
	"Pacific",
	"Atlantic",
	"Indian",
	"Arctic",
	"Antarctic",
];
```

En lugar de crear cinco variables separadas, ahora tenemos una variable que contiene los cinco elementos. Usamos corchetes - `[]` - para crear una matriz.

Para acceder a un elemento específico, agregue su índice a la variable.


```js
// Print out the first item of the oceans array
oceans[0];
```

```sh
Output
Pacific
```

En este tutorial, aprenderemos cómo crear matrices; cómo están indexados; cómo agregar, modificar, eliminar o acceder a elementos en una matriz; y cómo recorrer matrices.

## Crear una Matriz

Hay dos formas de crear una matriz en JavaScript:

- El literal de matriz, que utiliza corchetes.
- El constructor de la matriz, que utiliza la palabra clave `new`.

Demostremos cómo crear una matriz de especies de tiburones usando el literal de matriz, que se inicializa con `[]`.


📃`sharks.js`
```js
// Initialize array of shark species with array literal
let sharks = [
	"Hammerhead",
	"Great White",
	"Tiger",
];
```


Ahora aquí están los mismos datos creados con el constructor de matriz, que se inicializa con `new Array()`.


📃`sharks.js`
```js
// Initialize array of shark species with array constructor
let sharks = new Array(
	"Hammerhead",
	"Great White",
	"Tiger",
);
```


Ambos métodos crearán una matriz. Sin embargo, el método literal de matriz (corchetes) es mucho más común y preferido, ya que el método constructor `new Array()` puede tener inconsistencias y resultados inesperados. Es útil conocer este constructor de matriz en caso de que lo encuentre en el futuro.

Podemos imprimir una matriz completa, que se mostrará igual que nuestra entrada.

```js
// Print out the entire sharks array
sharks;
```

```sh
Output
[ 'Hammerhead', 'Great White', 'Tiger' ]
```

Las matrices se utilizan a menudo para agrupar listas de tipos de datos similares, pero técnicamente pueden contener cualquier valor o una combinación de valores, incluidas otras matrices.


```js
// Initialize array of mixed datatypes
let mixedData = [
	"String",
	null,
	7,
	[
		"another",
		"array",
	],
];
```

Después de crear una matriz, podemos manipularla de muchas maneras, pero primero debemos entender cómo se indexan las matrices.

:::warning Nota
Es posible que vea el último elemento de una matriz con o sin una coma final. Esto se conoce como [coma final](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas). Es común verlos omitidos, pero en general se prefiere incluirlos en su código, ya que esto hace que las diferencias de control de versiones sean más claras y facilita agregar y eliminar elementos sin errores. Tenga en cuenta que las comas finales no están permitidas en [archivos JSON](https://www.digitalocean.com/community/tutorials/an-introduction-to-json).
:::

## Matrices de Indexación

Si ha aprendido a [indexar y manipular cadenas en JavaScript](/how-to-index-split-and-manipulate-strings-in-javascript.html), es posible que ya esté familiarizado con el concepto de indexación de matrices, ya que una cadena es similar a una matriz.

Las matrices no tienen pares nombre/valor. En cambio, están indexados con valores enteros que comienzan con `0`. Aquí hay una matriz de ejemplo, asignada a `seaCreatures`.

📃`seacreatures.js`


```js
let seaCreatures = [
  "octopus",
  "squid",
  "shark",
  "seahorse",
  "starfish",
];
```

A continuación se muestra un desglose de cómo se indexa cada elemento de la matriz `seaCreatures`.

|octopus|squid|shark|seahorse|starfish|
|-|-|-|-|-|
|0|1|2|3|4|

El primer elemento de la matriz es `octopus`, que está indexado en `0`. El último elemento es `starfish`, que está indexada en `4`. El conteo comienza con `0` en los índices, lo que va en contra de nuestra intuición natural de comenzar a contar en 1, por lo que se debe tener especial cuidado. Hay que tener cuidado de recordar esto hasta que se vuelva natural.

Podemos averiguar cuántos elementos hay en una matriz con la propiedad `length`.

```js
seaCreatures.length;
```

```
Output
5
```

Aunque los índices de `seaCreatures` constan de `0` a `4`, la propiedad `length` generará la cantidad real de elementos en la matriz, comenzando con 1.

Si queremos averiguar el número de índice de un elemento específico en una matriz, como el `seahorse`, podemos usar el método `indexOf()`.


```js
seaCreatures.indexOf("seahorse");
```

```sh
Output
3
```

Si no se encuentra un número de índice, como por ejemplo un valor que no existe, la consola devolverá `-1`.


```js
seaCreatures.indexOf("cuttlefish");
```

```sh
Output
-1
```

Con números de índice que corresponden a elementos dentro de una matriz, podemos acceder a cada elemento de forma discreta para trabajar con esos elementos.

## Accessing Items in an Array
## Acceder a Elementos en una Matriz

Se accede a un elemento en una matriz de JavaScript haciendo referencia al número de índice del elemento entre corchetes.


```js
seaCreatures[1];
```

```sh
Output
squid
```

Sabemos que `0` siempre generará el primer elemento de una matriz. También podemos encontrar el último elemento de una matriz realizando una operación en la propiedad `length` y aplicándola como el nuevo número de índice.


```js
const lastIndex = seaCreatures.length - 1;

seaCreatures[lastIndex];
```

```sh
Output
starfish
```

Intentar acceder a un elemento que no existe devolverá un valor `undefined`.


```js
seaCreatures[10];
```

```sh
Output
undefined
```

Para acceder a elementos en una matriz anidada, debe agregar otro número de índice que corresponda a la matriz interna.


```js
let nestedArray = [
  [
    "salmon",
    "halibut"
  ],
  [
    "coral",
    "reef"
  ]
];

nestedArray[1][0];
```

```sh
Output
coral
```

En el ejemplo anterior, accedemos a la matriz en la posición `1` de la variable `nestedArray`, luego al elemento en la posición `0` en la matriz interna.


## Agregar un Elemento a una Matriz

En nuestra variable `seaCreatures` teníamos cinco elementos, que consistían en índices del `0` al `4`. Si queremos agregar un nuevo elemento a la matriz, podemos asignar un valor al siguiente índice.


```js
seaCreatures[5] = "whale";

seaCreatures;
```

```sh
Output
[
  'octopus',
  'squid',
  'shark',
  'seahorse',
  'starfish',
  'whale'
]
```

Si agregamos un elemento y accidentalmente omitimos un índice, se creará un elemento indefinido en la matriz.


```js
seaCreatures[7] = "pufferfish";

seaCreatures;
```

```sh
Output
[
  'octopus',
  'squid',
  'shark',
  'seahorse',
  'starfish',
  'whale',
  ,
  'pufferfish'
]
```

Intentar acceder al elemento de matriz adicional devolverá un valor `undefined`.


```js
seaCreatures[6]
```

```sh
Output
undefined
```

Problemas como ese se pueden evitar utilizando el método `push()`, que agrega un elemento al final de una matriz.


```js
// Append lobster to the end of the seaCreatures array
seaCreatures.push("lobster");

seaCreatures;
```

```sh
Output
[
  'octopus',
  'squid',
  'shark',
  'seahorse',
  'starfish',
  ,
  'whale',
  'pufferfish',
  'lobster'
]
```

En el otro extremo del espectro, el método `unshift()` agregará un elemento al comienzo de una matriz.


```js
// Append dragonfish to the beginning of the seaCreatures array
seaCreatures.unshift("dragonfish");

seaCreatures;
```

```sh
Output
[
  'dragonfish',
  'octopus',
  'squid',
  'shark',
  'seahorse',
  'starfish',
  'whale',
  ,
  'pufferfish',
  'lobster'
]
```

Entre `push()` y `unshift()` podrá agregar elementos al principio y al final de una matriz.


## Eliminar un Elemento de una Matriz

Cuando queremos eliminar un elemento específico de una matriz, usamos el método `splice()`. En la matriz `seaCreatures`, accidentalmente creamos un elemento de matriz indefinido anteriormente, así que eliminémoslo ahora.


```js
seaCreatures.splice(7, 1);

seaCreatures;
```


```sh
Output
[
  'dragonfish',
  'octopus',
  'squid',
  'shark',
  'seahorse',
  'starfish',
  'whale',
  'pufferfish',
  'lobster'
]
```

En el método `splice()`, el primer parámetro representa el número de índice que se eliminará (en este caso, `7`) y el segundo parámetro es cuántos elementos se deben eliminar. Ponemos `1`, lo que significa que solo se eliminará un elemento.

El método `splice()` cambiará la variable original. Si desea que la variable original permanezca sin cambios, use `slice()` y asigne el resultado a una nueva variable. Aquí asignaremos dos variables, una que usa `slice()` para almacenar la matriz `seaCreatures` desde el primer elemento hasta la `whale`, y una segunda variable para almacenar los elementos `pufferfish` y `lobster`. Para unir las dos matrices, usaremos el método `concat()` para devolver la nueva matriz.


```js
let firstArray = seaCreatures.slice(0, 7);
let secondArray = seaCreatures.slice(8, 10); 

firstArray.concat(secondArray);

```

```sh
Output
[
  'dragonfish',
  'octopus',
  'squid',
  'shark',
  'seahorse',
  'starfish',
  'whale',
  'pufferfish',
  'lobster'
]
```

Observe que al llamar a la variable `seaCreatures`, los elementos de la matriz permanecen sin cambios.


```js
seaCreatures;
```

```sh
Output
[
  'dragonfish',
  'octopus',
  'squid',
  'shark',
  'seahorse',
  'starfish',
  'whale',
  'pufferfish',
  'lobster'
]
```

El método `pop()` eliminará el último elemento de una matriz.


```js
// Remove the last item from the seaCreatures array
seaCreatures.pop();

seaCreatures;
```

```sh
Output
[
  'dragonfish',
  'octopus',
  'squid',
  'shark',
  'seahorse',
  'starfish',
  'whale',
  'pufferfish'
]
```

`lobster` se ha eliminado como último elemento de la matriz. Para eliminar el primer elemento de la matriz, usaremos el método `shift()`.


```js
// Remove the first item from the seaCreatures array
seaCreatures.shift();

seaCreatures;
```

```sh
Output
[
  'octopus',
  'squid',
  'shark',
  'seahorse',
  'starfish',
  'whale',
  'pufferfish'
]
```

Al usar `pop()` y `shift()`, podemos eliminar elementos del principio y del final de las matrices. Se prefiere usar `pop()` siempre que sea posible, ya que el resto de los elementos de la matriz conservan sus números de índice originales.


## Modificar Elementos en Matrices

Podemos sobrescribir cualquier valor en una matriz asignando un nuevo valor usando el operador de asignación, tal como lo haríamos con una variable normal.


```js
// Assign manatee to the first item in the seaCreatures array
seaCreatures[0] = "manatee";

seaCreatures;
```

```sh
Output
[
  'manatee',
  'squid',
  'shark',
  'seahorse',
  'starfish',
  'whale',
  'pufferfish'
]
```

Otra forma de modificar un valor es utilizar el método `splice()` con un nuevo parámetro. Si quisiéramos cambiar el valor de `seahorse`, que es el elemento en el índice `3`, podríamos eliminarlo y agregar un nuevo elemento en su lugar.


```js
// Replace seahorse with sea lion using splice method
seaCreatures.splice(3, 1, "sea lion");

seaCreatures();
```

```sh
Output
[
  'manatee',
  'squid',
  'shark',
  'sea lion',
  'starfish',
  'whale',
  'pufferfish'
]
```

En el ejemplo anterior, eliminamos `seahorse` de la matriz e insertamos un nuevo valor en el índice `3`.


## Bucle a Través de una Matriz


Podemos recorrer toda la matriz con la palabra clave `for`, aprovechando la propiedad de `length`. En este ejemplo, podemos crear una matriz de `shellfish` e imprimir cada número de índice y cada valor en la consola.


```js
// Create an array of shellfish species
let shellfish = [
  "oyster",
  "shrimp",
  "clam",
  "mussel"
];

// Loop through the length of the array
for (let i = 0; i < shellfish.length; i++) {
  console.log(i, shellfish[i]);
}
```

```sh
Output
0 'oyster'
1 'shrimp'
2 'clam'
3 'mussel'
```

También podemos usar el bucle `for...of`, una característica más nueva de JavaScript.


```js
// Create an array of aquatic mammals
let mammals = [
  "dolphin",
  "whale",
  "manatee",
];

// Loop through each mammal
for (let mammal of mammals) {
  console.log(mammal);
}
```


```sh
Output
dolphin
whale
manatee
```

El bucle `for...of` no recupera el número de índice de los elementos de la matriz, pero generalmente es una forma más sencilla y concisa de recorrer una matriz.

El uso de bucles es extremadamente útil para imprimir el valor completo de una matriz, como cuando se muestran los elementos de una base de datos en un sitio web.


## Conclusión

Los matrices son una parte extremadamente versátil y fundamental de la programación en JavaScript. En este tutorial, aprendimos cómo crear una matriz, cómo se indexan las matrices y algunas de las tareas más comunes al trabajar con matrices, como crear, eliminar y modificar elementos. También aprendimos dos métodos para recorrer matrices, que se utilizan como método común para mostrar datos.

Puede leer más sobre otros tipos de datos en JavaScript leyendo nuestro tutorial "[Comprender Tipos de Datos en JavaScript](./understanding-data-types.html)".
