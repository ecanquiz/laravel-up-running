# Cómo Hacer Matemáticas en JavaScript con Operadores


:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-do-math-in-javascript-with-operators)
:::

## Introducción

Las operaciones matemáticas se encuentran entre las características más fundamentales y universales de cualquier lenguaje de programación. En JavaScript, los números se utilizan con frecuencia para tareas comunes como encontrar las dimensiones del tamaño de la ventana del navegador, obtener el precio final de una transacción monetaria y calcular la distancia entre elementos en un documento de un sitio web.

Aunque un conocimiento de alto nivel de las matemáticas no es un requisito previo para ser un desarrollador capaz, es importante saber qué tipos de operaciones están disponibles en JavaScript y cómo utilizar las matemáticas como herramienta para realizar tareas prácticas.

A diferencia de otros lenguajes de programación, JavaScript sólo tiene un [tipo de datos numérico](./understanding-data-types.html#numbers); no se hace distinción entre números enteros (números enteros positivos o negativos) y flotantes (números con punto decimal), por ejemplo.

En este tutorial, repasaremos los operadores aritméticos, los operadores de asignación y el orden de las operaciones utilizadas con los tipos de datos numéricos de JavaScript.

## Operadores Aritméticos

Los **operadores aritméticos** son símbolos que indican una operación matemática y devuelven un valor. En la ecuación `3 + 7 = 10`, el `+` es la sintaxis que significa suma.

JavaScript tiene muchos operadores familiares de matemáticas básicas, así como algunos operadores adicionales específicos de programación.

Aquí hay una tabla de referencia de operadores aritméticos de JavaScript.

|Operador|Sintaxis|Ejemplo|Definición|
|-|-|-|-|
|Adición|`+`|`x + y`|Suma de `x` e `y`
|Sustracción|`-`|`x - y`|Resta de `x` e `y`|
|Multiplicación|`*`|`x * y`|Producto de `x` e `y`|
|División|`/`|`x / y`|Cociente de `x` e `y`|
|Módulo|`%`|`x % y`|Resto de `x / y`|
|Exponenciación|`**`|`x ** y`|`x` elevado a `y`|
|Incremento|`++`|`x++`|`x` más uno|
|Decremento|`--`|`x--`|`x` menos uno|

Entraremos en más detalles sobre cada uno de estos operadores a lo largo de este artículo.


## Adición y Sustracción

Los operadores de **adición** y **sustracción** están disponibles en JavaScript y se pueden usar para encontrar la suma y resta de valores numéricos. JavaScript tiene una calculadora incorporada y las operaciones matemáticas se pueden realizar directamente en la consola.

Podemos hacer algunas sumas simples con números, por ejemplo sumando `10` y `20`, usando el signo más (`+`).


```js
10 + 20;
```

```sh
Output
30
```

Además de hacer matemáticas con números simples, también podemos asignar números a variables y realizar los mismos cálculos. En este caso, asignaremos los valores numéricos a `x` e `y` y colocaremos la suma en `z`.


```js
// Assign values to x and y
let x = 10;
let y = 20;

// Add x and y and assign the sum to z
let z = x + y;

console.log(z);
```

```sh
Output
30
```

De manera similar, usamos el signo menos (`-`) para restar números o variables que representan números.


```js
// Assign values to x and y
let x = 10;
let y = 20;

// Subtract x from y and assign the difference to z
let z = y - x;

console.log(z);
```

```sh
Output
10
```


También podemos sumar y restar con números negativos y flotantes (decimales).


```js
// Assign values to x and y
let x = -5.2;
let y = 2.5;

// Subtract y from x and assign the difference to z
let z = x - y;

console.log(z);
```


```sh
Output
-7.7
```


Una cosa interesante a tener en cuenta y a tener en cuenta en JavaScript es el resultado de sumar un número y una [cadena](./how-to-work-with-strings-in-javascript.html). Sabemos que `1 + 1` debería ser igual a `2`, pero esta ecuación tendrá resultados inesperados.



```js
let x = 1 + "1";

console.log(x);
typeof x;
```


```sh
Output
11
'string'
```

En lugar de sumar los dos números, JavaScript convertirá la declaración completa en una cadena y los [concatenará](./how-to-work-with-strings-in-javascript.html#concatenacion-de-cadenas). Es importante tener cuidado con la naturaleza de tipo dinámico de JavaScript, ya que puede tener resultados no deseados.

Una razón común para usar la suma o resta en JavaScript sería desplazarse hasta una identificación menos la altura en píxeles de una barra de navegación fija.


```js
function scrollToId() {
	const navHeight = 60;
	window.scrollTo(0, window.pageYOffset - navHeight);
}

window.addEventListener('hashchange', scrollToId);
```

En el ejemplo anterior, al hacer clic en una identificación, se desplazará a 60 píxeles por encima de la identificación.

La suma y la resta son dos de las ecuaciones matemáticas más comunes que utilizarás en JavaScript.


## Multiplicación y División

Los operadores de **multiplicación** y **división** también están disponibles en JavaScript y se utilizan para encontrar el producto y el cociente de valores numéricos.

Se utiliza un asterisco (`*`) para representar el operador de multiplicación.


```js
// Assign values to x and y
let x = 20;
let y = 5;

// Multiply x by y to get the product
let z = x * y;

console.log(z);
```

```sh
Output
100
```

La multiplicación se puede utilizar para calcular el precio de un artículo después de aplicar el impuesto sobre las ventas.


```js
const price = 26.5;    // Price of item before tax
const taxRate = 0.082; // 8.2% tax rate

// Calculate total after tax to two decimal places
let totalPrice = price + (price * taxRate);
let fixedPrice = totalPrice.toFixed(2);

console.log("Total:", fixedPrice);
```


```sh
Output
Total: 28.67
```

Se utiliza una barra diagonal (`/`) para representar el operador de división.


```js
// Assign values to x and y
let x = 20;
let y = 5;

// Divide y into x to get the quotient
let z = x / y;

console.log(z);
```

```sh
Output
4
```

La división es particularmente útil al calcular el tiempo, como encontrar la cantidad de horas en una cantidad de minutos, o al calcular el porcentaje de respuestas correctas completadas en una prueba.


## Módulo

Un operador aritmético que es un poco menos familiar es el operador de _modulo_ (a veces conocido como _modulus_), que calcula el resto de un cociente después de la división. El módulo está representado por un signo de porcentaje (`%`).

Como ejemplo, sabemos que `3` cabe en `9` exactamente tres veces y no queda ningún resto.


```js
9 % 3;
```

```sh
Output
0
```

Podemos usar el operador de módulo para determinar si un número es par o impar, como se ve con esta función:


```js
// Initialize function to test if a number is even
const isEven = x => {
	// If the remainder after dividing by two is 0, return true
	if (x % 2 === 0) {
		return true;
	}
	// If the number is odd, return false
	return false;
}

// Test the number
isEven(12);
```

```sh
Output
true
```

En el ejemplo anterior, `12` se divide uniformemente entre `2`, por lo tanto, es un número par.


A menudo, en programación, el módulo se utiliza junto con declaraciones condicionales para el control de flujo.


## Exponenciación

La exponenciación es uno de los operadores más nuevos en JavaScript y nos permite calcular la potencia de un número por su exponente. La sintaxis de la exponenciación es dos asteriscos seguidos (`**`).

10 elevado a la quinta potencia, o 10^5, se escribe así:


```js
10 ** 5;
```

```sh
Output
100000
```

`10 ** 5` representa lo mismo que `10` multiplicado por `10` cinco veces:


```js
10 * 10 * 10 * 10 * 10;
```

Otra forma de escribir esto es con el método `Math.pow()`.


```js
Math.pow(10, 5);
```

```sh
Output
100000
```

Usar el operador de exponenciación es una forma concisa de encontrar la potencia de un número determinado, pero como siempre, es importante mantener la coherencia con el estilo de su código base al elegir entre un método y un operador.

## Incremento y Decremento

Los operadores de incremento y decremento aumentan o reducen el valor numérico de una variable en uno. Están representados por dos signos más (`++`) o dos signos menos (`--`) y, a menudo, se utilizan con [bucles](./for-loops-for-of-loops-and-for-in-loops-in-javascript#bucle-for).

Tenga en cuenta que los operadores de incremento y decremento sólo se pueden utilizar en variables; intentar usarlos en un número sin formato resultará en un error.

```js
7++
```

```sh
Output
Uncaught ReferenceError: Invalid left-hand side expression in postfix operation
```

Los operadores de incremento y decremento se pueden clasificar como operaciones de prefijo o postfijo, dependiendo de si el operador se coloca antes o después de la variable.

Primero, podemos enviar un mensaje de texto con el incremento del prefijo, con `++x`.


```js
// Set a variable
let x = 7;

// Use the prefix increment operation
let prefix = ++x;

console.log(prefix);
```


```sh
Output
8
```

El valor de `x` se incrementó en uno. Para ver la diferencia, probaremos el incremento de postfix con `y++`.


```js
// Set a variable
let y = 7;

// Use the prefix increment operation
let postfix = y++;

console.log(postfix);
```


```sh
Output
7
```



El valor de `y` no aumentó en la operación _postfix_. Esto se debe a que el valor no se incrementará hasta que se haya evaluado la expresión.


El operador de incremento o decremento se verá con mayor frecuencia en un bucle. En este ejemplo de bucle `for`, ejecutaremos la operación diez veces, comenzando con `0` y aumentando el valor en `1` con cada iteración.



```js
// Run a loop ten times
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```


```sh
Output
0
1
2
3
4
5
6
7
8
9
```


El código anterior muestra una iteración a través de un bucle que se logra mediante el uso del operador de incremento.

Podemos pensar en `x++` como una abreviatura de `x = x + 1`, y en `x--` como una abreviatura de `x = x - 1`.

## Operadores de Asignación

Uno de los operadores más utilizados es el operador de **asignación**, que ya hemos visto y está representado por un signo igual (`=`). Usamos `=` para asignar un valor de la derecha a una variable de la izquierda.


```js
// Assign 27 to age variable
let age = 27;
```

Además del operador de asignación estándar, JavaScript tiene **operadores de asignación compuestos**, que combinan un operador aritmético con `=`.

Por ejemplo, el operador de suma comenzará con el valor original y agregará un valor nuevo.

```js
// Assign 27 to age variable
let age = 27;

age += 3;

console.log(age);
```

```sh
Output
30
```

En este caso, `age += 3` es lo mismo que escribir `age = age + 3`.

Todos los operadores aritméticos se pueden combinar con la asignación para crear operadores de asignación compuestos. A continuación se muestra una tabla de referencia de operadores de asignación en JavaScript.

|Operador|Sintaxis|
|-|-|
|Asignación|`=`|
|Asignación de adición|`+=`|
|Asignación de sustracción|`-=`|
|Asignación de multiplicación|`*=`|
|Asignación de división|`/=`|
|Asignación de restante|`%=`|
|Asignación de exponenciación|`**=`|

Los operadores de asignación compuesta se utilizan a menudo con bucles, similares a los de incremento y decremento, y se utilizan cuando es necesario repetir o automatizar ecuaciones.

## Precedencia del Operador

Aunque leemos de izquierda a derecha, los operadores se evaluarán en orden de precedencia, tal como en las matemáticas normales.

En el siguiente ejemplo, la multiplicación tiene mayor prioridad que la suma, lo que determina el resultado de la ecuación.


```js
// First multiply 3 by 5, then add 10
10 + 3 * 5;
```

```sh
Output
25
```


Si en cambio quisiéramos ejecutar primero la operación de suma, deberíamos agruparla entre paréntesis, que siempre tiene la mayor prioridad.


```js
// First add 10 and 3, then multiply by 5
(10 + 3) * 5;
```

```sh
Output
65
```

A continuación se muestra una tabla de referencia de precedencia de operadores aritméticos en JavaScript, de mayor a menor. Para incrementos y decrementos, el postfijo tiene mayor prioridad que el prefijo.

El incremento/decremento, la multiplicación/división y la adición/subtración tienen el mismo nivel de prioridad.


|Operador|Sintaxis|
|-|-|
|Paréntesis|`()`|
|Incremento|`++`|
|Decrementación|`--`|
|Exponenciación|`**`|
|Multiplicación|`*`|
|División|`/`|
|adición|`+`|
|subtración|`-`|


La precedencia de operadores incluye no sólo operadores aritméticos, sino también operadores de asignación, operadores lógicos, operadores condicionales y más. Para obtener una lista completa, consulte [la precedencia de operadores en Mozilla Developer Network (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence).


## Conclusión

En este artículo, cubrimos los operadores aritméticos y la sintaxis, incluidos muchos operadores matemáticos familiares y algunos que son específicos de la programación.

Además, aprendimos cómo combinar aritmética y asignación para crear operadores de asignación compuestos y el orden de las operaciones en JavaScript.