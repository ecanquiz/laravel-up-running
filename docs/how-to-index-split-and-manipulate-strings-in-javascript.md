# Cómo Indexar, Dividir y Manipular Cadenas en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-index-split-and-manipulate-strings-in-javascript)
:::

## Introducción

Una **cadena** es una secuencia de uno o más caracteres que pueden consistir en letras, números o símbolos. Se puede acceder a cada carácter de una cadena de JavaScript mediante un número de índice, y todas las cadenas tienen métodos y propiedades disponibles.

En este tutorial, aprenderemos la diferencia entre las primitivas de cadena y el objeto `String`, cómo se indexan las cadenas, cómo acceder a los caracteres de una cadena y las propiedades y métodos comunes utilizados en las cadenas.

## Primitivas de Cadena y Objetos de Cadena

Primero, aclararemos los dos tipos de cadenas. JavaScript diferencia entre la **cadena primitiva**, un tipo de datos inmutable y el objeto `String`.

Para probar la diferencia entre las dos, inicializaremos una cadena primitiva y un objeto de cadena.

```js
// Initializing a new string primitive
const stringPrimitive = "A new string.";

// Initializing a new String object
const stringObject = new String("A new string."); 
```

Podemos usar el operador `typeof` para determinar el tipo de un valor. En el primer ejemplo, simplemente asignamos una cadena a una variable.


```js
typeof stringPrimitive;
```

```sh
Output
string
```

En el segundo ejemplo, usamos `new String()` para crear un objeto de cadena y asignarlo a una variable.

```js
typeof stringObject;
```

```sh
Output
object
```

La mayor parte del tiempo creará primitivas de cadena. JavaScript puede acceder y utilizar las propiedades y métodos integrados del contenedor de objetos `String` sin cambiar realmente la cadena primitiva que ha creado en un objeto.

Si bien este concepto resulta un poco desafiante al principio, debes tener en cuenta la distinción entre primitivo y objeto. Esencialmente, hay métodos y propiedades disponibles para todas las cadenas y, en segundo plano, JavaScript realizará una conversión a objeto y volverá a primitivo cada vez que se llame a un método o propiedad.

## Cómo se Indexan las Cadenas

Cada uno de los caracteres de una cadena corresponde a un número de índice, comenzando por `0`.

Para demostrarlo, crearemos una cadena con el valor `How are you?`.

<div class="table-wrapper">
  <table>
    <thead>
      <tr>
        <th style="text-align:center">H</th>
        <th style="text-align:center">o</th>
        <th style="text-align:center">w</th>
        <th style="text-align:center"></th>
        <th style="text-align:center">a</th>
        <th style="text-align:center">r</th>
        <th style="text-align:center">e</th>
        <th style="text-align:center"></th>
        <th style="text-align:center">y</th>
        <th style="text-align:center">o</th>
        <th style="text-align:center">u</th>
        <th style="text-align:center">?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align:center">0</td>
        <td style="text-align:center">1</td>
        <td style="text-align:center">2</td>
        <td style="text-align:center">3</td>
        <td style="text-align:center">4</td>
        <td style="text-align:center">5</td>
        <td style="text-align:center">6</td>
        <td style="text-align:center">7</td>
        <td style="text-align:center">8</td>
        <td style="text-align:center">9</td>
        <td style="text-align:center">10</td>
        <td style="text-align:center">11</td>
      </tr>
    </tbody>
  </table>
</div>

El primer carácter de la cadena es `H`, que corresponde al índice `0`. El último carácter es `?`, que corresponde a `11`. Los espacios en blanco también tienen un índice, en `3` y `7`.

Ser capaz de acceder a todos los caracteres de una cadena nos brinda varias formas de trabajar y manipular cadenas.

## Accediendo a Caracteres

Vamos a demostrar cómo acceder a caracteres e índices con la cadena `How are you?`.


```js
"How are you?";
```

Usando la notación entre corchetes, podemos acceder a cualquier carácter de la cadena.


```js
"How are you?"[5];
```


```sh
Output
r
```


Alternativamente, podemos usar `indexOf()` para devolver el número de índice por la primera instancia de un carácter.


```js
"How are you?".indexOf("o");
```

```sh
Output
1
```

Aunque la “o” aparece dos veces en la cadena `How are you?`, `indexOf()` obtendrá la primera instancia.

`lastIndexOf()` se utiliza para encontrar la última instancia.


```js
"How are you?".lastIndexOf("o");
```


```sh
Output
9
```

Para ambos métodos, también puedes buscar varios caracteres en la cadena. Devolverá el número de índice del primer carácter de la instancia.


```js
"How are you?".indexOf("are");
```

```sh
Output
4
```

El método `slice()`, por otro lado, devuelve los caracteres entre dos números de índice. El primer parámetro será el número de índice inicial y el segundo parámetro será el número de índice donde debe terminar.


```js
"How are you?".slice(8, 11);
```


```sh
Output
you
```

Tenga en cuenta que `11` es `?`, pero `?` no es parte de la salida devuelta. `slice()` devolverá lo que está entre el último parámetro, pero sin incluirlo.

Si no se incluye un segundo parámetro, `slice()` devolverá todo, desde el parámetro hasta el final de la cadena.

```js
"How are you?".slice(8);
```


```sh
Output
you?
```


En resumen, `charAt()` y `slice()` ayudarán a devolver valores de cadena basados en números de índice, e `indexOf()` y `lastIndexOf()` harán lo contrario, devolviendo números de índice basados en los caracteres de cadena proporcionados.


## Encontrar la Longitud de una Cadena

Usando la propiedad `length`, podemos devolver el número de caracteres en una cadena.


```js
"How are you?".length;
```


```sh
Output
12
```


Recuerde que la propiedad `length` devuelve el número real de caracteres que comienzan con 1, que da como resultado 12, no el número de índice final, que comienza en `0` y termina en `11`.


## Convertir a Mayúsculas o Minúsculas

Los dos métodos integrados `toUpperCase()` y `toLowerCase()` son formas útiles de formatear texto y hacer comparaciones textuales en JavaScript.

`toUpperCase()` convertirá todos los caracteres a caracteres en mayúsculas.


```js
"How are you?".toUpperCase();
```

```sh
Output
HOW ARE YOU?
```

`toLowerCase()` convertirá todos los caracteres a minúsculas.


```js
"How are you?".toLowerCase();
```


```sh
Output
how are you?
```


Estos dos métodos de formato no requieren parámetros adicionales.

Vale la pena señalar que estos métodos no cambian la cadena original.


## Dividir Cadenas

JavaScript tiene un método muy útil para dividir una cadena por un carácter y crear una nueva [matriz](./understanding-arrays-in-javascript.html) a partir de las secciones. Usaremos el método `split()` para separar la matriz mediante un carácter de espacio en blanco, representado por `" "`.



```js
const originalString = "How are you?";

// Split string by whitespace character
const splitString = originalString.split(" ");

console.log(splitString);
```


```sh
Output
[ 'How', 'are', 'you?' ]
```

Ahora que tenemos una nueva matriz en la variable `splitString`, podemos acceder a cada sección con un número de índice.


```js
splitString[1];
```

```sh
Output
are
```

Si se proporciona un parámetro vacío, `split()` creará una matriz separada por comas con cada carácter de la cadena.

Al dividir cadenas, puede determinar cuántas palabras hay en una oración y utilizar el método como una forma de determinar los nombres y apellidos de las personas, por ejemplo.


## Recortar Espacios en Blanco

El método JavaScript `trim()` elimina los espacios en blanco de ambos extremos de una cadena, pero no de ningún punto intermedio. Los espacios en blanco pueden ser tabulaciones o espacios.



```js
const tooMuchWhitespace = "     How are you?     ";

const trimmed = tooMuchWhitespace.trim();

console.log(trimmed);
```

```sh
Output
How are you?
```

El método `trim()` es una forma sencilla de realizar la tarea común de eliminar el exceso de espacios en blanco.


## Encontrar y Reemplazar Valores de Cadena

Podemos buscar un valor en una cadena y reemplazarlo con un nuevo valor usando el método `replace()`. El primer parámetro será el valor que se encontrará y el segundo parámetro será el valor por el que se reemplazará.


```js
const originalString = "How are you?"

// Replace the first instance of "How" with "Where"
const newString = originalString.replace("How", "Where");

console.log(newString);
```


```sh
Output
Where are you?
```


Además de poder reemplazar un valor con otro valor de cadena, también podemos usar [Expresiones Regulares](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) para hacer que `replace()` sea más poderoso. Por ejemplo, `replace()` solo afecta el primer valor, pero podemos usar el indicador `g` (global) para capturar todas las instancias de un valor y el indicador `i` (no distingue entre mayúsculas y minúsculas) para ignorar mayúsculas y minúsculas.



```js
const originalString = "Javascript is a programming language. I'm learning javascript."

// Search string for "javascript" and replace with "JavaScript"
const newString = originalString.replace(/javascript/gi, "JavaScript");

console.log(newString);
```


```sh
Output
JavaScript is a programming language. I'm learning JavaScript.
```


Esta es una tarea muy común que utiliza expresiones regulares. Visite [Regexr](https://regexr.com/) para practicar más ejemplos de RegEx.


## Conclusión

Las cadenas son uno de los tipos de datos más utilizados y hay muchas cosas que podemos hacer con ellas.

En este tutorial, aprendimos la diferencia entre la cadena primitiva y el objeto `String`, cómo se indexan las cadenas y cómo usar los métodos y propiedades integrados de las cadenas para acceder a caracteres, formatear texto y buscar y reemplazar valores.


Para obtener una descripción más general de las cadenas, lea el tutorial ["Cómo Trabajar con Cadenas en JavaScript"](./how-to-work-with-strings-in-javascript.html).
