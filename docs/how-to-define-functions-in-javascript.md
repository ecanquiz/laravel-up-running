# Cómo Definir Funciones en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-define-functions-in-javascript)
:::

## Introducción

Una **función** es un bloque de código que realiza una acción o devuelve un valor. Las funciones son códigos personalizados definidos por programadores que son reutilizables y, por lo tanto, pueden hacer que sus programas sean más modulares y eficientes.

En este tutorial, aprenderemos varias formas de definir una función, llamar a una función y usar parámetros de función en JavaScript.

## Definiendo una Función

Las funciones se definen o declaran con la palabra clave `function`. A continuación se muestra la sintaxis de una función en JavaScript.



```js
function nameOfFunction() {
  // Code to be executed
}
```


La declaración comienza con la palabra clave `function`, seguida del nombre de la función. Los nombres de funciones siguen las mismas reglas que las variables: pueden contener letras, números, guiones bajos y signos de dólar, y con frecuencia se escriben en [camel case](./understanding-syntax-and-code-structure-in-javascript.html#identificadores). El nombre va seguido de un conjunto de paréntesis, que se pueden utilizar para parámetros opcionales. El código de la función está contenido entre llaves, al igual que una [declaración `for`](./for-loops-for-of-loops-and-for-in-loops-in-javascript.html) o una [declaración `if`](./how-to-write-conditional-statements-in-javascript.html).

En nuestro primer ejemplo, haremos una **declaración de función** para imprimir una declaración de saludo en la consola.


```js
// Initialize greeting function
function greet() {
  console.log("Hello, World!");
}
```

Aquí tenemos el código para imprimir `Hello, World!` a la consola contenida dentro de la función `greet()`. Sin embargo, no sucederá nada y no se ejecutará ningún código hasta que **invoquemos** o llamemos a la función. Puede invocar una función escribiendo el nombre de la función seguido del paréntesis.



```js
// Invoke the function
greet();
```


Ahora los juntaremos, definiremos nuestra función e invocaremos.


📃`greet.js`
```js
// Initialize greeting function
function greet() {
  console.log("Hello, World!");
}

// Invoke the function
greet();
```

Con la llamada a `greet();`, la función se ejecutará y recibiremos el mensaje `Hello, World!` como salida del programa.


```sh
Output
Hello, World!
```

Ahora tenemos nuestro código `greet()` contenido en una función y podemos reutilizarlo tantas veces como queramos.

Usando parámetros, podemos hacer que el código sea más dinámico.

## Parámetros de Función

En nuestro archivo `greet.js`, creamos una función básica que imprime `Hello, World` en la consola. Usando parámetros, podemos agregar funcionalidad adicional que hará que el código sea más flexible. Los **parámetros** son entradas que se pasan a funciones como nombres y se comportan como variables locales.

Cuando un usuario inicia sesión en una aplicación, es posible que deseemos que el programa lo salude por su nombre, en lugar de simplemente decir "Hello, World!".

Agregaremos un parámetro a nuestra función, llamado `name`, para representar el nombre de la persona a la que se saluda.


```js
// Initialize custom greeting function
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

El nombre de la función es `greet` y ahora tenemos un único parámetro dentro del paréntesis. El nombre del parámetro sigue las mismas reglas que el nombre de una variable. Dentro de la función, en lugar de una cadena estática que consta de `Hello, World`, tenemos una cadena [literal de plantilla](./how-to-work-with-strings-in-javascript.html#variables-en-cadenas-con-literales-de-plantilla) que contiene nuestro parámetro, que ahora se comporta como una variable local.

Notarás que no hemos definido nuestro parámetro `name` en ninguna parte. Le asignamos un valor cuando invocamos nuestra función. Suponiendo que nuestro usuario se llama Sammy, llamaremos a la función y colocaremos el nombre de usuario como **argumento**. El argumento es el valor real que se pasa a la función; en este caso es la cadena `"Sammy"`.


```js
// Invoke greet function with "Sammy" as the argument
greet("Sammy");
```

El valor de `"Sammy"` se pasa a la función a través del parámetro `name`. Ahora, cada vez que se utilice `name` en toda la función, representará el valor `"Sammy"`. Aquí está el código completo.


📃`greetSammy.js`
```js
// Initialize custom greeting function
function greet(name) {
  console.log(`Hello, ${name}!`);
}

// Invoke greet function with "Sammy" as the argument
greet("Sammy");
```

Cuando ejecutamos el programa anterior, recibiremos el siguiente resultado.


```sh
Output
Hello, Sammy!
```

Ahora tenemos un ejemplo de cómo se puede reutilizar una función. En un ejemplo del mundo real, la función extraería el nombre de usuario de una base de datos en lugar de proporcionar directamente el nombre como valor de argumento.

Además de los parámetros, se pueden declarar variables dentro de las funciones. Estas variables se conocen como **variables locales** y solo existirán dentro del alcance de su propio bloque de funciones. El alcance de las variables determina la accesibilidad de las variables; Las variables que se definen dentro de una función no son accesibles desde fuera de la función, pero se pueden usar tantas veces como se usa su función en un programa.



## Valores Devueltos

Se puede utilizar más de un parámetro en una función. Podemos pasar múltiples valores a una función y devolver un valor. Crearemos una función para encontrar la suma de dos valores, representados por `x` e `y`.

📃`sum.js`
```js
// Initialize add function
function add(x, y) {
  return x + y;
}

// Invoke function to find the sum
add(9, 7);
```

En el programa anterior, definimos una función con los parámetros `x` e `y`, y luego pasamos los valores de `9` y `7` a la función. Cuando ejecutamos el programa, recibiremos la suma de esos números como resultado.


```sh
Output
16
```

En este caso, con `9` y `7` pasados ​​a la función `sum()`, el programa devolvió `16`.

Cuando se utiliza la palabra clave `return`, la función deja de ejecutarse y se devuelve el valor de la expresión. Aunque en este caso el navegador mostrará el valor en la consola, no es lo mismo que usar `console.log()` para imprimir en la consola. Al invocar la función se generará el valor exactamente donde se invocó la función. Este valor se puede utilizar inmediatamente o colocar en una variable.


## Expresiones de Función

En la última sección, usamos una declaración de función para obtener la suma de dos números y devolver ese valor. También podemos crear una [expresión de función](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) asignando una función a una variable.

Usando nuestro mismo ejemplo de función `add`, podemos aplicar directamente el valor devuelto a una variable, en este caso `sum`.


📃`functionExpression.js`
```js
// Assign add function to sum constant
const sum = function add(x, y) {
  return x + y;
}

// Invoke function to find the sum
sum(20, 5);
```

```sh
Output
25
```

Ahora la constante `sum` es una función. Podemos hacer que esta expresión sea más concisa convirtiéndola en una **función anónima**, que es una función sin nombre. Actualmente, nuestra función tiene el nombre `add`, pero con las expresiones de función no es necesario nombrar la función y el nombre generalmente se omite.


📃`anonymousExpression.js`
```js
// Assign function to sum constant
const sum = function(x, y) {
	return x + y;
}

// Invoke function to find the sum
sum(100, 3);
```

```sh
Output
103
```

En este ejemplo, eliminamos el nombre de la función que era `add` y la convertimos en una función anónima. Se podría utilizar una expresión de función con nombre para ayudar en la depuración, pero normalmente se omite.


## Funciones de Flecha

Hasta ahora, hemos visto cómo definir funciones usando la palabra clave `function`. Sin embargo, existe un método más nuevo y conciso para definir una función conocida como **expresiones de función de flecha** a partir de [ECMAScript 6](https://262.ecma-international.org/6.0/). Las funciones de flecha, como se las conoce comúnmente, se representan mediante un signo igual seguido de un signo mayor que: `=>`.

Las funciones de flecha son siempre funciones anónimas y un tipo de expresión de función. Podemos crear un ejemplo básico para encontrar el producto de dos números.


📃`arrowFunction.js`
```js
// Define multiply function
const multiply = (x, y) => {
	return x * y;
}

// Invoke function to find product
multiply(30, 4);
```

```sh
Output
120
```

En lugar de escribir la palabra clave `function`, usamos la flecha `=>` para indicar una función. De lo contrario, funciona de manera similar a una expresión de función regular, con algunas diferencias avanzadas que puede leer en [Funciones de Flecha en Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#arrow_functions).


En el caso de un solo parámetro, se pueden excluir los paréntesis. En este ejemplo, elevamos `x` al cuadrado, lo que solo requiere que se pase un número como argumento. Se han omitido los paréntesis.


```js
// Define square function
const square = x => {
	return x * x;
}

// Invoke function to find product
square(8);
```


```sh
Output
64
```


:::info Nota
En el caso de que no haya parámetros, se requiere un conjunto vacío de paréntesis `()` en las funciones de flecha.
:::



Con estos ejemplos particulares que solo consisten en una declaración `return`, las funciones de flecha permiten reducir aún más la sintaxis. Si la función es un `return` de una sola línea, se pueden omitir tanto las llaves como la declaración `return`, como se ve en el siguiente ejemplo.


```js
// Define square function
const square = x => x * x;

// Invoke function to find product
square(10);
```

```sh
Output
100
```

Estos tres tipos de sintaxis dan como resultado la misma salida. Generalmente es una cuestión de preferencia o de estándares de codificación de la empresa decidir cómo estructurará sus propias funciones.


## Conclusión

En este tutorial, cubrimos declaraciones de funciones y expresiones de funciones, devolución de valores de funciones, asignación de valores de funciones a variables y funciones de flecha de ES6.

Las funciones son bloques de código que devuelven un valor o realizan una acción, lo que hace que los programas sean escalables y modulares.
