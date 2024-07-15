# Comprender Parámetros Predeterminados en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/understanding-default-parameters-in-javascript)
:::

## Introducción

En [ECMAScript 2015](https://262.ecma-international.org/6.0/), los parámetros de función predeterminados se introdujeron en el lenguaje [JavaScript](./). Estos permiten a los desarrolladores inicializar una [función](./how-to-define-functions-in-javascript.html) con valores predeterminados si los argumentos no se proporcionan a la llamada de función. Inicializar los parámetros de función de esta manera hará que sus funciones sean más fáciles de leer y menos propensas a errores, y proporcionará un comportamiento predeterminado para sus funciones. Esto le ayudará a evitar errores que surgen al pasar argumentos `undefined` y desestructurar objetos que no existen.

En este artículo, revisará la diferencia entre parámetros y argumentos, aprenderá cómo usar parámetros predeterminados en funciones, verá formas alternativas de admitir parámetros predeterminados y aprenderá qué tipos de valores y expresiones se pueden usar como parámetros predeterminados. También verá ejemplos que demuestran cómo funcionan los parámetros predeterminados en JavaScript.

## Argumentos y Parámetros

Antes de explicar los parámetros de función predeterminados, es importante saber qué es lo que los parámetros pueden establecer de forma predeterminada. Por esta razón, primero revisaremos la diferencia entre argumentos y parámetros en una función. Si desea obtener más información sobre esta distinción, consulte nuestro artículo anterior de la [serie JavaScript](./), [Cómo Definir Funciones en JavaScript ](./how-to-define-functions-in-javascript.html).

En el siguiente bloque de código, creará una función que devuelve el cubo de un número determinado, definido como `x`:


```js
// Define a function to cube a number
function cube(x) {
  return x * x * x
}
```

La variable `x` en este ejemplo es un _parámetro_— una variable con nombre que se pasa a una función. Un parámetro siempre debe estar contenido en una variable y nunca debe tener un valor directo.

Ahora eche un vistazo al siguiente bloque de código, que llama a la función de `cube` que acaba de crear:


```js
// Invoke cube function
cube(10)
```

Esto dará el siguiente resultado:


```sh
Output
1000
```


En este caso, `10` es un _argumento_— un valor que se pasa a una función cuando se invoca. A menudo, el valor también estará contenido en una variable, como en el siguiente ejemplo:


```js
// Assign a number to a variable
const number = 10

// Invoke cube function
cube(number)
```

Esto producirá el mismo resultado:


```sh
Output
1000
```


Si no pasa un argumento a una función que espera uno, la función usará implícitamente `undefined` como valor:

```js
// Invoke the cube function without passing an argument
cube()
```

Esto devolverá:

```sh
Output
NaN
```

En este caso, `cube()` intenta calcular el valor de `undefined * undefined * undefined`, lo que da como resultado `NaN`, o _“not a number”_. Para obtener más información sobre esto, consulte la sección numérica de [Comprender Tipos de Datos en JavaScript](./understanding-data-types.html#numbers).

Este comportamiento automático a veces puede ser un problema. En algunos casos, es posible que desee que el parámetro tenga un valor incluso si no se pasó ningún argumento a la función. Ahí es donde resulta útil la característica de _parámetros predeterminados_, un tema que cubrirá en la siguiente sección.

## Sintaxis de Parámetros Predeterminada


Con la adición de parámetros predeterminados en ES2015, ahora puede asignar un valor predeterminado a cualquier parámetro, que la función usará en lugar de `undefined` cuando se llame sin un argumento. Esta sección primero le mostrará cómo hacer esto manualmente y luego lo guiará a través de la configuración de los parámetros predeterminados.

Sin parámetros predeterminados, tendría que verificar explícitamente si hay valores `undefined` para poder establecer los valores predeterminados, como se muestra en este ejemplo:



```js
// Check for undefined manually
function cube(x) {
  if (typeof x === 'undefined') {
    x = 5
  }

  return x * x * x
}

cube()
```

Esto utiliza una [declaración condicional](./how-to-write-conditional-statements-in-javascript.html) para verificar si el valor se ha proporcionado automáticamente como `undefined`, luego establece el valor de `x` en `5`. Esto dará como resultado el siguiente resultado:


```sh
Output
125
```

Por el contrario, el uso de parámetros predeterminados logra el mismo objetivo con mucho menos código. Puede establecer un valor predeterminado para el parámetro en el `cube` asignándolo con el operador de asignación de igualdad (`=`), como se resalta aquí:


```js{2}
// Define a cube function with a default value
function cube(x = 5) {
  return x * x * x
}
```


Ahora, cuando se invoca la función `cube` sin un argumento, asignará `5` a `x` y devolverá el cálculo en lugar de `NaN`:


```js
// Invoke cube function without an argument
cube()
```

```sh
Output
125
```

Seguirá funcionando según lo previsto cuando se pase un argumento, ignorando el valor predeterminado:


```js
// Invoke cube function with an argument
cube(2)
```

```sh
Output
8
```


Sin embargo, una advertencia importante a tener en cuenta es que el valor del parámetro predeterminado también anulará un `undefined` explícito pasado como argumento a una función, como se demuestra aquí:


```js
// Invoke cube function with undefined
cube(undefined)
```


Esto dará el cálculo con `x` igual a `5`:


```sh
Output
125
```


En este caso, se calcularon los valores de los parámetros predeterminados y un valor `undefined` explícito no los anuló.

Ahora que tiene una idea de la sintaxis básica de los parámetros predeterminados, la siguiente sección mostrará cómo funcionan los parámetros predeterminados con diferentes tipos de datos.


## Tipos de Datos de Parámetros Predeterminados

Cualquier [valor primitivo](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) u [objeto](./understanding-objects-in-javascript.html) se puede utilizar como valor de parámetro predeterminado. En esta sección, verá cómo esta flexibilidad aumenta las formas en que se pueden utilizar los parámetros predeterminados.

Primero, establezca los parámetros utilizando un [número](./understanding-data-types.html#numbers), [cadena](./understanding-data-types.html#strings), [booleano](./understanding-data-types.html#booleans), objeto, [matriz](./understanding-arrays-in-javascript.html) y valor nulo como valor predeterminado. Este ejemplo utilizará la sintaxis de la [función de flecha](/how-to-define-functions-in-javascript.html#funciones-de-flecha):

```js
// Create functions with a default value for each data type
const defaultNumber = (number = 42) => console.log(number)
const defaultString = (string = 'Shark') => console.log(string)
const defaultBoolean = (boolean = true) => console.log(boolean)
const defaultObject = (object = { id: 7 }) => console.log(object)
const defaultArray = (array = [1, 2, 3]) => console.log(array)
const defaultNull = (nullValue = null) => console.log(nullValue)
```

Cuando estas funciones se invocan sin parámetros, todas utilizarán los valores predeterminados:

```js
// Invoke each function
defaultNumber()
defaultString()
defaultBoolean()
defaultObject()
defaultArray()
defaultNull()
```

```sh
Output
42
"Shark"
true
{id: 7}
(3) [1, 2, 3]
null
```

Tenga en cuenta que cualquier objeto creado en un parámetro predeterminado se creará cada vez que se llame a la función. Uno de los casos de uso común de los parámetros predeterminados es utilizar este comportamiento para obtener valores de un objeto. Si intenta desestructurar o acceder a un valor desde un objeto que no existe, arrojará un error. Sin embargo, si el parámetro predeterminado es un objeto vacío, simplemente le dará valores `undefined` en lugar de generar un error:


```js
// Define a settings function with a default object
function settings(options = {}) {
  const { theme, debug } = options

  // Do something with settings
}
```

Esto evitará el error causado por desestructurar objetos que no existen.

Ahora que ha visto cómo funcionan los parámetros predeterminados con diferentes tipos de datos, la siguiente sección explicará cómo pueden funcionar varios parámetros predeterminados juntos.


## Usar Múltiples Parámetros Predeterminados

Puede utilizar tantos parámetros predeterminados como desee en una función. Esta sección le mostrará cómo hacer esto y cómo usarlo para manipular el [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) en un ejemplo del mundo real.

Primero, declare una función `sum()` con múltiples parámetros predeterminados:


```js
// Define a function to add two values
function sum(a = 1, b = 2) {
  return a + b
}

sum()
```

Esto dará como resultado el siguiente cálculo predeterminado:


```sh
Output
3
```

Además, el valor utilizado en un parámetro se puede utilizar en cualquier parámetro predeterminado posterior, de izquierda a derecha. Por ejemplo, esta función `createUser` crea un objeto de usuario `userObj` como tercer parámetro, y todo lo que hace la función es devolver `userObj` con los dos primeros parámetros:


```js
// Define a function to create a user object using parameters
function createUser(name, rank, userObj = { name, rank }) {
  return userObj
}

// Create user
const user = createUser('Jean-Luc Picard', 'Captain')
```

Si llama al `user` aquí, obtendrá lo siguiente:


```sh
Output
{name: "Jean-Luc Picard", rank: "Captain"}
```


Generalmente se recomienda colocar todos los parámetros predeterminados al final de una lista de parámetros, para que pueda omitir fácilmente los valores opcionales. Si usa un parámetro predeterminado primero, tendrá que pasar explícitamente `undefined` para usar el valor predeterminado.

A continuación se muestra un ejemplo con el parámetro predeterminado al principio de la lista:


```js
// Define a function with a default parameter at the start of the list
function defaultFirst(a = 1, b) {
  return a + b
}
```


Al llamar a esta función, tendrías que llamar a `defaultFirst()` con dos argumentos:


```js
defaultFirst(undefined, 2)
```


Esto daría lo siguiente:

```sh
Output
3
```

A continuación se muestra un ejemplo con el parámetro predeterminado al final de la lista:


```js
// Define a function with a default parameter at the end of the list
function defaultLast(a, b = 1) {
  return a + b
}

defaultLast(2)
```


Esto produciría el mismo valor:


```sh
Output
3
```


Ambas funciones tienen el mismo resultado, pero la que tiene el último valor predeterminado permite una llamada de función mucho más limpia.

Para ver un ejemplo del mundo real, aquí hay una función que creará un elemento DOM y agregará una etiqueta de texto y clases, si existen.


```js
// Define function to create an element
function createNewElement(tag, text, classNames = []) {
  const el = document.createElement(tag)
  el.textContent = text

  classNames.forEach(className => {
    el.classList.add(className)
  })

  return el
}
```

Puedes llamar a la función con algunas clases en una matriz:



```js
const greeting = createNewElement('p', 'Hello!', ['greeting', 'active'])
```

Llamar `greeting` dará el siguiente valor:


```sh
Output
<p class="greeting active">Hello!</p>
```

Sin embargo, si deja la matriz `classNames` fuera de la llamada a la función, seguirá funcionando.


```js
const greeting2 = createNewElement('p', 'Hello!')
```

`greeting2` ahora tiene el siguiente valor:


```sh
Output
<p>Hello!</p>
```


En este ejemplo, [`forEach()`](./how-to-use-array-methods-in-javascript-iteration-methods.html#foreach) se puede utilizar en una matriz vacía sin problemas. Si esa matriz vacía no estuviera configurada en el parámetro predeterminado, obtendría el siguiente error:



```sh
Output
VM2673:5 Uncaught TypeError: Cannot read property 'forEach' of undefined
    at createNewElement (<anonymous>:5:14)
    at <anonymous>:12:18
```

Ahora que ha visto cómo pueden interactuar múltiples parámetros predeterminados, puede pasar a la siguiente sección para ver cómo funcionan las llamadas a funciones como parámetros predeterminados.

## Llamadas de Funciones Como Parámetros Predeterminados

Además de las primitivas y los objetos, el resultado de llamar a una función se puede utilizar como parámetro predeterminado.

En este bloque de código, creará una función para devolver un número aleatorio y luego usará el resultado como valor de parámetro predeterminado en una función de `cube`:


```js
// Define a function to return a random number from 1 to 10
function getRandomNumber() {
  return Math.floor(Math.random() * 10)
}

// Use the random number function as a default parameter for the cube function
function cube(x = getRandomNumber()) {
  return x * x * x
}
```

Ahora, invocar la función `cube` sin un parámetro tendrá resultados potencialmente diferentes cada vez que la llame:


```js
// Invoke cube function twice for two potentially different results
cube()
cube()
```


El resultado de estas llamadas a funciones variará:


```sh
Output
512
64
```


Incluso puedes usar métodos integrados, como los del objeto `Math`, y usar el valor devuelto en una llamada de función como parámetro en otra función.

En el siguiente ejemplo, se asigna un número aleatorio a `x`, que se utiliza como parámetro en la función `cube` que creó. El parámetro `y` luego calculará la raíz cúbica del número y verificará si `x` e `y` son iguales:


```js
// Assign a random number to x
// Assign the cube root of the result of the cube function and x to y
function doesXEqualY(x = getRandomNumber(), y = Math.cbrt(cube(x))) {
  return x === y
}

doesXEqualY()
```


Esto dará lo siguiente:


```sh
Output
true
```

Un parámetro predeterminado puede incluso ser una definición de función, como se ve en este ejemplo, que define un parámetro como la función `inner` y devuelve la llamada de función del `parameter`:


```js
// Define a function with a default parameter that is an anonymous function
function outer(
  parameter = function inner() {
    return 100
  }
) {
  return parameter()
}

// Invoke outer function
outer()
```

```sh
Output
100
```

Esta función `inner` se creará desde cero cada vez que se invoque la función `outer`.


## Conclusión

En este artículo, aprendió qué son los parámetros de función predeterminados y cómo usarlos. Ahora puede utilizar parámetros predeterminados para ayudar a mantener sus funciones limpias y fáciles de leer. También puede asignar objetos y matrices vacías a parámetros por adelantado para reducir tanto la complejidad como las líneas de código cuando se trata de situaciones como recuperar valores de un objeto o recorrer una matriz.

Si desea obtener más información sobre JavaScript, consulte la página de inicio de nuestra serie [Cómo codificar en JavaScript](./intro.html) o explore nuestra serie [Cómo codificar en Node.js](https://www.digitalocean.com/community/tutorial-series/how-to-code-in-node-js) para obtener artículos sobre desarrollo back-end.