# Comprender Desestructuración, Parámetros _Resto_ y Sintaxis Propagada en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/understanding-destructuring-rest-parameters-and-spread-syntax-in-javascript)
:::


## Introducción

Desde la [Edición 2015](https://262.ecma-international.org/6.0/) de la especificación ECMAScript, se han puesto a disposición del lenguaje [JavaScript](/intro.html) muchas funciones nuevas para trabajar con [matrices](./understanding-arrays-in-javascript.html) y [objetos](./understanding-objects-in-javascript.html). Algunos de los más importantes que aprenderá en este artículo son la sintaxis de _desestructuración_, _parámetros resto_ y _propagación_. Estas características proporcionan formas más directas de acceder a los miembros de una matriz o de un objeto y pueden hacer que trabajar con estas estructuras de datos sea más rápido y conciso.

Muchos otros lenguajes no tienen una sintaxis correspondiente para desestructurar, parámetros _resto_ y propagación, por lo que estas características pueden tener una curva de aprendizaje tanto para los nuevos desarrolladores de JavaScript como para aquellos que vienen de otro lenguaje. En este artículo, aprenderá cómo desestructurar objetos y matrices, cómo usar el operador de propagación para desempaquetar objetos y matrices, y cómo usar parámetros _resto_ en llamadas a funciones.

>Para lograr un significado más metafórico, en este artículo se conservará la palabra original **_Spread_** en lugar de su traducción a **_Propagación_**.

## Desestructuración

La _asignación de desestructuración_ es una sintaxis que le permite asignar propiedades de objetos o elementos de una matriz como variables. Esto puede reducir en gran medida las líneas de código necesarias para manipular datos en estas estructuras. Hay dos tipos de desestructuración: desestructuración de Objetos y desestructuración de Matrices.

### Desestructuración de Objetos

La desestructuración de objetos le permite crear nuevas [variables](./understanding-variables-scope-and-hoisting.html#comprender-las-variables) utilizando una propiedad de objeto como valor.

Considere este ejemplo, un objeto que representa una nota con un `id`, `title` y `date`:


```js
const note = {
  id: 1,
  title: 'My first note',
  date: '01/01/1970',
}
```

Tradicionalmente, si quisieras crear una nueva variable para cada propiedad, tendrías que asignar cada variable individualmente, con mucha repetición:


```js
// Create variables from the Object properties
const id = note.id
const title = note.title
const date = note.date
```


Con la desestructuración de objetos, todo esto se puede hacer en una sola línea. Al rodear cada variable entre llaves `{}`, JavaScript creará nuevas variables a partir de cada propiedad con el mismo nombre:


```js
// Destructure properties into variables
const { id, title, date } = note
```

Ahora, [`console.log()`](./how-to-use-the-js-dev-console.html#trabajando-en-la-consola) las nuevas variables:


```js
console.log(id)
console.log(title)
console.log(date)
```

Obtendrá los valores de propiedad originales como resultado:


```sh
Output
1
My first note
01/01/1970
```


:::info Nota
La desestructuración de un objeto no modifica el objeto original. Aún puedes llamar al `note` original con todas sus entradas intactas.
:::

La asignación predeterminada para la desestructuración de objetos crea nuevas variables con el mismo nombre que la propiedad del objeto. Si no desea que la nueva variable tenga el mismo nombre que el nombre de la propiedad, también tiene la opción de cambiar el nombre de la nueva variable usando dos puntos (`:`) para decidir un nuevo nombre, como se ve con `noteId` en la siguiente:


```js
// Assign a custom name to a destructured value
const { id: noteId, title, date } = note
```

Registre la nueva variable `noteId` en la consola:


```js
console.log(noteId)
```

Recibirá el siguiente resultado:


```sh
Output
1
```

También puede desestructurar valores de objetos anidados. Por ejemplo, actualice el objeto `note` para que tenga un objeto `author` anidado:



```js
const note = {
  id: 1,
  title: 'My first note',
  date: '01/01/1970',
  author: {
    firstName: 'Sherlock',
    lastName: 'Holmes',
  },
}
```


Ahora puede desestructurar `note`, luego desestructurarla una vez más para crear variables a partir de las propiedades de `author`:


```js
// Destructure nested properties
const {
  id,
  title,
  date,
  author: { firstName, lastName },
} = note
```


A continuación, registre las nuevas variables `firstName` y `lastName` usando [literales de plantilla](./how-to-work-with-strings-in-javascript.html#concatenacion-de-cadenas):


```js
console.log(`${firstName} ${lastName}`)
```

Esto dará el siguiente resultado:


```sh
Output
Sherlock Holmes
```


Tenga en cuenta que en este ejemplo, aunque tiene acceso al contenido del objeto `author`, el objeto `author` en sí no es accesible. Para acceder a un objeto y a sus valores anidados, deberá declararlos por separado:


```js
// Access object and nested values
const {
  author,
  author: { firstName, lastName },
} = note

console.log(author)
```

Este código generará el objeto de `author`:


```sh
Output
{firstName: "Sherlock", lastName: "Holmes"}
```


Deestructurar un objeto no sólo es útil para reducir la cantidad de código que hay que escribir; también le permite orientar su acceso a las propiedades que le interesan.


Finalmente, la desestructuración se puede utilizar para acceder a las propiedades del objeto de los valores primitivos. Por ejemplo, [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) es un objeto global para cadenas y tiene una propiedad `length`:


```js
const { length } = 'A string'
```


Esto encontrará la propiedad de longitud inherente de una cadena y la igualará a la variable `length`. Registre `length` para ver si esto funcionó:


```js
console.log(length)
```

Obtendrá el siguiente resultado:


```sh
Output
8
```

La cadena `A string` se convirtió implícitamente en un objeto aquí para recuperar la propiedad `length`.


### Desestructuración de Matrices

La desestructuración de matrices le permite crear nuevas variables utilizando un elemento de matriz como valor. Considere este ejemplo, una matriz con las distintas partes de una fecha:


```js
const date = ['1970', '12', '01']
```


Se garantiza que las matrices en JavaScript conservarán su orden, por lo que en este caso el primer índice siempre será un año, el segundo será el mes, y así sucesivamente. Sabiendo esto, puedes crear variables a partir de los elementos de la matriz:


```js
// Create variables from the Array items
const year = date[0]
const month = date[1]
const day = date[2]
```


Pero hacer esto manualmente puede ocupar mucho espacio en su código. Con la desestructuración de matrices, puedes descomprimir los valores de la matriz en orden y asignarlos a sus propias variables, así:


```js
// Destructure Array values into variables
const [year, month, day] = date
```


Ahora registre las nuevas variables:


```js
console.log(year)
console.log(month)
console.log(day)
```

Obtendrá el siguiente resultado:


```sh
Output
1970
12
01
```


Los valores se pueden omitir dejando la sintaxis de desestructuración en blanco entre comas:



```js
// Skip the second item in the array
const [year, , day] = date

console.log(year)
console.log(day)
```


Ejecutar esto dará el valor de `year` y `day`:


```sh
Output
1970
01
```


Las matrices anidadas también se pueden desestructurar. Primero, crea una matriz anidada:


```js
// Create a nested array
const nestedArray = [1, 2, [3, 4], 5]
```

Luego desestructura esa matriz y registra las nuevas variables:


```js
// Destructure nested items
const [one, two, [three, four], five] = nestedArray

console.log(one, two, three, four, five)
```


Recibirá el siguiente resultado:


```js
Output
1 2 3 4 5
```


La sintaxis de desestructuración se puede aplicar para desestructurar los parámetros de una función. Para probar esto, desestructurará las `keys` y los `values` de [`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries).


Primero, declara el objeto `note`:


```js
const note = {
  id: 1,
  title: 'My first note',
  date: '01/01/1970',
}
```


Dado este objeto, podría enumerar los pares clave-valor desestructurando los argumentos a medida que se pasan al [método `forEach()`](./how-to-use-array-methods-in-javascript-iteration-methods.html#foreach):


```js
// Using forEach
Object.entries(note).forEach(([key, value]) => {
  console.log(`${key}: ${value}`)
})
```


O podrías lograr lo mismo usando un [bucle `for`](./for-loops-for-of-loops-and-for-in-loops-in-javascript.html#bucle-for):


```js
// Using a for loop
for (let [key, value] of Object.entries(note)) {
  console.log(`${key}: ${value}`)
}
```

De cualquier manera, recibirá lo siguiente:


```sh
Output
id: 1
title: My first note
date: 01/01/1970
```


La desestructuración de objetos y la desestructuración de matrices se pueden combinar en una única tarea de desestructuración. Los [parámetros predeterminados](./understanding-default-parameters-in-javascript.html) también se pueden usar con la desestructuración, como se ve en este ejemplo que establece la fecha predeterminada en [`new Date()`](./understanding-date-and-time-in-javascript.html#el-objeto-de-fecha).

Primero, declara el objeto `note`:


```js
const note = {
  title: 'My first note',
  author: {
    firstName: 'Sherlock',
    lastName: 'Holmes',
  },
  tags: ['personal', 'writing', 'investigations'],
}
```



Luego desestructura el objeto y al mismo tiempo configura una nueva variable `date` con el valor predeterminado de `new Date()`:



```js
const {
  title,
  date = new Date(),
  author: { firstName },
  tags: [personalTag, writingTag],
} = note

console.log(date)
```

`console.log(date)` dará un resultado similar al siguiente:


```sh
Output
Fri May 08 2020 23:53:49 GMT-0500 (Central Daylight Time)
```


Como se muestra en esta sección, la sintaxis de asignación de desestructuración agrega mucha flexibilidad a JavaScript y le permite escribir código más conciso. En la siguiente sección, verá cómo se puede utilizar la sintaxis _spread_ para expandir las estructuras de datos en sus entradas de datos constituyentes.


## _Spread_

La sintaxis _spread_ `(...)` es otra adición útil a JavaScript para trabajar con matrices, objetos y llamadas a funciones. _Spread_ permite descomprimir o expandir objetos e iterables (como matrices), lo que se puede utilizar para hacer copias superficiales de estructuras de datos para aumentar la facilidad de manipulación de datos.

### _Spread_ con Matrices

_Spread_ puede simplificar tareas comunes con matrices. Por ejemplo, digamos que tienes dos matrices y quieres combinarlas:






```js
// Create an Array
const tools = ['hammer', 'screwdriver']
const otherTools = ['wrench', 'saw']
```


Originalmente usarías [`concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) para concatenar las dos matrices:


```js
// Concatenate tools and otherTools together
const allTools = tools.concat(otherTools)
```

Ahora también puedes usar _spread_ para descomprimir las matrices en una nueva matriz:


```js
// Unpack the tools Array into the allTools Array
const allTools = [...tools, ...otherTools]

console.log(allTools)
```

Ejecutar esto daría lo siguiente:


```sh
Output
["hammer", "screwdriver", "wrench", "saw"]
```


Esto puede resultar particularmente útil con la inmutabilidad. Por ejemplo, es posible que esté trabajando con una aplicación que tiene `users` almacenados en una serie de objetos:


```js
// Array of users
const users = [
  { id: 1, name: 'Ben' },
  { id: 2, name: 'Leslie' },
]
```


Podrías usar `push` para modificar la matriz existente y agregar un nuevo usuario, que sería la opción mutable:


```js
// A new user to be added
const newUser = { id: 3, name: 'Ron' }

users.push(newUser)
```

Pero esto cambia la matriz `users`, que quizás queramos preservar.

_Spread_ le permite crear una nueva matriz a partir de la existente y agregar un nuevo elemento al final:


```js
const updatedUsers = [...users, newUser]

console.log(users)
console.log(updatedUsers)
```

Ahora la nueva matriz, `updatedUsers`, tiene el nuevo usuario, pero la matriz de usuarios original permanece sin cambios:


```sh
Output
[{id: 1, name: "Ben"}
 {id: 2, name: "Leslie"}]

[{id: 1, name: "Ben"}
 {id: 2, name: "Leslie"}
 {id: 3, name: "Ron"}]
```

Crear copias de datos en lugar de cambiar los datos existentes puede ayudar a evitar cambios inesperados. En JavaScript, cuando crea un objeto o matriz y lo asigna a otra variable, en realidad no está creando un nuevo objeto, sino que está pasando una referencia.

Tomemos este ejemplo, en el que se crea una matriz y se asigna a otra variable:


```js
// Create an Array
const originalArray = ['one', 'two', 'three']

// Assign Array to another variable
const secondArray = originalArray
```

Eliminar el último elemento del segundo Array modificará el primero:


```js
// Remove the last item of the second Array
secondArray.pop()

console.log(originalArray)
```

Esto dará la salida:


```sh
Output
["one", "two"]
```


_Spread_ le permite hacer una copia superficial de una matriz u objeto, lo que significa que cualquier propiedad de nivel superior se clonará, pero los objetos anidados se seguirán pasando por referencia. Para matrices u objetos simples, una copia superficial puede ser todo lo que necesita.

Si escribe el mismo código de ejemplo pero copia la matriz con extensión, la matriz original ya no se modificará:


```js
// Create an Array
const originalArray = ['one', 'two', 'three']

// Use spread to make a shallow copy
const secondArray = [...originalArray]

// Remove the last item of the second Array
secondArray.pop()

console.log(originalArray)
```

Lo siguiente se registrará en la consola:


```sh
Output
["one", "two", "three"]
```

_Spread_ también se puede utilizar para convertir un [set](./understanding-map-and-set-objects-in-javascript.html) o cualquier otro [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#Iterable_examples) en una matriz.

Cree un nuevo conjunto y agréguele algunas entradas:


```js
// Create a set
const set = new Set()

set.add('octopus')
set.add('starfish')
set.add('whale')
```

A continuación, utilice el operador de extensión con `set` y registre los resultados:


```js
// Convert Set to Array
const seaCreatures = [...set]

console.log(seaCreatures)
```


Esto dará lo siguiente:


```sh
Output
["octopus", "starfish", "whale"]
```

Esto también puede resultar útil para crear una matriz a partir de una cadena:


```sh
const string = 'hello'

const stringArray = [...string]

console.log(stringArray)
```

Esto dará una matriz con cada carácter como un elemento de la matriz:


```sh
Output
["h", "e", "l", "l", "o"]
```


### _Spread_ con Objetos


Cuando se trabaja con objetos, se puede utilizar _spread_ para copiar y actualizar objetos.


Originalmente, [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) se usaba para copiar un objeto:



```js
// Create an Object and a copied Object with Object.assign()
const originalObject = { enabled: true, darkMode: false }
const secondObject = Object.assign({}, originalObject)
```

El `secondObject` ahora será un clon del `originalObject`.

Esto se simplifica con la sintaxis _spread_ — puedes copiar superficialmente un objeto propagándolo en uno nuevo:


```js
// Create an object and a copied object with spread
const originalObject = { enabled: true, darkMode: false }
const secondObject = { ...originalObject }

console.log(secondObject)
```


Esto dará como resultado lo siguiente:


```sh
Output
{enabled: true, darkMode: false}
```

Al igual que con las matrices, esto solo creará una copia superficial y los objetos anidados se seguirán pasando por referencia.

Agregar o modificar propiedades en un objeto existente de forma inmutable se simplifica con _spread_. En este ejemplo, la propiedad `isLoggedIn` se agrega al objeto `user`:


```js
const user = {
  id: 3,
  name: 'Ron',
}

const updatedUser = { ...user, isLoggedIn: true }

console.log(updatedUser)
```


Esto generará lo siguiente:


```js
Output
{id: 3, name: "Ron", isLoggedIn: true}
```


Una cosa importante a tener en cuenta al actualizar objetos mediante _spread_ es que cualquier objeto anidado también deberá propagarse. Por ejemplo, digamos que en el objeto `user` hay un objeto `organization` anidado:


```js
const user = {
  id: 3,
  name: 'Ron',
  organization: {
    name: 'Parks & Recreation',
    city: 'Pawnee',
  },
}
```


Si intenta agregar un nuevo elemento a `organization`, se sobrescribirán los campos existentes:


```js
const updatedUser = { ...user, organization: { position: 'Director' } }

console.log(updatedUser)
```


Esto daría como resultado lo siguiente:


```sh
Output
id: 3
name: "Ron"
organization: {position: "Director"}
```


Si la mutabilidad no es un problema, el campo podría actualizarse directamente:


```js
user.organization.position = 'Director'
```


Pero como buscamos una solución inmutable, podemos propagar el objeto interno para conservar las propiedades existentes:


```js
const updatedUser = {
  ...user,
  organization: {
    ...user.organization,
    position: 'Director',
  },
}

console.log(updatedUser)
```


Esto dará lo siguiente:


```sh
Output
id: 3
name: "Ron"
organization: {name: "Parks & Recreation", city: "Pawnee", position: "Director"}
```


### _Spread_ Difundir Llamadas de Funciones

_Spread_ también se puede utilizar con argumentos en llamadas de funciones.

Como ejemplo, aquí hay una función `multiply` que toma tres parámetros y los multiplica:



```js
// Create a function to multiply three items
function multiply(a, b, c) {
  return a * b * c
}
```


Normalmente, pasarías tres valores individualmente como argumentos para la llamada a la función, así:


```js
multiply(1, 2, 3)
```

Esto daría lo siguiente:


```sh
Output
6
```


Sin embargo, si todos los valores que desea pasar a la función ya existen en una matriz, la sintaxis extendida le permite usar cada elemento de una matriz como argumento:


```js
const numbers = [1, 2, 3]

multiply(...numbers)
```


Esto dará el mismo resultado:


```js
Output
6
```


::: info Nota
Sin _spread_, esto se puede lograr usando `apply()`:

```js
multiply.apply(null, [1, 2, 3])
```

Esto dará:

```sh
Output
6
```
:::

Ahora que has visto cómo _spread_ puede acortar tu código, puedes echar un vistazo a un uso diferente de la sintaxis `...`: parámetros _resto_.

## Parámetros _Resto_


La última característica que aprenderá en este artículo es la sintaxis del parámetro _resto_. La sintaxis parece la misma que _spread_ (`...`) pero tiene el efecto opuesto. En lugar de descomprimir una matriz u objeto en valores individuales, la sintaxis _resto_ creará una matriz de un número indefinido de argumentos.

En la función `restTest` por ejemplo, si quisiéramos que `args` fuera una matriz compuesta por un número indefinido de argumentos, podríamos tener lo siguiente:



```js
function restTest(...args) {
  console.log(args)
}

restTest(1, 2, 3, 4, 5, 6)
```


Todos los argumentos pasados ​​a la función `restTest` ahora están disponibles en la matriz `args`:



```sh
Output
[1, 2, 3, 4, 5, 6]
```


La sintaxis _resto_ se puede utilizar como único parámetro o como último parámetro de la lista. Si se usa como único parámetro, reunirá todos los argumentos, pero si está al final de una lista, reunirá todos los argumentos restantes, como se ve en este ejemplo:


```js
function restTest(one, two, ...args) {
  console.log(one)
  console.log(two)
  console.log(args)
}

restTest(1, 2, 3, 4, 5, 6)
```


Esto tomará los dos primeros argumentos individualmente y luego agrupará el _resto_ en una matriz:


```sh
Output
1
2
[3, 4, 5, 6]
```


En el código antiguo, la variable `arguments` se podía utilizar para recopilar todos los argumentos pasados ​​a una función:


```js
function testArguments() {
  console.log(arguments)
}

testArguments('how', 'many', 'arguments')
```

Esto daría el siguiente resultado:


```sh
[secondary_label Output]1
Arguments(3) ["how", "many", "arguments"]
```


Sin embargo, esto tiene algunas desventajas. Primero, la variable `arguments` no se puede usar con funciones de flecha.


```js
const testArguments = () => {
  console.log(arguments)
}

testArguments('how', 'many', 'arguments')
```


Esto produciría un error:


```sh
Output
Uncaught ReferenceError: arguments is not defined
```


Además, `arguments` no es una matriz verdadera y no pueden usar métodos como [`map` y `filter`](./how-to-use-array-methods-in-javascript-iteration-methods.html#map) sin antes convertirse en una matriz. También recopilará todos los argumentos pasados ​​en lugar de solo el _resto_ de los argumentos, como se ve en el ejemplo `restTest(one, two, ...args)`.

_Rest_ también se puede utilizar al desestructurar matrices:



```js
const [firstTool, ...rest] = ['hammer', 'screwdriver', 'wrench']

console.log(firstTool)
console.log(rest)
```


Esto dará:


```sh
Output
hammer
["screwdriver", "wrench"]
```


_Resto_ también se puede utilizar al desestructurar objetos:


```js
const { isLoggedIn, ...rest } = { id: 1, name: 'Ben', isLoggedIn: true }

console.log(isLoggedIn)
console.log(rest)
```


Dando el siguiente resultado:


```sh
Output
true
{id: 1, name: "Ben"}
```


De esta manera, la sintaxis _resto_ proporciona métodos eficientes para reunir una cantidad indeterminada de elementos.

## Conclusión

En este artículo, aprendió sobre la desestructuración, la sintaxis _spread_ y los parámetros _resto_. En resumen:

- La desestructuración se utiliza para crear variables a partir de elementos de una matriz o propiedades de objetos.
- La sintaxis _spread_ se utiliza para descomprimir iterables como matrices, objetos y llamadas a funciones.
- La sintaxis del parámetro _resto_ creará una matriz a partir de un número indefinido de valores.

La desestructuración, los parámetros _resto_ y la sintaxis _spread_ son funciones útiles en JavaScript que ayudan a mantener el código conciso y limpio.


