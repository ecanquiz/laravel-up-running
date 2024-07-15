# Cómo Utilizar Métodos de Matriz en JavaScript: Métodos de Iteración

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-iteration-methods)
:::

En JavaScript, el tipo de datos de [matriz](./understanding-data-types.html#arrays) consta de una lista de elementos. Hay muchos métodos integrados útiles disponibles para que los desarrolladores de JavaScript trabajen con matrices. Los métodos que modifican la matriz original se conocen como [métodos **mutadores**](./how-to-use-array-methods-in-javascript-mutator-methods.html) y los métodos que devuelven un nuevo valor o representación se conocen como [métodos de **acceso**](./how-to-use-array-methods-in-javascript-accessor-methods.html).

Existe una tercera clase de métodos de matriz, conocidos como métodos de **iteración**, que son métodos que operan en cada elemento de una matriz, uno a la vez. Estos métodos están estrechamente asociados con los bucles. En este tutorial, nos centraremos en los métodos de iteración.

Para aprovechar al máximo este tutorial, debe estar familiarizado con la creación, indexación, modificación y bucle de matrices, lo cual puede revisar en el tutorial [Comprender Matrices en JavaScript](./understanding-arrays-in-javascript.html).

En este tutorial, usaremos métodos de iteración para recorrer matrices, realizar funciones en cada elemento de una matriz, filtrar los resultados deseados de una matriz, reducir los elementos de la matriz a un solo valor y buscar en matrices para encontrar valores o índices.

:::info Nota
Los métodos de Matrices se escriben correctamente como `Array.prototype.method()`, ya que `Array.prototype` se refiere al objeto `Array` en sí. Para simplificar, simplemente enumeraremos el nombre como `method()`.
:::

## Comprender las Funciones de Flecha

Muchos ejemplos a lo largo de este tutorial utilizarán [expresiones de función de flecha](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) de JavaScript, que están representadas por un signo igual seguido de un signo mayor que: `=>`.

Una **función** es un bloque de código reutilizable que se puede ejecutar. Tradicionalmente, una función se puede escribir con la siguiente sintaxis:


```js
var example = function() {
  // code to execute
}

example();
```

La última versión de JavaScript al momento de escribir este artículo permite el uso de funciones de flecha, que se pueden escribir con la siguiente sintaxis:


```js
var example = () => {
  // code to execute
}

example();
```

Los paréntesis en cualquier caso pueden contener parámetros. Cuando solo hay un parámetro, se pueden omitir los paréntesis, así:


```js
var example = parameter1 => {
  // code to execute
}
```

A lo largo de los ejemplos de este tutorial, utilizaremos la sintaxis de la función de flecha. Para leer y comprender más sobre las funciones en JavaScript, lea la [referencia de Funciones en Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions).


## forEach()

El método `forEach()` llama a una función para cada elemento de una matriz.

Comencemos con la siguiente matriz asignada a la variable `fish`:


```js
let fish = [ "piranha", "barracuda", "cod", "eel" ];
```

Podemos usar `forEach()` para imprimir cada elemento de la matriz `fish` en la consola.


```js
// Print out each item in the array
fish.forEach(individualFish => {
	console.log(individualFish);
})
```

Una vez que lo hagamos, recibiremos el siguiente resultado:


```sh
Output
piranha
barracuda
cod
eel
```

Otra forma de hacer esto es usar la palabra clave del [bucle `for`](./for-loops-for-of-loops-and-for-in-loops-in-javascript.html) y probarla con la propiedad de longitud de la matriz.


```js
//Loop through the length of the array
for (let i = 0; i < fish.length; i++) {
console.log(fish[i]);
}
```

El código anterior tendrá el mismo resultado que usar el método `forEach()`. Como método de iteración diseñado específicamente para usarse con matrices, `forEach()` es más conciso y directo para esta tarea en particular.

## map()

El método `map()` crea una nueva matriz con los resultados de una llamada de función en cada elemento de la matriz.

Para ver un ejemplo de cómo utilizar el método de iteración `map()`, podemos imprimir cada iteración de un bucle en la consola. `map()` no muta la matriz original, sino que devuelve un nuevo valor de matriz.


```js
let fish = [ "piranha", "barracuda", "cod", "eel" ];

// Print out each item in the array
let printFish = fish.map(individualFish => {
	console.log(individualFish);
});

printFish;
```

```sh
Output
piranha
barracuda
cod
eel
```

También podemos usar `map()` para cambiar los valores de cada elemento en una matriz. Para demostrar esto, agregaremos una `s` al final de cada elemento en la matriz `fish` para pluralizar cada palabra.


```js
// Pluralize all items in the fish array
let pluralFish = fish.map(individualFish => {
	return `${individualFish}s`;
});

pluralFish;
```

```sh
Output
[ 'piranhas', 'barracudas', 'cods', 'eels' ]
```

La variable `fish` original no ha cambiado, pero `pluralFish` ahora contiene una versión modificada de la variable original.


## filter()

El método `filter()` crea una nueva matriz con los elementos que pasan el resultado de una prueba determinada.

Podríamos usar `filter()` para devolver una nueva matriz que contenga solo los elementos de una lista que comiencen con una letra específica. Para hacer esto, podemos utilizar la [indexación de cadenas](./how-to-index-split-and-manipulate-strings-in-javascript.html#como-se-indexan-las-cadenas) para llamar al primer elemento (o letra) en cada elemento de cadena de la matriz.


```js
let seaCreatures = [ "shark", "whale", "squid", "starfish", "narwhal" ];

// Filter all creatures that start with "s" into a new list
let filteredList = seaCreatures.filter(creature => {
  return creature[0] === "s";
});

filteredList;
```

```sh
Output
[ 'shark', 'squid', 'starfish' ]
```

Probamos qué elementos de la matriz tienen una `s` en el índice `0` y asignamos el resultado a una nueva variable.

`filter()` es un método de iteración y no muta la matriz original.


## reduce()

El método `reduce()` reducirá una matriz a un solo valor.

Esto se ve comúnmente con números, como encontrar la suma de todos los números en una matriz.


```js
let numbers = [ 42, 23, 16, 15, 4, 8 ];

// Get the sum of all numerical values
let sum = numbers.reduce((a, b) => {
	return a + b;
});

sum;
```

```sh
Output
108
```

`reduce()` también se puede utilizar con [cadenas](./understanding-data-types.html#strings) y otros [tipos de datos](./understanding-data-types.html). El valor devuelto por `reduce()` puede ser un número, una cadena, una matriz u otro tipo de datos. `reduce()` es un método de iteración que no muta la matriz original.

## find()

El método `find()` devuelve el primer valor de una matriz que pasa una prueba determinada.

Como ejemplo, crearemos una variedad de criaturas marinas.


```js
let seaCreatures = [ "whale", "octopus", "shark", "cuttlefish", "flounder" ];
```

Luego usaremos el método `find()` para probar si alguna de las criaturas en la matriz es cefalópodos.



```js
// Check if a given value is a cephalopod
const isCephalopod = cephalopod => {
	return [ "cuttlefish", "octopus" ].includes(cephalopod);
}

seaCreatures.find(isCephalopod);
```


```sh
Output
octopus
```

Dado que `octopus` fue la primera entrada en la matriz que satisfizo la prueba en la función `isCephalopod()`, es el primer valor que se devolverá.


El método `find()` puede ayudarle a trabajar con matrices que contienen muchos valores.


## findIndex()

El método `findIndex()` devuelve el primer índice de una matriz que pasa una prueba determinada.

Podemos usar el mismo ejemplo de `seaCreatures` del método `find()`.



```js
let seaCreatures = [ "whale", "octopus", "shark", "cuttlefish", "flounder" ];
```

Usando la prueba `isCephalopod`, encontraremos el número de índice en lugar del valor de la primera coincidencia.



```js
// Check if a given value is a cephalopod
const isCephalopod = cephalopod => {
	return [ "cuttlefish", "octopus" ].includes(cephalopod);
}

seaCreatures.findIndex(isCephalopod);
```



```sh
Output
1
```


`octopus` es el primer elemento que coincide con la prueba y tiene un índice de `1`, por lo tanto, es el número de índice que se devuelve.

Si la prueba no se cumple, `findIndex()` devolverá `-1`.



```js
const isThereAnEel = eel => {
    return [ "eel" ].includes(eel);
}

seaCreatures.findIndex
```

```sh
Output
-1
```


El método `findIndex()` es particularmente útil cuando se trabaja con matrices que contienen muchos elementos.


## Conclusión

En este tutorial, revisamos los principales métodos de matrices de iteración integrados en JavaScript. Los métodos de iteración operan en cada elemento de una matriz y, a menudo, realizan una nueva función. Repasamos cómo recorrer matrices, cambiar el valor de cada elemento en una matriz, filtrar y reducir matrices y encontrar valores e índices.

Para revisar los conceptos básicos de las matrices, lea [Comprender Matrices en JavaScript ](./understanding-arrays-in-javascript.html). Para obtener más información sobre la sintaxis en Javascript, consulte nuestro tutorial sobre ["Comprender Sintaxis y Estructura del Código en JavaScript"](./understanding-syntax-and-code-structure-in-javascript.html).
