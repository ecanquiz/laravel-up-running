# Comprender Variables, Alcance y Elevación en JavaScript


:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/understanding-variables-scope-hoisting-in-javascript)
:::


## Introducción

Las _variables_ son una parte fundamental de muchos lenguajes de programación y se encuentran entre los primeros y más importantes conceptos que deben aprender los codificadores novatos. Hay varias propiedades diferentes de las variables en JavaScript, así como varias reglas que se deben seguir al nombrarlas. En JavaScript, se utilizan tres palabras clave para declarar una variable (`var`, `let` y `const`) y cada una afecta la forma en que el código interpretará la variable de manera diferente.

Este tutorial cubrirá qué son las variables, cómo declararlas y nombrarlas, y también analizará más de cerca la diferencia entre `var`, `let` y `const`. También revisaremos los efectos de la elevación y la importancia del alcance global y local para el comportamiento de una variable.

## Comprender las Variables

Una [variable](https://developer.mozilla.org/en-US/docs/Glossary/Variable) es un contenedor con nombre que se utiliza para almacenar valores. Un fragmento de información al que podríamos hacer referencia varias veces se puede almacenar en una variable para su uso o modificación posterior. En JavaScript, el valor contenido dentro de una variable puede ser cualquier [tipo de datos de JavaScript](./understanding-data-types.html), incluido un número, una cadena o un objeto.

Antes de la especificación del lenguaje [ECMAScript 2015 (ES6)](https://262.ecma-international.org/6.0/) en la que se basa el JavaScript actual, solo había una forma de declarar una variable: utilizando la palabra clave `var`. Como resultado, la mayoría de los códigos y recursos de aprendizaje más antiguos solo usarán `var` para las variables. Repasaremos las diferencias entre las palabras clave `var`, `let` y `const` en [su propia sección](./understanding-variables-scope-and-hoisting.html) a continuación.

Podemos usar `var` para demostrar el concepto de variable en sí. En el siguiente ejemplo, _declararemos_ una variable y le _asignaremos_ un valor.


```js
// Assign the string value Sammy to the username identifier
var username = "sammy_shark";
```

Esta declaración consta de algunas partes:

- La declaración de una variable usando la palabra clave `var`
- El nombre de la variable (o identificador), `username`
- La operación de asignación, representada por la sintaxis `=`
- El valor que se asigna, `"sammy_shark"`

Ahora podemos usar `username` en el código. JavaScript recordará que `username` representa el valor de la cadena `sammy_shark`.


```js
// Check if variable is equal to value
if (username === "sammy_shark") {
  console.log(true);
}
```

```sh
Output
true
```

Como se mencionó anteriormente, las variables se pueden usar para representar cualquier tipo de datos de JavaScript. En este ejemplo, declararemos variables con valores de cadena, numéricos, de objeto, Booleanos y nulos.


```js
// Assignment of various variables
var name = "Sammy";
var spartans = 300;
var kingdoms = [ "mammals", "birds", "fish" ];
var poem = { roses: "red", violets: "blue" }; 
var success = true;
var nothing = null;
```

Usando `console.log`, podemos ver el valor contenido en una variable específica.


```js
// Send spartans variable to the console
console.log(spartans);
```

```sh
Output
300
```

Las variables almacenan datos en la memoria a los que luego se puede acceder y modificar. Las variables también se pueden reasignar y darles un nuevo valor. El siguiente ejemplo simplificado demuestra cómo se puede almacenar una contraseña en una variable y luego actualizarla.


```js
// Assign value to password variable
var password = "hunter2";

// Reassign variable value with a new value
password = "hunter3";

console.log(password);
```

```sh
Output
'hunter3'
```

En un programa real, lo más probable es que una contraseña se almacene de forma segura en una base de datos. Este ejemplo, sin embargo, ilustra una situación en la que es posible que necesitemos actualizar el valor de una variable. El valor de `password` era `hunter2`, pero la reasignamos a `hunter3`, que es el valor que JavaScript reconoce a partir de ese momento.


## Nombrar Variables

Los nombres de variables se conocen como _identificadores_ en JavaScript. Discutimos varias de las reglas para nombrar identificadores en [Comprender Sintaxis y Estructura del Código en JavaScript](./understanding-syntax-and-code-structure-in-javascript.html), que se resumen aquí:

- Los nombres de las variables solo pueden constar de letras (`a-z`), números (`0-9`), símbolos de signo de dólar (`$`) y guiones bajos (`_`).
- Los nombres de las variables no pueden contener espacios en blanco (tabulaciones o espacios).
- Los números no pueden comenzar el nombre de ninguna variable.
- Hay varias [palabras clave reservadas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Reserved_keywords_as_of_ECMAScript_2015) que no se pueden utilizar como nombre de una variable.
- Los nombres de las variables distinguen entre mayúsculas y minúsculas.

JavaScript también tiene la convención de usar camel case (a veces estilizado como camelCase) en los nombres de funciones y variables declaradas con `var` o `let`. Esta es la práctica de escribir la primera palabra en minúscula y luego poner en mayúscula la primera letra de cada palabra posterior sin espacios entre ellas. La mayoría de las variables que no son constantes seguirán esta convención, con algunas excepciones. Los nombres de las variables que son constantes, declaradas con la palabra clave `const`, normalmente se escriben todo en mayúsculas.

Esto puede parecer un montón de reglas que aprender, pero muy rápidamente se convertirá en algo natural escribir nombres de variables válidos y convencionales.

## Diferencia Entre `var`, `let` y `const`

JavaScript tiene tres palabras clave diferentes para declarar una variable, lo que añade una capa extra de complejidad al lenguaje. Las diferencias entre los tres se basan en el alcance, la elevación y la reasignación.


|Palabra Clave|Alcance|Elevación|Puede Ser Reasignado|Can Be Redeclared|
|-|-|-|-|-|
|[`var`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)|Alcance de función|Sí|Sí|Sí|
|[`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)|Alcance de bloque|No|Sí|No|
|[`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)|Alcance de bloque|No|No|No|



Quizás te preguntes cuál de los tres deberías utilizar en tus propios programas. Una práctica comúnmente aceptada es usar `const` tanto como sea posible y `let` en el caso de bucles y reasignaciones. Generalmente, `var` se puede evitar fuera de trabajar en código heredado.

## Alcance Variable

El alcance en JavaScript se refiere al contexto actual del código, que determina la accesibilidad de las variables a JavaScript. Los dos tipos de alcance son _local_ y _global_:

- Las **variables globales** son aquellas declaradas fuera de un bloque.
- Las **variables locales** son aquellas declaradas dentro de un bloque.

En el siguiente ejemplo, crearemos una variable global.


```js
// Initialize a global variable
var creature = "wolf";
```

Aprendimos que las variables se pueden reasignar. Usando el alcance local, podemos crear nuevas variables con el mismo nombre que una variable en un alcance externo sin cambiar ni reasignar el valor original.

En el siguiente ejemplo, crearemos una variable `species` global. Dentro de la función hay una variable local con el mismo nombre. Al enviarlos a la consola podemos ver como el valor de la variable es diferente según el alcance, y el valor original no cambia.


```js
// Initialize a global variable
var species = "human";
 
function transform() {
  // Initialize a local, function-scoped variable
  var species = "werewolf";
  console.log(species);
}

// Log the global and local variable
console.log(species);
transform();
console.log(species);
```


```sh
Output
human
werewolf
human
```

En este ejemplo, la variable local tiene un _alcance de función_. Las variables declaradas con la palabra clave `var` siempre tienen un alcance de función, lo que significa que reconocen que las funciones tienen un alcance separado. Por lo tanto, no se puede acceder a esta variable de alcance local desde el alcance global.


Sin embargo, las nuevas palabras clave `let` y `const` tienen _alcance de bloque_. Esto significa que se crea un nuevo alcance local a partir de cualquier tipo de bloque, incluidos bloques de funciones, sentencias `if` y bucles `for` y `while`.

Para ilustrar la diferencia entre variables con alcance de función y de bloque, asignaremos una nueva variable en un bloque `if` usando `let`.


```js
var fullMoon = true;

// Initialize a global variable
let species = "human";

if (fullMoon) {
  // Initialize a block-scoped variable
  let species = "werewolf";
  console.log(`It is a full moon. Lupin is currently a ${species}.`);
}

console.log(`It is not a full moon. Lupin is currently a ${species}.`);
```

```sh
Output
It is a full moon. Lupin is currently a werewolf.
It is not a full moon. Lupin is currently a human.
```

En este ejemplo, la variable `species` tiene un valor global (`human`) y otro valor local (`werewolf`). Sin embargo, si usáramos `var`, el resultado sería diferente.


```js
// Use var to initialize a variable
var species = "human";

if (fullMoon) {
  // Attempt to create a new variable in a block
  var species = "werewolf";
  console.log(`It is a full moon. Lupin is currently a ${species}.`);
}

console.log(`It is not a full moon. Lupin is currently a ${species}.`);
```

```sh
Output
It is a full moon. Lupin is currently a werewolf.
It is not a full moon. Lupin is currently a werewolf.
```

En el resultado de este ejemplo, tanto la variable global como la variable de ámbito de bloque terminan con el mismo valor, `werewolf`. Esto se debe a que en lugar de crear una nueva variable local con `var`, estás reasignando la misma variable en el mismo alcance. `var` no reconoce `if` como parte de un alcance nuevo y diferente. Generalmente se recomienda declarar variables con alcance de bloque, ya que producen código que es menos probable que anule involuntariamente los valores de las variables.

## Elevación

En la mayoría de los ejemplos hasta ahora, hemos usado `var` para declarar una variable y la hemos _inicializado_ con un valor. Después de declarar e inicializar, podemos acceder o reasignar la variable.

Si intentamos utilizar una variable antes de que haya sido declarada e inicializada, devolverá un valor `undefined`.

```js
// Attempt to use a variable before declaring it
console.log(x);

// Variable assignment
var x = 100;
```

```sh
Output
undefined
```

Sin embargo, si omitimos la palabra clave `var`, ya no declaramos la variable, solo la inicializamos. Devolverá un `ReferenceError` y detendrá la ejecución del script.


```js
// Attempt to use a variable before declaring it
console.log(x);

// Variable assignment without var
x = 100;
```

```sh
Output
ReferenceError: x is not defined
```

La razón de esto se debe a la elevación, un comportamiento de JavaScript en el que las declaraciones de variables y funciones se mueven a la parte superior de su alcance. Dado que solo se genera la declaración real, no la inicialización, el valor en el primer ejemplo devuelve `undefined`.

Para demostrar este concepto más claramente, a continuación se muestra el código que escribimos y cómo JavaScript realmente lo interpretó.


```js
// The code we wrote
console.log(x);
var x = 100;

// How JavaScript interpreted it
var x;
console.log(x);
x = 100;
```

JavaScript guardó `x` en la memoria como una variable antes de la ejecución del script. Como todavía se llamó antes de definirlo, el resultado es `undefined` y no es `100`. Sin embargo, no provoca un `ReferenceError` ni detiene el script. Aunque la palabra clave `var` en realidad no cambió la ubicación de la `var`, esta es una representación útil de cómo funciona la elevación. Sin embargo, este comportamiento puede causar problemas porque el programador que escribió este código probablemente espera que la salida de `x` sea `100`, cuando en cambio es `undefined`.

También podemos ver cómo la elevación puede generar resultados impredecibles en el siguiente ejemplo:


```js
// Initialize x in the global scope
var x = 100;

function hoist() {
  // A condition that should not affect the outcome of the code
  if (false) {
    var x = 200;
  }
  console.log(x);
}

hoist();
```

```js
Output
undefined
```

En este ejemplo, declaramos que `x` es `100` globalmente. Dependiendo de una declaración `if`, `x` podría cambiar a `200`, pero como la condición era `false` no debería haber afectado el valor de `x`. En cambio, `x` se elevó a la parte superior de la función `hoist()` y el valor quedó `undefined`.

Este tipo de comportamiento impredecible puede causar errores en un programa. Dado que `let` y `const` tienen un alcance de bloque, no se elevarán de esta manera, como se ve a continuación.


```js
// Initialize x in the global scope
let x = true;

function hoist() {
  // Initialize x in the function scope
  if (3 === 4) {
    let x = false;
  }
  console.log(x);
}

hoist();
```


```sh
Output
true
```

La declaración duplicada de variables, que es posible con `var`, arrojará un error con `let` y `const`.


```js
// Attempt to overwrite a variable declared with var
var x = 1;
var x = 2;

console.log(x);
```


```sh
Output
2
```

```js
// Attempt to overwrite a variable declared with let
let y = 1;
let y = 2;

console.log(y);
```

```sh
Output
Uncaught SyntaxError: Identifier 'y' has already been declared
```

En resumen, las variables introducidas con `var` tienen el potencial de verse afectadas por el levantamiento, un mecanismo en JavaScript en el que las declaraciones de variables se guardan en la memoria. Esto puede resultar en variables indefinidas en el código de uno. La introducción de `let` y `const` resuelve este problema generando un error al intentar utilizar una variable antes de declararla o al intentar declarar una variable más de una vez.

## Constantes

Muchos lenguajes de programación presentan _constantes_, que son valores que no se pueden modificar ni cambiar. En JavaScript, el identificador `const` se modela a partir de constantes y los valores asignados a una `const` no se pueden reasignar.

Es una convención común escribir todos los identificadores `const` en mayúsculas. Esto los marca como fácilmente distinguibles de otros valores variables.

En el siguiente ejemplo, inicializamos la variable `SPECIES` como una constante con la palabra clave `const`. Intentar reasignar la variable resultará en un error.


```js
// Assign value to const
const SPECIES = "human"; 

// Attempt to reassign value
SPECIES = "werewolf";

console.log(SPECIES);
```


```sh
Output
Uncaught TypeError: Assignment to constant variable.
```

Dado que los valores `const` no se pueden reasignar, deben declararse e inicializarse al mismo tiempo, o también generarán un error.


```js
// Declare but do not initialize a const
const TODO;

console.log(TODO);
```


```sh
Output
Uncaught SyntaxError: Missing initializer in const declaration
```


Los valores que no pueden cambiar en programación se conocen como _inmutables_, mientras que los valores que se pueden cambiar son _mutables_. Aunque los valores `const` no se pueden reasignar, son mutables ya que es posible modificar las propiedades de los objetos declarados con `const`.


```js
// Create a CAR object with two properties
const CAR = {
	color: "blue",
	price: 15000
}

// Modify a property of CAR
CAR.price = 20000;

console.log(CAR);
```


```sh
Output
{ color: 'blue', price: 20000 }
```

Las constantes son útiles para dejarle claro a usted mismo y a otros programadores que trabajan en un proyecto con usted que la variable deseada no debe reasignarse. Si espera que una variable pueda modificarse en el futuro, probablemente desee utilizar `let` para declarar la variable.


## Conclusión

En este tutorial, repasamos qué es una variable, las reglas para nombrar una variable y cómo reasignar valores de variable. También aprendimos sobre el alcance y la elevación, algunas de las limitaciones de la palabra clave `var` original, así como cómo `let` y `const` rectifican esos problemas.





