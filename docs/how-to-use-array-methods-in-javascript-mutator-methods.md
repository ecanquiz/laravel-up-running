# Cómo Utilizar Métodos de Matriz en JavaScript: Métodos Mutadores

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-mutator-methods)
:::


## Introducción

[Las matrices](./understanding-data-types.html#arrays) en JavaScript constan de una lista de elementos. JavaScript tiene muchos métodos integrados útiles para trabajar con matrices. Los métodos que modifican la matriz original se conocen como métodos mutadores y los métodos que devuelven un nuevo valor o representación se conocen como [métodos de **acceso**](./how-to-use-array-methods-in-javascript-accessor-methods.html). En este tutorial, nos centraremos en los métodos mutadores.

Para aprovechar al máximo este tutorial, debe estar familiarizado con la creación, indexación, modificación y bucle de matrices, lo cual puede revisar en el tutorial [Comprender Matrices en JavaScript](./understanding-arrays-in-javascript.html).



Las matrices son similares a las [cadenas](./how-to-index-split-and-manipulate-strings-in-javascript.html), en el sentido de que ambas constan de una secuencia de elementos a los que se puede acceder mediante un número de índice. Sin embargo, es importante recordar que las cadenas son un tipo de datos inmutables, lo que significa que no se pueden cambiar. Las matrices, por otro lado, son mutables, lo que significa que muchos métodos de matriz afectarán a la matriz original, no a una copia de la matriz.

:::warning Nota:
Los métodos de matrices se escriben correctamente como `Array.prototype.method()`, ya que `Array.prototype` se refiere al objeto `Array` en sí. Para simplificar, simplemente listaremos el nombre como `method()`.
:::


## isArray()

Antes de entrar en los métodos mutadores, veamos el método `isArray()` para probar si los objetos son matrices. Este es un método [Boolean](./understanding-data-types.html#booleans) que devuelve `true` si el valor de una variable es igual a una matriz. Si el objeto no es una matriz, este método devuelve `false`.


```js
let fish = [ "piranha", "barracuda", "koi", "eel" ];

// Test if fish variable is an array
Array.isArray(fish);
```

```sh
Output
true
```

El método `isArray()` es útil porque el operador `typeof` que normalmente usaríamos para probar devuelve `object` cuando se usa con matrices y, a veces, es necesario conocer la distinción entre un objeto y un objeto `Array`.

Tenga en cuenta que `isArray()` se escribe de manera diferente a la mayoría de los métodos de matriz, y la variable de matriz se proporciona como argumento del método.

Ahora que sabemos cómo verificar que un objeto sea una matriz, pasemos a los métodos mutadores.

## pop()

El primer método mutador que veremos es el método `pop()`, que elimina el último elemento del final de una matriz.

Comenzaremos con nuestra matriz `fish`.


```js
let fish = [ "piranha", "barracuda", "koi", "eel" ];
```

Inicialicemos el método `pop()` para eliminar el último elemento. En este caso, será la cadena literal `"eel"`.


```js
// Use pop method to remove an item from the end of an array
fish.pop();
```

Llamaremos a nuestra matriz para asegurarnos de que se devuelva sin el último elemento:


```js
fish;
```

```sh
Output
[ 'piranha', 'barracuda', 'koi' ]
```

Hemos eliminado con éxito la `"eel"` de la matriz `fish`. El método `pop()` no toma parámetros adicionales.


## shift()

Otro método mutador, el método `shift()` elimina el primer elemento del principio de una matriz.


```js
let fish = [ "piranha", "barracuda", "koi", "eel" ];
```


Usaremos `shift()` para eliminar `"piranha"` del índice `0` y desplazar el resto de los elementos hacia abajo en un número de índice.


```js
// Use shift method to remove an item from the beginning of an array
fish.shift();

fish;
```

```sh
Output
[ 'barracuda', 'koi', 'eel' ]
```

En este ejemplo, se eliminó `"piranha"` y cada elemento se redujo un número de índice. Por esta razón, generalmente se prefiere utilizar el método `pop()` siempre que sea posible, ya que los otros elementos de la matriz mantendrán sus posiciones de índice.

## push()

El método mutador `push()` agrega uno o más elementos nuevos al final de una matriz.


```js
let fish = [ "piranha", "barracuda", "koi", "eel" ];
```

Para agregar un elemento al final, escribimos el nuevo elemento como parámetro de la función.


```js
// Use push method to add an item to the end of an array
fish.push("swordfish");

fish;
```

```sh
Output
[ 'piranha', 'barracuda', 'koi', 'eel', 'swordfish' ]
```

También es posible agregar múltiples valores nuevos a la matriz. Por ejemplo, `fish.push("swordfish", "dragonfish")` habría agregado elementos al índice `4` y `5`.

## unshift()

El método de matriz mutadora `unshift()` agrega uno o más elementos nuevos al comienzo de una matriz.


```js
let fish = [ "piranha", "barracuda", "koi", "eel" ];
```

```js
// Use unshift method to add an item to the beginning of an array
fish.unshift("shark");

fish;
```

```sh
Output
[ 'shark', 'piranha', 'barracuda', 'koi', 'eel' ]
```

En el ejemplo anterior, se agregó `"shark"` a la posición `0` del índice, desplazando todos los demás elementos de la matriz en uno. Al igual que con `shift()`, puedes agregar varios elementos separados por comas a la matriz a la vez.

`pop()` y `push()` afectan el final de una matriz, y `shift()` y `unshift()` afectan el comienzo de una matriz. Una manera fácil de recordar esto es tener en cuenta que `shift()` y `unshift()` cambiarán todos los números de índice de la matriz devuelta.


## splice()

El método `splice()` puede agregar o eliminar un elemento de cualquier posición en una matriz. Un método mutador, `splice()` puede agregar o eliminar, o agregar y eliminar simultáneamente.

`splice()` toma tres parámetros: el número de índice para comenzar, el número de elementos que se eliminarán y los elementos que se agregarán (opcional).


```
splice(index number, number of items to remove, items to add)
```

`splice(0, 0, "new")` agregaría la cadena `"new"` al comienzo de una matriz y no eliminaría nada.


Veamos algunos ejemplos a continuación sobre cómo `splice()` puede agregar y eliminar elementos en una matriz.


## Agregar con `splice()`

Si configuramos nuestro segundo parámetro (elementos a eliminar) como `0`, `splice()` eliminará cero elementos. De esta manera, podemos elegir agregar solo un elemento que comience en cualquier número de índice, lo que hace que splice() sea más poderoso que `push()` o `unshift()`, que solo agregan elementos al final o al principio de una matriz.


```js
let fish = [ "piranha", "barracuda", "koi", "eel" ];

// Splice a new item number into index position 1
fish.splice(1, 0, "manta ray");

fish;
```

```sh
Output
[ 'piranha', 'manta ray', 'barracuda', 'koi', 'eel' ]
```

La nueva cadena, `"manta ray"`, se agregó a la matriz, comenzando en el índice `1`.


## Remover con `splice()`


Si dejamos el tercer parámetro (elementos a agregar) en blanco, simplemente podemos eliminar un elemento de cualquier punto de la matriz.


```js
let fish = [ "piranha", "barracuda", "koi", "eel" ];

// Remove two items, starting at index position 1
fish.splice(1, 2);

fish;
```

```sh
Output
[ 'piranha', 'eel' ]
```

Eliminamos dos elementos de la matriz, comenzando con el índice `1`, `"barracuda"`. Si se elimina el segundo argumento, se eliminarán todos los elementos hasta el final de la matriz.

## Agregar y Remover con `splice()`

Usando todos los parámetros a la vez, podemos agregar y eliminar elementos de una matriz al mismo tiempo.

Para demostrar esto, eliminemos los mismos elementos que hicimos anteriormente y agreguemos uno nuevo en sus posiciones.


```js
let fish = [ "piranha", "barracuda", "koi", "eel" ];

// Remove two items and add one
fish.splice(1, 2, "manta ray");

fish;
```

```sh
Output
[ 'piranha', 'manta ray', 'eel' ]
```

`splice()` es un método poderoso para modificar cualquier parte de una matriz. Tenga en cuenta que `splice()` no debe confundirse con [`slice()`](./how-to-use-array-methods-in-javascript-accessor-methods.html#slice), una matriz de acceso que hará una copia de una sección de una matriz.


## reverse()

El método `reverse()` invierte el orden de los elementos de una matriz.


```js
let fish = [ "piranha", "barracuda", "koi", "eel" ];
```

Usando `reverse()`, el último elemento será el primero y el primer elemento será el último.


```js
// Reverse the fish array
fish.reverse();

fish;
```

```sh
Output
[ 'eel', 'koi', 'barracuda', 'piranha' ]
```

El método de matriz `reverse()` no tiene parámetros.


## fill()

El método `fill()` reemplaza todos los elementos de una matriz con un valor estático.


```js
let fish = [ "piranha", "barracuda", "koi", "eel" ];
```

En la matriz `fish`, tenemos cuatro elementos. Apliquemos `fill()`.


```js
// Replace all values in the array with "shark"
fish.fill("shark");

fish;
```

```sh
Output
[ 'shark', 'shark', 'shark', 'shark' ]
```


Los cuatro elementos de la matriz han sido reemplazados por el mismo valor, `"shark"`. `fill()` también toma argumentos opcionales de los puntos inicial y final.


```js
fish.fill("shark", 1) // > [ 'piranha', 'shark', 'shark', 'shark' ]
fish.fill("shark", 1, 3); // > [ 'piranha', 'shark', 'shark', 'eel' ]
```

Usando `fill()` podemos reemplazar uno o más elementos en una matriz con un valor estático.


## sort()

El método `sort()` ordena los elementos de una matriz según el primer carácter del elemento. En el caso de que el primer carácter sea idéntico, continuará en la línea y comparará el segundo carácter, y así sucesivamente.

De forma predeterminada, `sort()` alfabetizará una serie de cadenas que están todas en mayúsculas o minúsculas.


```js
let fish = [ "piranha", "barracuda", "koi", "eel" ];

// Sort items in array
fish.sort();

fish;
```

```sh
Output
[ 'barracuda', 'eel', 'koi', 'piranha' ]
```

Dado que `sort()` se basa en el primer carácter unicode, ordenará los elementos en mayúsculas antes que en minúsculas.

Modifiquemos nuestra matriz original para que una de nuestras cadenas comience con una letra mayúscula.


```js
let fish = [ "piranha", "barracuda", "Koi", "eel" ];

fish.sort();

fish;
```

```sh
Output
[ 'Koi', 'barracuda', 'eel', 'piranha' ]
```

Los números aparecen antes de los caracteres en mayúsculas y minúsculas.

Podemos modificar nuevamente la matriz para incluir un número en uno de los elementos de la cadena.


```js
let fish = [ "piranha", "barracuda", "Koi", "1 eel" ];

fish.sort();
```

```sh
Output
[ '1 eel', 'Koi', 'barracuda', 'piranha' ]
```

`sort()` no ordenará una matriz de números por tamaño de forma predeterminada. En cambio, solo verificará el primer carácter del número.


```js
let numbers = [ 42, 23, 16, 15, 4, 8 ];

numbers.sort();
```

```sh
Output
[ 15, 16, 23, 4, 42, 8 ]
```

Para ordenar los números correctamente, puede crear una función de comparación como argumento.


```js
// Function to sort numbers by size
const sortNumerically = (a, b) => {
  return a - b;
}

numbers.sort(sortNumerically);
```

```sh
Output
[ 4, 8, 15, 16, 23, 42 ]
```

La función de comparación `sortNumerically` nos permitió ordenar según lo previsto. `sort()` aplicará el cambio a la matriz original.


## Conclusión

En este tutorial, revisamos los principales métodos de matriz mutadora en JavaScript. Los métodos mutadores modifican la matriz original en la que se utilizan, en lugar de crear una copia como lo hacen los métodos de acceso. Aprendimos cómo agregar y eliminar elementos al principio o al final de una matriz, así como a ordenar, invertir y reemplazar el valor de los elementos de la matriz.

Para revisar los conceptos básicos de las matrices, lea [Comprender Matrices en JavaScript](./understanding-arrays-in-javascript.html). Para ver una lista completa de todos los métodos de matriz, consulte la [referencia de Matriz en Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
