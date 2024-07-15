# Cómo Convertir Tipos de Datos en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-convert-data-types-in-javascript)
:::

## Introducción

En JavaScript, [los tipos de datos](./understanding-data-types.html) se utilizan para clasificar un tipo particular de datos, determinando los valores que puede asignar al tipo y las operaciones que puede realizar con él.

Aunque debido a la [coerción de tipos](./how-to-convert-data-types-in-javascript.html#conversion-implicita), JavaScript convertirá automáticamente muchos valores, a menudo es una buena práctica convertir valores manualmente entre tipos para lograr los resultados esperados.

Este tutorial lo guiará a través de la conversión de los tipos de datos primitivos de JavaScript, incluidos números, cadenas y Booleanos.

## Conversión Implícita

Como lenguaje de programación, JavaScript es muy tolerante con valores inesperados. Debido a esto, JavaScript intentará convertir valores inesperados en lugar de rechazarlos por completo. Esta conversión implícita se conoce como coerción de tipo.

Algunos métodos convertirán valores automáticamente para poder utilizarlos. El [método `alert()`](https://www.w3schools.com/jsref/met_win_alert.asp) toma una cadena como parámetro, pero convertirá automáticamente otros tipos en cadenas. Entonces, podemos pasar un valor numérico al método:


```js
alert(8.5);
```

Si ejecutamos la línea anterior, el navegador devolverá un cuadro de diálogo de alerta emergente que muestra el valor `8.5`, excepto que se habrá convertido en una cadena para poder hacerlo.

Al utilizar cadenas que se pueden evaluar en números con [operadores matemáticos](./how-to-do-math-in-javascript-with-operators), encontrará que JavaScript puede manejar los valores convirtiendo implícitamente las cadenas en números, como se muestra en los ejemplos siguientes.


```js
// Subtraction
"15" - "10";
```

```sh
Output
5
```

```js
// Modulo
"15" % "10";
```

```sh
Output
5
```

Sin embargo, no todos los operadores funcionarán como se esperaba. El operador `+` es particularmente problemático ya que puede significar suma o [concatenación de cadenas](./how-to-work-with-strings-in-javascript.html#concatenacion-de-cadenas).


```js
// When working with strings, + stands for concatenation
"2" + "3";
```

```sh
Output
"23"
```

Dado que el operador `+` es multiuso, los valores de cadena de `2` y `3`, a pesar de ser cadenas numéricas, se concatenan con el valor de cadena de `23` en lugar de sumarlos para obtener el número `5`.

Debido a que puede existir ambigüedad y, a veces, provocar resultados inesperados, suele ser mejor convertir explícitamente los tipos de datos en el código tanto como sea posible. Esto ayudará a gestionar las aportaciones de los usuarios y a gestionar los errores.

## Convertir Valores en Cadenas

Los valores se pueden convertir explícitamente en cadenas llamando a `String()` o `n.toString()`.

Con la función `String()`, convertimos un [valor Booleano](./understanding-data-types.html#booleans) en una cadena pasando el valor `true` a los parámetros de `String()`.


```js
String(true);
```

Cuando hagamos esto, se devolverá la cadena literal `"true"`.


```sh
Output
"true"
```

Alternativamente, podemos pasar un número a la función.


```js
String(49);
```

Se devolverá una cadena literal de ese número.


```sh
Output
"49"
```

Usemos la función `String()` con una variable. Asignaremos un valor numérico a la variable `odyssey` y luego usaremos el operador `typeof` para verificar el tipo.


```js
let odyssey = 2001;
console.log(typeof odyssey);
```

```sh
Output
number
```

En este punto, a la variable `odyssey` se le asigna el valor numérico de `2001`, que hemos confirmado que es un número.

Ahora, reasignemos `odyssey` a su equivalente de cadena y luego usemos `typeof` para confirmar que hemos convertido exitosamente el valor de la variable de un número a una cadena.


```js
odyssey = String(odyssey);	// "2001"
console.log(typeof odyssey);
```

```sh
Output
string
```

En el ejemplo anterior, hemos confirmado que `odyssey` fue reasignado para que sea equivalente a un valor de cadena después de la conversión del tipo de datos.

Podemos usar `n.toString()` de forma similar. Podemos reemplazar `n` con una variable:


```js
let blows = 400;
blows.toString();
```

La variable `blows` se devolverá como una cadena.


```sh
Output
"400"
```

Alternativamente, podemos poner un valor entre paréntesis en lugar de una variable con `n.toString()`:


```js
(1776).toString();			// returns "1776"
(false).toString();			// returns "false"
(100 + 200).toString();		// returns "300"
```

Al usar `String()` o `n.toString()` podemos convertir explícitamente valores de Booleanos o [tipos de datos numéricos](./understanding-data-types.html#numbers) en valores de cadena para garantizar que nuestro código se comporte como anticipamos.

## Convertir Valores a Números

Al convertir valores a un tipo de datos numérico, usaremos el método `Number()`. Principalmente, convertiremos cadenas de texto numérico en números, pero también podemos convertir valores Booleanos.

Podemos pasar una cadena de un número al método `Number()`:

```js
Number("1984");
```

La cadena se convertirá en un número y ya no estará entre comillas.


```sh
Output
1984
```

También podemos asignar una cadena a una variable y luego convertirla.

```js
let dalmatians = "101";
Number(dalmatians);
```

```sh
Output
101
```

La cadena literal `"101"` se convirtió al número `101` mediante su variable.

Las cadenas de espacios en blanco o cadenas vacías se convertirán a `0`.


```js
Number(" ");	// returns 0
Number("");		// returns 0
```


Tenga en cuenta que las cadenas que no son números se convertirán a `NaN`, que significa **N**ot **a** **N**umber. Esto incluye números separados por espacios.


```js
Number("twelve");	// returns NaN
Number("20,000");	// returns NaN
Number("2 3");		// returns NaN
Number("11-11-11");	// returns NaN
```

Para tipos de datos Booleanos, `false` se evaluará como `0` y `true` se evaluará como `1`.


```js
Number(false);		// returns 0
Number(true);		// returns 1
```

El método `Number()` convierte tipos de datos no numéricos en números.


## Convertir Valores a Booleanos

Para convertir números o cadenas a valores Booleanos, se utiliza el método `Boolean()`. Esto puede resultar útil para determinar si un usuario ingresó datos en un campo de texto o no, por ejemplo.

Cualquier valor que se interprete como vacío, como el número `0`, una cadena vacía o valores indefinidos, `NaN` o `null`, se convierten en `false`.


```js
Boolean(0);			// returns false
Boolean("");		// returns false
Boolean(undefined);	// returns false
Boolean(NaN);		// returns false
Boolean(null);		// returns false
```

Otros valores se convertirán a `true`, incluidos los literales de cadena compuestos por espacios en blanco.


```js
Boolean(2000);		// returns true
Boolean(" ");		// returns true
Boolean("Maniacs");	// returns true
```

Tenga en cuenta que `"0"` como literal de cadena se convertirá en `true` ya que es un valor de cadena no vacío:


```js
Boolean("0");	// returns true
```


La conversión de números y cadenas a valores Booleanos puede permitirnos evaluar datos dentro de términos binarios y puede aprovecharse para controlar el flujo en nuestros programas.


## Conclusión

Este tutorial cubrió cómo JavaScript maneja la conversión de sus tipos de datos primitivos. Aunque debido a la coerción de tipos, los tipos de datos se convertirán implícitamente en muchos casos, es un buen hábito convertir tipos de datos explícitamente para garantizar que los programas funcionen como se espera.


Para obtener más información sobre los tipos de datos de JavaScript, lea "[Comprender Tipos de Datos en JavaScript](./understanding-data-types.html)". 
