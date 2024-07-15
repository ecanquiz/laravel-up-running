# Usando Bucles While y Bucles Do...While en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/using-while-loops-and-do-while-loops-in-javascript)
:::

## Introducción

La automatización es la técnica de hacer que un sistema funcione automáticamente; En programación, utilizamos **bucles** para automatizar tareas repetitivas. Los bucles son una de las características más útiles de los lenguajes de programación, y en este artículo aprenderemos sobre los bucles `while` y `do... while` en JavaScript.

Las declaraciones `while` y `do... while` en JavaScript son similares a las [declaraciones condicionales](./how-to-write-conditional-statements-in-javascript.html), que son bloques de código que se ejecutarán si una condición especificada resulta [`true`](./understanding-data-types.html#booleans). A diferencia de una declaración `if`, que solo se evalúa una vez, un bucle se ejecutará varias veces hasta que la condición ya no se evalúe como `true`.

Otro tipo común de bucle que encontrará es la [declaración `for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for), que se ejecuta un número determinado de veces. Los bucles `while` y `do... while` se basan condicionalmente y, por lo tanto, no es necesario saber de antemano cuántas veces se ejecutará el bucle.


## Bucle While

En JavaScript, una declaración `while` es un bucle que se ejecuta siempre que la condición especificada se evalúe como `true`.

La sintaxis es muy similar a una declaración `if`, como se ve a continuación.


```js
while (condition) {
	// execute code as long as condition is true
}
```


La declaración `while` es el bucle más básico para construir en JavaScript.

Como ejemplo, digamos que tenemos un acuario que tiene un límite de población. Para cada iteración del ciclo, agregaremos un pez. Una vez que el acuario tenga `10` peces, se alcanzará el límite de población y el programa dejará de agregar más peces.


📃`aquarium.js`
```js
// Set population limit of aquarium to 10
const popLimit = 10;

// Start off with 0 fish
let fish = 0;

// Initiate while loop to run until fish reaches population limit
while (fish < popLimit) {
	// add one fish for each iteration
	fish++;
	console.log("There's room for " + (popLimit - fish) + " more fish.");
}
```


Una vez que ejecutemos el programa anterior, recibiremos el siguiente resultado, que muestra la iteración del programa a través del ciclo `while` hasta que las condiciones ya no se evalúan como `true`.



```sh
Output
There's room for 9 more fish.
There's room for 8 more fish.
There's room for 7 more fish.
There's room for 6 more fish.
There's room for 5 more fish.
There's room for 4 more fish.
There's room for 3 more fish.
There's room for 2 more fish.
There's room for 1 more fish.
There's room for 0 more fish.
```

En nuestro ejemplo, configuramos nuestro bucle `while` para que se ejecute siempre que la cantidad de peces sea menor que el límite de población del acuario. Para cada iteración, se agrega un pez al acuario hasta llenar los `10` lugares. En ese momento, el bucle deja de ejecutarse.



## Bucles Infinitos


Un **bucle infinito**, como su nombre indica, es un bucle que seguirá ejecutándose para siempre. Si accidentalmente realiza un bucle infinito, podría bloquear su navegador o computadora. Es importante estar atento a los bucles infinitos para poder evitarlos.

Un bucle infinito común ocurre cuando la condición de la declaración `while` se establece en `true`. A continuación se muestra un ejemplo de código que se ejecutará para siempre. No es necesario probar ningún bucle infinito.

📃`infiniteLoop.js`
```js
// Initiate an infinite loop
while (true) {
	// execute code forever
}
```

Se ejecutará un bucle infinito para siempre, pero el programa se puede finalizar con la palabra clave `break`.


En el siguiente ejemplo, agregaremos una declaración `if` al bucle `while` y, cuando se cumpla esa condición, finalizaremos el bucle con `break`.


📃`polarBears.js`
```js
// Set a condition to true
const iceCapsAreMelting = true;
let polarBears = 5;

// Initiate infinite loop
while (iceCapsAreMelting) {
  console.log(`There are ${polarBears} polar bears.`);
  polarBears--;
  // Terminate infinite loop when following condition is true
  if (polarBears === 0) {
	console.log("There are no polar bears left.");
  	break;
  }
}
```


Cuando ejecutamos el código anterior, el resultado será el siguiente.


```sh
Output
There are 5 polar bears.
There are 4 polar bears.
There are 3 polar bears.
There are 2 polar bears.
There are 1 polar bears.
There are no polar bears left.
```

Tenga en cuenta que este no es necesariamente un método práctico para crear y finalizar un bucle, pero `break` es una palabra clave útil que debe tener en cuenta.


## Bucle Do...While

Ya aprendimos sobre el bucle `while`, que ejecuta un bloque de código mientras una condición especificada sea verdadera. A partir de eso está la declaración `do... while`, que es muy similar a `while` con la principal diferencia de que un bucle `do... while` siempre se ejecutará una vez, incluso si la condición nunca es verdadera.


A continuación demostraremos la sintaxis del bucle `do... while`.


```js
do {
	// execute code
} while (condition);
```


Como puede ver, la parte `do` del bucle viene primero y le sigue `while (condition)`. El bloque de código se ejecutará y luego se probará la condición tal como está en un bucle `while` normal.


Para probar esto, podemos establecer una variable en `0`, incrementarla dentro de la declaración `do` y establecer nuestra condición en `false`.


📃`falseCondition.js`
```js
// Set variable to 0
let x = 0;

do {
	// Increment variable by 1
	x++;
	console.log(x);
} while (false);
```

```sh
Output
1
```


Nuestro resultado fue `1`, lo que significa que el bloque de código recorrió el bucle una vez (desde `0`) antes de ser detenido por una condición `while` fallida.


Si bien se tiene en cuenta que el bucle se repetirá al menos una vez, el bucle `do... while` se puede utilizar para los mismos fines que un bucle `while`.


## Conclusión

En este tutorial, aprendimos sobre el bucle `while`, el bucle `do... while` y los bucles infinitos en JavaScript.

La automatización de tareas repetitivas es una parte extremadamente importante de la programación y estos bucles pueden ayudar a que sus programas sean más eficientes y concisos.

Para obtener más información, lea sobre los bucles [`while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while) y [`do... while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while) en Mozilla Developer Network.

