# Cómo Utilizar la Declaración Switch en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-the-switch-statement-in-javascript)
:::

## Introducción

Las declaraciones condicionales se encuentran entre las características más útiles y comunes de todos los lenguajes de programación. [Cómo Escribir Declaraciones Condicionales en JavaScript](./how-to-write-conditional-statements-in-javascript.html) describe cómo usar las palabras clave `if`, `else` y `else if` para controlar el flujo de un programa en función de varias condiciones, que en JavaScript suelen ser el resultado de la entrada del usuario.

Además de `if...else`, JavaScript tiene una característica conocida como declaración `switch`. Un cambio es un tipo de declaración condicional que evaluará una expresión frente a múltiples casos posibles y ejecutará uno o más bloques de código en función de los casos coincidentes. La declaración `switch` está estrechamente relacionada con una declaración condicional que contiene muchos bloques `else if` y, a menudo, se pueden usar indistintamente.

En este tutorial, aprenderemos cómo usar la declaración `switch`, así como también cómo usar las palabras clave relacionadas `case`, `break` y `default`. Finalmente, veremos cómo usar múltiples casos en una declaración `switch`.

## Switch

La declaración `switch` evalúa una expresión y ejecuta código como resultado de un caso coincidente. La sintaxis básica es similar a la de una declaración `if`. Siempre se escribirá con `switch(){}`, con paréntesis que contienen la expresión que se va a probar y llaves que contienen el código potencial a ejecutar.

A continuación se muestra un ejemplo de una declaración `switch` con dos declaraciones `case` y un recurso alternativo conocido como `default`.



```js
switch (expression) {
  case x:
    // execute case x code block
    break;
  case y:
	// execute case y code block
	break;
  default:
	// execute default code block
}
```

Siguiendo la lógica del bloque de código anterior, lo siguiente es la secuencia de eventos que tendrán lugar:

- Se evalúa la expresión.
- El primer `case`, `x`, se comparará con la expresión. Si coincide, el código se ejecutará y la palabra clave `break` finalizará el bloque `switch`.
- Si no coincide, se omitirá `x` y el caso `y` se comparará con la expresión. Si `y` coincide con la expresión, el código se ejecutará y saldrá del bloque `switch`.
- Si ninguno de los casos coincide, se ejecutará el bloque de código `default`.

Hagamos un ejemplo funcional de una declaración `switch` siguiendo la sintaxis anterior. En este bloque de código, encontraremos el día actual de la semana con el método `new Date()` y `getDay()` para imprimir un número correspondiente al día actual. `0` representa el domingo, hasta `6`, que representa el sábado. Comenzaremos configurando nuestra variable.


```js
const day = new Date().getDay();
```


Usando `switch`, enviaremos un mensaje a la consola cada día de la semana. El programa se ejecutará en orden de arriba a abajo buscando una coincidencia, y una vez que se encuentre una, el comando `break` detendrá el bloque `switch` para que no continúe evaluando declaraciones.


📃`week.js`
```js
// Set the current day of the week to a variable, with 0 being Sunday and 6 being Saturday
const day = new Date().getDay();

switch (day) {
	case 0:
		console.log("It's Sunday, time to relax!");
		break;
	case 1:
		console.log("Happy Monday!");
		break;
	case 2:
		console.log("It's Tuesday. You got this!");
		break;
	case 3:
		console.log("Hump day already!");
		break;
	case 4:
		console.log("Just one more day 'til the weekend!");
		break;
	case 5:
		console.log("Happy Friday!");
		break;
	case 6:
		console.log("Have a wonderful Saturday!");
		break;
	default:
		console.log("Something went horribly wrong...");
}
```


```sh
Output
'Just one more day 'til the weekend!'
```


Este código se probó un jueves, que corresponde a `4`, por lo tanto, la salida de la consola fue `Just one more day 'til the weekend!`. Dependiendo del día de la semana en el que estés probando el código, el resultado será diferente. Hemos incluido un bloque `default` al final para ejecutar en caso de error, lo que en este caso no debería suceder ya que solo hay 7 días de la semana. También podríamos, por ejemplo, imprimir solo los resultados de lunes a viernes y el bloque `default` podría haber tenido el mismo mensaje para el fin de semana.

Si hubiéramos omitido la palabra clave `break` en cada declaración, ninguna de las otras declaraciones `case` se habría evaluado como verdadera, pero el programa habría continuado comprobando hasta llegar al final. Para que nuestros programas sean más rápidos y eficientes, incluimos el `break`.



## Rangos de Switch


Puede haber una ocasión en la que necesite evaluar un rango de valores en un bloque `switch`, en lugar de un valor único como en nuestro ejemplo anterior. Podemos hacer esto estableciendo nuestra expresión en `true` y realizando una operación dentro de cada declaración `case`.


Para que esto sea más fácil de entender, usaremos un ejemplo familiar. En el tutorial de [declaraciones condicionales](./how-to-write-conditional-statements-in-javascript.html), creamos una aplicación de calificación que tomaría una puntuación numérica y la convertiría en una calificación con letras, con los siguientes requisitos.

- Calificación de 90 y superior es una **A**
- Calificación de 80 a 89 es una **B**
- Calificación de 70 a 79 es una **C**
- Calificación de 60 a 69 es una **D**
- Calificación de 59 o menos es una **F**


Ahora podemos escribir eso como una declaración `switch`. Dado que estamos verificando un rango, realizaremos la operación en cada `case` para verificar si cada expresión se evalúa como `true` y luego saldremos de la declaración una vez que se hayan satisfecho los requisitos de `true`.


📃`grades.js`
```js
// Set the student's grade
const grade = 87;

switch (true) {
	// If score is 90 or greater
	case grade >= 90:
		console.log("A");
		break;
	// If score is 80 or greater
	case grade >= 80:
		console.log("B");
		break;
	// If score is 70 or greater
	case grade >= 70:
		console.log("C");
		break;
	// If score is 60 or greater
	case grade >= 60:
		console.log("D");
		break;
	// Anything 59 or below is failing
	default:
		console.log("F");
}
```


```sh
Output
'B'
```


La expresión entre paréntesis que se va a evaluar es `true` en este ejemplo. Esto significa que cualquier `case` que se evalúe como `true` será una coincidencia.


Al igual que con `else if`, el `switch` se evalúa de arriba a abajo y se aceptará la primera coincidencia verdadera. Por lo tanto, aunque nuestra variable `grade` es `87` y, por lo tanto, se evalúa como verdadera también para C y D, la primera coincidencia es B, que será el resultado.


## Múltiples Cases


Es posible que encuentre código en el que varios casos deberían tener el mismo resultado. Para lograr esto, puede utilizar más de un `case` para cada bloque de código.

Para probar esto, vamos a hacer una pequeña aplicación relacionando el mes actual con la temporada apropiada. Primero, usaremos el método `new Date()` para encontrar un número correspondiente al mes actual y aplicarlo a la variable `month`.



```js
const month = new Date().getMonth();
```

El método `new Date().getMonth()` generará un número del `0` al `11`, siendo `0` enero y `11` diciembre. Al momento de esta publicación el mes es septiembre, lo que corresponderá al `8`.

Nuestra aplicación generará las cuatro estaciones con las siguientes especificaciones para simplificar:

- **Winter**: enero, febrero y marzo
- **Spring**: abril, mayo y junio
- **Summer**: julio, agosto y septiembre
- **Autumn**: octubre, noviembre y diciembre


📃`seasons.js`
```js

// Get number corresponding to the current month, with 0 being January and 11 being December
const month = new Date().getMonth();

switch (month) {
	// January, February, March
	case 0:
	case 1:
	case 2:
		console.log("Winter");
		break;
	// April, May, June
	case 3:
	case 4:
	case 5:
		console.log("Spring");
		break;
	// July, August, September
	case 6:
	case 7:
	case 8:
		console.log("Summer");
		break;
	// October, November, December
	case 9:
	case 10:
	case 11:
		console.log("Autumn");
		break;
	default:
		console.log("Something went wrong.");
}
```


Cuando ejecutamos el código, recibiremos un resultado que identificará la temporada actual según las especificaciones anteriores.


```sh
Output
Summer
```

El mes actual en el momento de esta publicación era `8`, lo que correspondía a una de las declaraciones del `case` con la salida de la temporada `"Summer"`.


## Conclusión

En este artículo, revisamos la declaración `switch`, un tipo de [declaraciones condicionales](./how-to-write-conditional-statements-in-javascript.html) que evalúa una expresión y genera diferentes valores según los resultados coincidentes. Revisamos declaraciones `switch` utilizando un rango y declaraciones `case` múltiples.

Para obtener más información sobre `switch`, puede revisarlo en [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch).




