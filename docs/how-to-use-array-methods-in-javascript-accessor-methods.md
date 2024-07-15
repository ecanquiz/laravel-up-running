# Cómo Utilizar Métodos de Matriz en Javascript: Métodos de Acceso

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-accessor-methods)
:::

## Introducción

La matriz de JavaScript es un tipo de datos que consta de una lista de elementos. Existen muchos métodos integrados útiles para trabajar con matrices en JavaScript. Los métodos que modifican la matriz original se conocen como métodos **mutadores** y los métodos que devuelven un nuevo valor o representación se conocen como métodos de **acceso**. En este tutorial, nos centraremos en los métodos de acceso.

Para aprovechar al máximo este tutorial, debe estar familiarizado con la creación, indexación, modificación y bucle de matrices, lo cual puede revisar en el tutorial [Comprender Matrices en JavaScript](./understanding-arrays-in-javascript.html).

Este tutorial repasará métodos que concatenarán matrices, convertirán matrices en cadenas, copiarán partes de una matriz en una nueva matriz y encontrarán los índices de las matrices.

:::info Nota
Los métodos de Matrices se escriben correctamente como `Array.prototype.method()`, ya que `Array.prototype` se refiere al objeto `Array` en sí. Para simplificar, simplemente enumeraremos el nombre como `method()`.
:::

## concat()

El método `concat()` fusiona dos o más matrices para formar una nueva matriz.

En el siguiente ejemplo, crearemos dos matrices de tipos mariscos y las combinaremos en una nueva matriz.


```js
// Create arrays of monovalves and bivalves
let monovalves = [ "abalone", "conch" ];
let bivalves = [ "oyster", "mussel", "clam" ];

// Concatenate them together into shellfish variable
let shellfish = monovalves.concat(bivalves);
```

Una vez que llamamos a la nueva matriz, veremos que consta de una combinación de las dos matrices originales:


```js
shellfish;
```

```sh
Output
[ 'abalone', 'conch', 'oyster', 'mussel', 'clam' ]
```

El método `concat()` puede tomar múltiples argumentos, lo que le permite concatenar muchas matrices con un solo método.

## join()

El método `join()` convierte todos los elementos de una matriz en una nueva cadena.


```js
let fish = [ "piranha", "barracuda", "koi", "eel" ];
```


Si no se proporciona ningún argumento, la salida de `join()` será una cadena separada por comas sin espacios en blanco adicionales.


```js
// Join the elements of an array into a string
let fishString = fish.join();

fishString;
```

```sh
Output
'piranha,barracuda,koi,eel'
```


Para incluir espacios en blanco u otro separador, puede agregar una cadena de su separador como parámetro al método `join()`. Este parámetro contendrá el separador que desee entre cada elemento de la matriz.


```js
// Join the elements of an array into a string
let fishString = fish.join(', ');

fishString;
```

```sh
Output
'piranha, barracuda, koi, eel'
```

En el ejemplo anterior, escribir `', '` con espacios en blanco separó los elementos de la matriz de una manera más legible. Una cadena vacía proporcionada como argumento eliminará por completo las comas predeterminadas.


## slice()

El método `slice()` copia una parte de una matriz en una nueva matriz.


```js
let fish = [ "piranha", "barracuda", "koi", "eel" ];
```

Supongamos que queremos copiar los dos últimos elementos de la matriz a una nueva matriz. Comenzaríamos con el número de índice del primer elemento que queremos, que es `2` para `koi`. Terminaríamos con el número de índice _siguiendo_ el último elemento que queramos. Debido a que el último elemento, `eel`, tiene el número de índice `3`, pondríamos `4`.


```js
// Slice a new array from 2 to 5
let fishWithShortNames = fish.slice(2, 4);

fishWithShortNames;
```

```sh
Output
[ 'koi', 'eel' ]
```


En este caso particular, dado que `eel` es el último elemento de la matriz, el segundo argumento es realmente innecesario. `slice()` comenzará en el primer índice y se detendrá al final de la matriz si no se proporciona un segundo argumento.


```js
// Slice a new array from 2 to the end of the array
let fishWithShortNames = fish.slice(2);

fishWithShortNames;
```

```sh
Output
[ 'koi', 'eel' ]
```

`slice()` no debe confundirse con el [método mutador `splice()`](./how-to-use-array-methods-in-javascript-mutator-methods.html#splice), que puede agregar o eliminar elementos de la matriz original.

## indexOf()

El método `indexOf()` devuelve el número de índice de la primera instancia de un elemento.

En el siguiente ejemplo, tenemos una cadena en la que `barracuda` aparece dos veces.


```js
let fish = [ "piranha", "barracuda", "koi", "barracuda" ];
```

Usaremos `indexOf()` para encontrar la primera instancia.


```js
// Find the first instance of an element
fish.indexOf("barracuda");
```

```sh
Output
1
```

Usaremos `indexOf()` para encontrar la primera instancia. Si el argumento dado es un valor que no existe en la matriz, la consola devolverá `-1`.


```js
fish.indexOf("shark");
```

```sh
Output
-1
```

El método `indexOf()` es especialmente útil en matrices que contienen muchos elementos.


## lastIndexOf()

El método `lastIndexOf()` devuelve el número de índice de la última instancia de un elemento.


Podemos probar con el mismo ejemplo de `indexOf()`, que incluye `barracuda` dos veces.


```js
let fish = [ "piranha", "barracuda", "koi", "barracuda" ];

// Find the last instance of an element
fish.lastIndexOf("barracuda");
```

```sh
Output
3
```


`lastIndexOf()` buscará en la matriz comenzando desde el final y devolverá el primer número de índice que encuentre.


## Conclusión

En este tutorial, revisamos los principales métodos de matriz de acceso integrados en JavaScript. Los métodos de acceso crean una nueva copia o representación de una matriz, en lugar de mutar o modificar el original.

Aprendimos cómo concatenar matrices, lo que las combina de un extremo a otro, así como también cómo convertir matrices en cadenas separadas por comas. También aprendimos cómo copiar partes de una matriz en una nueva matriz y encontrar el primer y último índice de un elemento determinado en una matriz.

Para revisar los conceptos básicos de las matrices, lea [Comprender Matrices en JavaScript](./understanding-arrays-in-javascript.html). Para ver una lista completa de todos los métodos de matriz, consulte la [Referencia de matriz en Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
