# Comprender Tipos de Datos en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/understanding-data-types-in-javascript)
:::

## Introducción

Los **tipos de datos** se utilizan para clasificar un tipo particular de datos en los lenguajes de programación. Por ejemplo, un número y una cadena de caracteres son diferentes tipos de datos que JavaScript tratará de manera diferente.

Esto es importante porque el tipo de datos específico que utilice determinará qué valores puede asignarle y qué puede hacerle. Es decir, para poder realizar operaciones con variables en JavaScript, es importante comprender el tipo de datos de cualquier variable dada.

En este tutorial, repasaremos cómo funcionan los tipos de datos en JavaScript, así como los tipos de datos importantes nativos del lenguaje. Esta no es una investigación exhaustiva de los tipos de datos, pero lo ayudará a familiarizarse con las opciones disponibles en JavaScript.

## Tipado Dinámico

JavaScript tiene tipos de datos dinámicos, lo que significa que la verificación de tipos se realiza en tiempo de ejecución en lugar de en tiempo de compilación. Los [tipos de datos](https://www.digitalocean.com/community/tutorials/understanding-data-types-in-python-3) de Python también son dinámicamente tipados.

Con lenguajes tipados dinámicamente, una variable con el mismo nombre se puede usar para contener diferentes tipos de datos.

Por ejemplo, la variable `t`, definida como una variable por la palabra clave `let` (tenga en cuenta que `let` mantiene una variable dada con un alcance limitado), puede asignarse para contener diferentes tipos de datos, o puede inicializarse pero dejarse sin definir:

```js
let t = 16;			// t is a number
let t = "Teresa";	// t is a string
let t = true;		// t is a Boolean
let t;				// t is undefined
```

Cada una de las variables `t` anteriores se puede establecer en cualquier tipo de datos disponible en JavaScript; no es necesario declararlos explícitamente con un tipo de datos antes de usarlos.

## Numbers

JavaScript tiene solo un tipo de número, no hay una designación separada para números enteros y números de coma flotante. Debido a esto, los números se pueden escribir en JavaScript con o sin decimales:

```js
let num1 = 93;
let num2 = 93.00;
```

En los dos casos anteriores, el tipo de datos es un número y es el mismo independientemente de si el número tiene puntos decimales o no.

La notación exponencial científica se puede utilizar en JavaScript para abreviar números muy grandes o pequeños, como en los siguientes ejemplos:

```js
let num3 = 987e8;		// 98700000000
let num4 = 987e-8;		// 0.00000987
```

Los números en JavaScript se consideran precisos hasta 15 dígitos. Eso significa que los números se redondearán después de alcanzar el dígito 16:

```js
let num5 = 999999999999999;		// remains as 999999999999999
let num6 = 9999999999999999;	// rounded up to 10000000000000000
```

Además de representar números, el tipo de número de JavaScript también tiene tres valores simbólicos disponibles:

- `Infinity`: un valor numérico que representa un número **positivo** que se acerca al infinito
- `-Infinito`: un valor numérico que representa un número **negativo** que se aproxima al infinito
- `NaN`: un valor numérico que representa un número que **N**ot **a** **N**umber (no es un número).

Se devolverá `Infinity` o `-Infinity` si calcula un número fuera del número más grande posible disponible en JavaScript. Esto también ocurrirá para valores que no están definidos, como cuando se divide por cero:

```js
let num7 = 5 / 0;	// will return Infinity
let num8 = -5 / 0;	// will return -Infinity
```

En términos técnicos, `Infinity` se mostrará cuando un número exceda el número `1.797693134862315E+308`, que representa el límite superior en JavaScript.

De manera similar, se mostrará `-Infinity` cuando un número supere el límite inferior de `-1.797693134862316E+308`.

El número `Infinity` también se puede usar en bucles:

```js
while (num9 != Infinity) { 
	// Code here will execute through num9 = Infinity
}
```

Para los números que no son números legales, se mostrará `NaN`. Si intenta realizar una operación matemática en un número y un valor no numérico, se devolverá `NaN`. Este es el caso en el siguiente ejemplo:

```js
let x = 20 / "Shark";	// x will be NaN
```

Dado que el número `20` no se puede dividir por la cadena `"Shark"` porque no se puede evaluar como un número, el valor devuelto para la variable `x` es `NaN`.

Sin embargo, si una cadena se puede evaluar como un valor numérico, la expresión matemática se puede realizar en JavaScript:

```js
let y = 20 / "5";	// y will be 4
```

En el ejemplo anterior, dado que la cadena `"5"` se puede evaluar como un valor numérico en JavaScript, se trata como tal y funcionará con el operador matemático de división, `/`.

Al asignar el valor `NaN` a una variable utilizada en una operación, dará como resultado el valor de `NaN`, incluso cuando el otro operando sea un número legal:

```js
let a = NaN;
let b = 37;
let c = a + b; 	// c will be NaN
```

Solo hay un tipo de datos numéricos en JavaScript. Cuando trabaje con números, cualquier número que ingrese se interpretará como el tipo de datos para números; no es necesario que declare qué tipo de datos está ingresando porque JavaScript se escribe dinámicamente.

## Strings

Una **cadena** es una secuencia de uno o más caracteres (letras, números, símbolos). Las cadenas son útiles porque representan datos textuales.

En JavaScript, las cadenas existen entre comillas simples `'` o comillas dobles `"`, por lo que para crear una cadena, incluya una secuencia de caracteres entre comillas:

```js
let singleQuotes = 'This is a string in single quotes.';
```
```js
let doubleQuotes = "This is a string in double quotes.";
```

Puede optar por utilizar comillas simples o comillas dobles, pero lo que decida debe mantener la coherencia dentro de un programa.

El programa “Hello, World!” demuestra cómo se puede usar una cadena en la programación de computadoras, como los caracteres que componen la frase `Hello, World!` en el `alert()` a continuación son una cadena.

`hello.html`
```html
<!DOCTYPE HTML>
<html>
<head>
<script>
function helloFunction() {
    alert("Hello, World!");
}
</script>
</head>
<body>
<p><button onclick="helloFunction()">Click me</button></p>
</body>
</html>
```

Cuando ejecutamos el código y hacemos clic en el botón `Click me`, recibiremos una ventana emergente con el siguiente resultado:

```sh
Output
Hello, World!
```

Al igual que con otros tipos de datos, podemos almacenar cadenas en variables:

```js
let hw = "Hello, World!";
```

Y muestra la cadena en el `alert()` llamando a la variable:

`hello.html`

```html
...
<script>
let hw = "Hello, World!";
function helloFunction() {
    alert(hw);
}
</script>
...
```

```sh
Output
Hello, World!
```

Hay muchas operaciones que podemos realizar en cadenas dentro de nuestros programas para manipularlas y lograr los resultados que buscamos. Las cadenas son importantes para comunicar información al usuario y para que el usuario comunique información al programa.

## Booleans

El tipo de datos **Boolean** puede ser uno de dos valores, `true` o `false`. Los valores booleanos se utilizan para representar los valores de verdad que están asociados con la rama lógica de las matemáticas, que informa los algoritmos en informática.

Muchas operaciones en matemáticas nos dan respuestas que se evalúan como verdaderas o falsas:

- **mayor que**
  - 500 > 100 `true`
  - 1 > 5 `false`
- **menor que**
  - 200 < `400 true`
  - 4 < 2 `false`
- **igual**
  - 5 = 5 `true`
  - 500 = 400 `false`

Al igual que con otros tipos de datos, podemos almacenar un valor Boolean en una variable:

```js
let myBool = 5 > 8;	// false
```

Dado que `5` no es mayor que `8`, la variable `myBool` tiene el valor `false`.

A medida que escriba más programas en JavaScript, se familiarizará más con el funcionamiento de los valores Booleans y con la forma en que las diferentes funciones y operaciones que se evalúan como verdaderas o falsas pueden cambiar el curso del programa.

## Arrays

Un **arreglo** puede contener múltiples valores dentro de una sola variable. Esto significa que puede contener una lista de valores dentro de un  arreglo e iterar a través de ellos.

Cada elemento o valor que está dentro de un arreglo se denomina **elemento**. Puede hacer referencia a los elementos de un arreglo utilizando un número de índice.

Así como las cadenas se definen como caracteres entre comillas, los arreglos se definen teniendo valores entre corchetes `[ ]`.

Un arreglo de cadenas, por ejemplo, se ve así:

```js
let fish = ["shark", "cuttlefish", "clownfish", "eel"];
```

Si llamamos a la variable `fish`, recibiremos el siguiente resultado:

```js
["shark", "cuttlefish", "clownfish", "eel"]
```

Los arreglos son un tipo de datos muy flexible porque son mutables en el sentido de que se pueden agregar, eliminar y cambiar valores de elementos.

## Objects

El tipo de datos **object** de JavaScript puede contener muchos valores como pares `name:value`. Estos pares proporcionan una forma útil de almacenar y acceder a los datos. La sintaxis literal del objeto se compone de pares nombre:valor separados por dos puntos con llaves a cada lado `{ }`.

Por lo general, se usa para contener datos relacionados, como la información contenida en un ID, un objeto literal de JavaScript se ve así, con espacios en blanco entre las propiedades:

```js
let sammy = {firstName:"Sammy", lastName:"Shark", color:"blue", location:"ocean"};
```
Alternativamente, y especialmente para objetos literales con una gran cantidad de pares nombre:valor, podemos escribir este tipo de datos en varias líneas, con un espacio en blanco después de cada dos puntos:

```js
let sammy = {
    firstName: "Sammy",
    lastName: "Shark",
    color: "blue",
    location: "Ocean"
};
```

La variable de objeto `sammy` en cada uno de los ejemplos anteriores tiene 4 propiedades: `firstName`, `lastName`, `color` y `location`. Cada uno de estos valores pasados son separados por dos puntos.

## Trabajar con Múltiples Tipos de Datos

Si bien cada programa que cree contendrá múltiples tipos de datos, es importante tener en cuenta que, por lo general, realizará operaciones dentro del mismo tipo de datos. Es decir, estarás realizando operaciones matemáticas con números o rebanando cadenas.

Cuando utiliza un operador que funciona en todos los tipos de datos, como el operador `+` que puede sumar números o concatenar cadenas, puede lograr resultados inesperados.

Por ejemplo, al usar el operador `+` con números y cadenas juntos, los números se tratarán como una cadena (por lo tanto, se concatenarán), pero el orden de los tipos de datos influirá en la concatenación.

Entonces, si crea una variable que realiza la siguiente concatenación, JavaScript interpretará cada elemento a continuación como una cadena:

```js
let o = "Ocean" + 5 + 3;
```

Si llama a la variable `o`, obtendrá el siguiente valor devuelto:

```sh
Output
Ocean53
```

Sin embargo, si comienza con números, los dos números se agregarán antes de que se interpreten como una cadena cuando el tiempo de ejecución del programa llegue a `"Ocean"`, por lo que el valor devuelto será la suma de los dos números concatenados con la cadena:

```js
let p = 5 + 3 + "Ocean";
```

```sh
Output
8Ocean
```

Debido a estos resultados inesperados, es probable que realice operaciones y métodos dentro de un tipo de datos en lugar de entre ellos. JavaScript, sin embargo, no devuelve errores al mezclar tipos de datos, como lo hacen otros lenguajes de programación.

## Conclusión

En este punto, debería tener una mejor comprensión de algunos de los principales tipos de datos que están disponibles para su uso en JavaScript.

Cada uno de estos tipos de datos será importante a medida que desarrolle proyectos de programación en el lenguaje JavaScript.
