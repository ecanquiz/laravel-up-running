# Comprender Map y Set  de Objetos en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/understanding-map-and-set-objects-in-javascript)
:::

## Introducción

En JavaScript, los desarrolladores suelen dedicar mucho tiempo a decidir la estructura de datos correcta a utilizar. Esto se debe a que elegir la estructura de datos correcta puede facilitar la manipulación de esos datos en el futuro, ahorrando tiempo y haciendo que el código sea más fácil de comprender. Las dos estructuras de datos predominantes para almacenar colecciones de datos son [Objetos](./understanding-objects-in-javascript.html) y [Arrays](./understanding-arrays-in-javascript.html) (un tipo de objeto). Los desarrolladores utilizan objetos para almacenar pares clave/valor y matrices para almacenar listas indexadas. Sin embargo, para brindar a los desarrolladores más flexibilidad, la especificación ECMAScript 2015 introdujo dos nuevos tipos de objetos iterables: _Mapṣ_, que son colecciones ordenadas de pares clave/valor, y _Sets_, que son colecciones de valores únicos.

En este artículo, repasará los objetos Map y Set, qué los hace similares o diferentes a Objects y Arrays, las propiedades y métodos disponibles para ellos y ejemplos de algunos usos prácticos. 

## _Maps_

Un _Map_ es una colección de pares clave/valor que puede utilizar cualquier [tipo de datos](./understanding-data-types.html) como clave y puede mantener el orden de sus entradas. Los _Maps_ tienen elementos tanto de _Objects_ (una colección única de pares clave/valor) como de _Arrays_ (una colección ordenada), pero conceptualmente son más similares a los _Objects_. Esto se debe a que, aunque el tamaño y el orden de las entradas se conservan como un _Array_, las entradas en sí son pares clave/valor como los _Objects_.

Los _Maps_ se pueden inicializar con sintaxis `new Map()`:


```js
const map = new Map()
```

Esto nos da un _Map_ vacío:


```sh
Output
Map(0) {}
```

### Agregar Valores a un _Map_

Puede agregar valores a un _Map_ con el método `set()`. El primer argumento será la clave y el segundo argumento será el valor.

Lo siguiente agrega tres pares clave/valor al `map`:


```js
map.set('firstName', 'Luke')
map.set('lastName', 'Skywalker')
map.set('occupation', 'Jedi Knight')
```

Aquí comenzamos a ver cómo los `_Map_s` tienen elementos tanto de _Objects_ como de _Arrays_. Al igual que un _Array_, tenemos una colección indexada a cero y también podemos ver cuántos elementos hay en el `_Map_` de forma predeterminada. Los `_Map_s` usan la sintaxis `=>` para indicar pares clave/valor como `key => value`:


```sh
Output
Map(3)
0: {"firstName" => "Luke"}
1: {"lastName" => "Skywalker"}
2: {"occupation" => "Jedi Knight"}
```

Este ejemplo es similar a un objeto normal con claves basadas en cadenas, pero podemos usar cualquier tipo de datos como clave con _Maps_.

Además de configurar valores manualmente en un _Map_, también podemos inicializar un _Map_ con valores. Hacemos esto usando una _Array_ de _Arrays_ que contiene dos elementos, cada uno de los cuales es un par clave/valor, que se ve así:


```js
[ [ 'key1', 'value1'], ['key2', 'value2'] ]
```


Usando la siguiente sintaxis, podemos recrear el mismo _Map_:


```js
const map = new Map([
  ['firstName', 'Luke'],
  ['lastName', 'Skywalker'],
  ['occupation', 'Jedi Knight'],
])
```

:::info Nota
Este ejemplo utiliza _comas finales_, también conocidas como _comas colgantes_. Esta es una práctica de formato de JavaScript en la que el elemento final de una serie al declarar una colección de datos tiene una coma al final. Aunque esta opción de formato se puede utilizar para obtener diferencias más limpias y facilitar la manipulación del código, utilizarla o no es una cuestión de preferencia. Para obtener más información sobre las comas finales, consulte este [artículo de las Comas Finales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas) de los documentos web de MDN.
:::

Por cierto, esta sintaxis es la misma que el resultado de llamar a [`Object.entries()`](./how-to-use-object-methods-in-javascript.html#object-entries) en un _Object_.  Esto proporciona una forma preparada para convertir un _Object_ en un _Map_, como se muestra en el siguiente bloque de código:


```js
const luke = {
  firstName: 'Luke',
  lastName: 'Skywalker',
  occupation: 'Jedi Knight',
}

const map = new Map(Object.entries(luke))
```

Alternativamente, puedes convertir un _Map_ nuevamente en un _Object_ o una _Array_ con una sola línea de código.

Lo siguiente convierte un _Map_ en un _Object_:


```js
const obj = Object.fromEntries(map)
```

Esto dará como resultado el siguiente valor de `obj`:


```sh
Output
{firstName: "Luke", lastName: "Skywalker", occupation: "Jedi Knight"}
```

Ahora, convertimos un _Map_ en un _Array_:


```js
const arr = Array.from(map)
```

Esto dará como resultado el siguiente _Array_ para `arr`:


```sh
Output
[ ['firstName', 'Luke'],
  ['lastName', 'Skywalker'],
  ['occupation', 'Jedi Knight'] ]
```

### Claves de _Map_

Los _Map_ aceptan cualquier tipo de datos como clave y no permiten valores de clave duplicados. Podemos demostrar esto creando un _Map_ y usando valores que no sean cadenas como claves, además de establecer dos valores para la misma clave.

Primero, inicialicemos un _Map_ con claves que no sean cadenas:


```js
const map = new Map()

map.set('1', 'String one')
map.set(1, 'This will be overwritten')
map.set(1, 'Number one')
map.set(true, 'A Boolean')
```

Aunque es una creencia común que un objeto JavaScript normal ya puede manejar números, valores booleanos y otros tipos de datos primitivos como claves, en realidad este no es el caso, porque los objetos convierten todas las claves en cadenas.

Como ejemplo, inicialice un objeto con una clave numérica y compare el valor de una clave numérica `1` y una clave `"1"` en cadena:


```js
// Initialize an object with a numerical key
const obj = { 1: 'One' }

// The key is actually a string
obj[1] === obj['1']  // true
```

Es por eso que si intenta utilizar un _Object_ como clave, en su lugar imprimirá la cadena `object Object`.


Como ejemplo, cree un _Object_ y luego utilícelo como clave de otro _Object_:


```js
// Create an object
const objAsKey = { foo: 'bar' }

// Use this object as the key of another object
const obj = {
  [objAsKey]: 'What will happen?'
}
```

Esto producirá lo siguiente:


```sh
Output
{[object Object]: "What will happen?"}
```

Este no es el caso de _Map_. Intente crear un _Object_ y configurarlo como clave de un _Map_:


```js
// Create an object
const objAsKey = { foo: 'bar' }

const map = new Map()

// Set this object as the key of a Map
map.set(objAsKey, 'What will happen?')
```

La clave del elemento _Map_ ahora es el objeto que creamos.


```js
Output
key: {foo: "bar"}
value: "What will happen?"
```

Hay una cosa importante a tener en cuenta sobre el uso de un _Object_ o _Array_ como clave: el _Map_ usa la referencia al _Object_ para comparar la igualdad, no el valor literal del Objeto. En JavaScript `{} === {}` devuelve `false`, porque los dos _Object_ no son los mismos dos _Object_, a pesar de tener el mismo valor (vacío).

Eso significa que agregar dos _Objects_ únicos con el mismo valor creará un _Map_ con dos entradas:


```js
// Add two unique but similar objects as keys to a Map
map.set({}, 'One')
map.set({}, 'Two')
```


Esto producirá lo siguiente:


```js
Output
Map(2) {{…} => "One", {…} => "Two"}
```

Pero usar la misma referencia de _Object_ dos veces creará un _Map_ con una entrada.


```js
// Add the same exact object twice as keys to a Map
const obj = {}

map.set(obj, 'One')
map.set(obj, 'Two')
```


Lo que resultará en lo siguiente:


```sh
Output
Map(1) {{…} => "Two"}
```


El segundo `set()` actualiza exactamente la misma clave que el primero, por lo que terminamos con un _Map_ que solo tiene un valor.


### Obtener y Remover Elementos de un _Map_

Una de las desventajas de trabajar con _Object_ es que puede resultar difícil enumerarlos o trabajar con todas las claves o valores. La estructura del _Map_, por el contrario, tiene muchas propiedades integradas que hacen que trabajar con sus elementos sea más directo.

Podemos inicializar un nuevo _Map_ para demostrar los siguientes métodos y propiedades: `delete()`, `has()`, `get()` y `size`.



```js
// Initialize a new Map
const map = new Map([
  ['animal', 'otter'],
  ['shape', 'triangle'],
  ['city', 'New York'],
  ['country', 'Bulgaria'],
])
```

Utilice el método `has()` para comprobar la existencia de un elemento en un _Map_. `has()` devolverá un valor Booleano.


```js
// Check if a key exists in a Map
map.has('shark') // false
map.has('country') // true
```

Utilice el método `get()` para recuperar un valor por clave.


```js
// Get an item from a Map
map.get('animal') // "otter"
```


Un beneficio particular que tienen los _Maps_ sobre los _Objects_ es que puedes encontrar el tamaño de un _Map_ en cualquier momento, como puedes hacerlo con un _Array_. Puede obtener el recuento de elementos en un _Maps_ con la propiedad `size`. Esto implica menos pasos que convertir un _Object_ en un _Array_ para encontrar la longitud.


```js
// Get the count of items in a Map
map.size // 4
```

Utilice el método `delete()` para eliminar un elemento de un _Map_ mediante clave. El método devolverá un valor Booleano— `true` si existía un elemento y se eliminó, y `false` si no coincidía con ningún elemento.


```js
// Delete an item from a Map by key
map.delete('city') // true
```

Esto dará como resultado el siguiente _Map_:


```sh
Output
Map(3) {"animal" => "otter", "shape" => "triangle", "country" => "Bulgaria"}
```

Finalmente, se pueden borrar todos los valores de un _Map_ con `map.clear()`.


```js
// Empty a Map
map.clear()
```

Esto producirá:


```sh
Output
Map(0) {}
```

### Claves, Valores y Entradas para _Maps_


Los _Objects_ pueden recuperar claves, valores y entradas utilizando las propiedades del constructor `Object`. _Maps_, por otro lado, tiene métodos prototipo que nos permiten obtener las claves, valores y entradas de la instancia de _Map_ directamente.

Los métodos `keys()`, `values()` y `entries()` devuelven un `MapIterator`, que es similar a un _Array_ en el sentido de que puedes usar `for...of` para recorrer los valores.


Aquí hay otro ejemplo de un _Map_, que podemos usar para demostrar estos métodos:


```js
const map = new Map([
  [1970, 'bell bottoms'],
  [1980, 'leg warmers'],
  [1990, 'flannel'],
])
```


El método `keys()` devuelve las claves:


```js
map.keys()
```

```sh
Output
MapIterator {1970, 1980, 1990}
```

El método `values()` devuelve los valores:


```js
map.values()
```

```sh
Output
MapIterator {"bell bottoms", "leg warmers", "flannel"}
```


El método `entries()` devuelve una matriz de pares clave/valor:


```js
map.entries()
```

```sh
Output
MapIterator {1970 => "bell bottoms", 1980 => "leg warmers", 1990 => "flannel"}
```

### Iteración con _Map_


_Map_ tiene un método `forEach` incorporado, similar a un _Array_, para iteración incorporada. Sin embargo, hay una pequeña diferencia en lo que iteran. La devolución de llamada `forEach` de un _Map_ itera a través del `value`, la `key` y el `map` en sí, mientras que la versión _Array_ itera a través del `item`, el `index` y el `array` en sí.


```js
// Map 
Map.prototype.forEach((value, key, map) = () => {})

// Array
Array.prototype.forEach((item, index, array) = () => {})
```

Esta es una gran ventaja para los _Maps_ sobre los _Objects_, ya que los _Objects_ deben convertirse con `keys()`, `values()` o `entries()`, y no existe una forma sencilla de recuperar las propiedades de un _Object_ sin convertirlo.

Para demostrar esto,  iteremos a través de nuestro _Map_ y registremos los pares clave/valor en la consola:



```js
// Log the keys and values of the Map with forEach
map.forEach((value, key) => {
  console.log(`${key}: ${value}`)
})
```


Esto dará:


```sh
Output
1970: bell bottoms
1980: leg warmers
1990: flannel
```

Dado que un bucle `for...of` itera sobre iterables como _Map_ y _Array_, podemos obtener exactamente el mismo resultado desestructurando la matriz de elementos del _Map_:


```js
// Destructure the key and value out of the Map item
for (const [key, value] of map) {
  // Log the keys and values of the Map with for...of
  console.log(`${key}: ${value}`)
}
```


### Propiedades y Métodos del _Map_

La siguiente tabla muestra una lista de propiedades y métodos de _Map_ para referencia rápida:

|Propiedades/Métodos|Descripción|Devoluciones|
|-|-|-|
|[`set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set)|Agrega un par clave/valor a un _Map_|`Map` Object|
|[`delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete)|Elimina un par clave/valor de un _Map_ por clave|Boolean|
|[`get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get)|Devuelve un valor por clave|
|[`has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has)|Comprueba la presencia de un elemento en un _Map_ por clave|Boolean|
|[`clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear)|Elimina todos los elementos de un _Map_|N/A|
|[`keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys)|Devuelve todas las claves en un _Map_|`MapIterator` object|
|[`values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values)|Devuelve todos los valores en un _Map_|`MapIterator` object|
|[`entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries)|Devuelve todas las claves y valores en un _Map_ como `[key, value]`|`MapIterator` object|
|[`forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach)|Itera a través del _Map_ en orden de inserción.|N/A
|[`size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size)|Devuelve el número de elementos en un _Map_|Number|


### Cuándo Utilizar _Map_

En resumen, los _Maps_ son similares a los _Objects_ en el sentido de que contienen pares clave/valor, pero los _Maps_ tienen varias ventajas sobre los _Objects_:

- **Tamaño** - Los _Maps_ tienen una propiedad `size`, mientras que los _Objects_ no tienen una forma integrada de recuperar su tamaño.
- **Iteración** - Los _Maps_ se pueden iterar directamente, mientras que los _Objects_ no.
- **Flexibilidad** - Los _Maps_ pueden tener cualquier tipo de datos (primitivo u objeto) como clave de un valor, mientras que los _Objects_ solo pueden tener cadenas.
- **Ordenado** - Los _Maps_ conservan su orden de inserción, mientras que los _Objects_ no tienen un orden garantizado.

Debido a estos factores, los _Maps_ son una poderosa estructura de datos a considerar. Sin embargo, _Objects_ también tiene algunas ventajas importantes:

- **JSON** - Los _Objects_ funcionan perfectamente con `JSON.parse()` y `JSON.stringify()`, dos funciones esenciales para trabajar con [JSON](./how-to-work-with-json-in-javascript.html), un formato de datos común con el que tratan muchas API REST.
- **Trabajar con un solo elemento** - Al trabajar con un valor conocido en un _Object_, puede acceder a él directamente con la clave sin la necesidad de utilizar un método, como `get()` de _Map_.

Esta lista le ayudará a decidir si un _Map_ u _Object_ es la estructura de datos adecuada para su caso de uso.

## _Set_

Un _Set_ es una colección de valores únicos. A diferencia de un _Map_, un _Set_ es conceptualmente más similar a un _Array_ que a un _Object_, ya que es una lista de valores y no pares clave/valor. Sin embargo, _Set_ no reemplaza a los _Arrays_, sino más bien un complemento para brindar soporte adicional para trabajar con datos duplicados.

Puede inicializar _Set_ con la sintaxis `new Set()`.


```js
const set = new Set()
```

Esto nos da un _Set_ vacío:


```js
Output
Set(0) {}
```

Los elementos se pueden agregar a un _Set_ con el método `add()`. (Esto no debe confundirse con el método `set()` disponible para _Map_, aunque son similares).



```js
// Add items to a Set
set.add('Beethoven')
set.add('Mozart')
set.add('Chopin')
```


Dado que los _Sets_ solo pueden contener valores únicos, se ignorará cualquier intento de agregar un valor que ya exista.


```js
set.add('Chopin') // Set will still contain 3 unique values
```


:::info Nota
La misma comparación de igualdad que se aplica a las claves del _Map_ se aplica a los elementos del _Set_. Dos objetos que tengan el mismo valor pero no compartan la misma referencia no se considerarán iguales.
::::


También puede inicializar _Sets_ con un _Array_ de valores. Si hay valores duplicados en la matriz, se eliminarán del _Set_.


```js
// Initialize a Set from an Array
const set = new Set(['Beethoven', 'Mozart', 'Chopin', 'Chopin'])
```

```sh
Output
Set(3) {"Beethoven", "Mozart", "Chopin"}
```

Por el contrario, un _Set_ se puede convertir en un _Array_ con una línea de código:


```js
const arr = [...set]
```

```sh
Output
(3) ["Beethoven", "Mozart", "Chopin"]
```

_Set_ tiene muchos de los mismos métodos y propiedades que _Map_, incluidos `delete()`, `has()`, `clear()` y `size`.


```js
// Delete an item
set.delete('Beethoven') // true

// Check for the existence of an item
set.has('Beethoven') // false

// Clear a Set
set.clear()

// Check the size of a Set
set.size // 0
```


Tenga en cuenta que _Set_ no tiene una manera de acceder a un valor mediante una clave o índice, como _Map.get(key)_ o _arr[index]_.


### Claves, Valores y Entradas para _Sets_

Tanto _Map_ como _Set_ tienen métodos `keys()`, `values()` y `entries()` que devuelven un iterador. Sin embargo, si bien cada uno de estos métodos tiene un propósito distinto en _Map_, los _Sets_ no tienen claves y, por lo tanto, las claves son un alias para los valores. Esto significa que `keys()` y `values()` devolverán el mismo iterador, y `entries()` devolverá el valor dos veces. Tiene más sentido usar únicamente `values()` con _Set_, ya que los otros dos métodos existen para mantener la coherencia y la compatibilidad cruzada con _Map_.


```js
const set = new Set([1, 2, 3])
// Get the values of a set
set.values()
```

```sh
Output
SetIterator {1, 2, 3}
```

### Iteración con _Set_


Al igual que _Map_, _Set_ tiene un método `forEach()` incorporado. Dado que los _Sets_ no tienen claves, el primer y segundo parámetro de la devolución de llamada `forEach()` devuelven el mismo valor, por lo que no hay ningún caso de uso fuera de la compatibilidad con _Map_. Los parámetros de `forEach()` son `value, key, set`.

Tanto `forEach()` como `for...of` se pueden utilizar en _Set_. Primero, veamos la iteración de `forEach()`:


```js
const set = new Set(['hi', 'hello', 'good day'])

// Iterate a Set with forEach
set.forEach((value) => console.log(value))
```

Entonces podemos escribir la versión `for...of`:


```js
// Iterate a Set with for...of
for (const value of set) {  
    console.log(value);
}
```

Ambas estrategias producirán lo siguiente:


```sh
Output
hi
hello
good day
```

### Propiedades y Métodos de _Set_


La siguiente tabla muestra una lista de propiedades y métodos de _Set_ para referencia rápida:





|Propiedades/Métodos|Descripción|Devoluciones|
|-|-|-|
|[`add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add)|Agrega un nuevo elemento a un _Set_|`Set` Object|
|[`delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete)|Elimina el elemento especificado de un _Set_|Boolean|
|[`has()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has)|Comprueba la presencia de un elemento en un _Set_|Boolean|
|[`clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear)|Elimina todos los elementos de un _Set_|N/A|
|[`keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys)|Devuelve todos los valores de un _Set_ (lo mismo que `values()`)|`SetIterator` object|
|[`values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values)|Devuelve todos los valores de un _Set_ (lo mismo que `keys()`)|`SetIterator` object|
|[`entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries)|Devuelve todos los valores en un _Set_ como `[value, value]`|`SetIterator` object|
|[`forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach)|Itera a través del _Set_ en orden de inserción|N/A|
|[`size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size)|Devuelve el número de elementos de un _Set_|Number|

### Cuándo utilizar el _Set_

_Set_ es una adición útil a su kit de herramientas de JavaScript, particularmente para trabajar con valores duplicados en datos.

En una sola línea podemos crear un nuevo _Array_ sin valores duplicados a partir de un _Array_ que tiene valores duplicados.


```js
const uniqueArray = [ ...new Set([1, 1, 2, 2, 2, 3])] // (3) [1, 2, 3]
```

Esto dará:


```sh
Output
(3) [1, 2, 3]
```

_Set_ se puede utilizar para encontrar la unión, intersección y diferencia entre dos _Sets_ de datos. Sin embargo, los _Arrays_ tienen una ventaja significativa sobre los _Set_ para la manipulación adicional de los datos debido a los métodos `sort()`, `map()`, `filter()` y `reduce()`, así como la compatibilidad directa con los métodos `JSON`.

## Conclusión

En este artículo, aprendió que un _Map_ es una colección de pares clave/valor ordenados y que un _Set_ es una colección de valores únicos. Ambas estructuras de datos agregan capacidades adicionales a JavaScript y simplifican tareas comunes, como encontrar la longitud de una colección de pares clave/valor y eliminar elementos duplicados de un conjunto de datos, respectivamente. Por otro lado, los _Objects_ y _Arrays_ se han utilizado tradicionalmente para el almacenamiento y manipulación de datos en JavaScript, y tienen compatibilidad directa con _JSON_, lo que los sigue convirtiendo en las estructuras de datos más esenciales, especialmente para trabajar con API REST. Los _Maps_ y _Sets_ son principalmente útiles como soporte de estructuras de datos para _Objects_ y _Arrays_.
