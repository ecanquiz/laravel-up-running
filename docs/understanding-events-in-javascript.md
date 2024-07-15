# Comprender Eventos en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/understanding-events-in-javascript)
:::


## Introducción

En la serie [Comprensión del DOM](https://ecanquiz.github.io/understanding-the-dom/), analizamos [el árbol DOM](https://ecanquiz.github.io/understanding-the-dom/understanding-the-dom-tree-and-nodes.html) y cómo [acceder](https://ecanquiz.github.io/understanding-the-dom/how-to-access-elements-in-the-dom.html), [recorrer](https://ecanquiz.github.io/understanding-the-dom/how-to-traverse-the-dom.html), [agregar, eliminar](https://ecanquiz.github.io/understanding-the-dom/how-to-make-changes-to-the-dom.html) y [modificar](https://ecanquiz.github.io/understanding-the-dom/how-to-modify-attributes-classes-and-styles-in-the-dom.html) nodos y elementos mediante la [Consola de Herramientas de Desarrollador](./how-to-use-the-js-dev-console.html).

Aunque en este punto ahora podemos realizar casi cualquier cambio que queramos en el DOM, desde la perspectiva del usuario no es muy útil porque solo hemos activado los cambios manualmente. Al aprender sobre eventos, entenderemos cómo unir todo para crear sitios web interactivos.

Los **eventos** son acciones que tienen lugar en el navegador y que pueden ser iniciadas por el usuario o por el propio navegador. A continuación se muestran algunos ejemplos de eventos comunes que pueden ocurrir en un sitio web:

- La página termina de cargarse.
- El usuario hace clic en un botón.
- El usuario pasa el cursor sobre un menú desplegable.
- El usuario envía un formulario.
- El usuario presiona una tecla en su teclado.

Al codificar respuestas de JavaScript que se ejecutan ante un evento, los desarrolladores pueden mostrar mensajes a los usuarios, validar datos, reaccionar al clic de un botón y muchas otras acciones.

En este artículo, repasaremos los controladores de eventos, los detectores de eventos y los objetos de eventos. También repasaremos tres formas diferentes de escribir código para manejar eventos y algunos de los eventos más comunes. Al conocer los eventos, podrá crear una experiencia web más interactiva para los usuarios finales.

## Manejadores de Eventos y Detector de Eventos

Cuando un usuario hace clic en un botón o presiona una tecla, se activa un evento. Estos se denominan eventos de clic o eventos de pulsación de tecla, respectivamente.

Un **manejador de eventos** es una función de JavaScript que se ejecuta cuando se activa un evento.

Un **detector de eventos** adjunta una interfaz receptiva a un elemento, lo que permite que ese elemento en particular espere y "detecte" hasta que se active el evento determinado.

Hay tres formas de asignar eventos a elementos:

- Manejadores de eventos en línea
- Propiedades del manejador de eventos
- Detectores de eventos

Repasaremos los tres métodos para asegurarnos de que esté familiarizado con cada forma en que se puede desencadenar un evento y luego discutiremos los pros y los contras de cada método.

### Atributos del Manejador de Eventos en Línea

Para comenzar a aprender sobre los manejadores de eventos, primero consideraremos el **manejador de eventos en línea**. Comencemos con un ejemplo muy básico que consta de un elemento `button` y un elemento `p`. Queremos que el usuario haga clic en el `button` para cambiar el contenido del texto de la `p`.

Comencemos con una página HTML con un botón en el _body_. Haremos referencia a un archivo JavaScript al que agregaremos código en un momento.


📃`events.html`
```html
<!DOCTYPE html>
<html lang="en-US">

<head>
	<title>Events</title>
</head>

<body>

  <!-- Add button -->
  <button>Click me</button>

  <p>Try to change me.</p>

</body>

<!-- Reference JavaScript file -->
<script src="js/events.js"></script>

</html>
```

Directamente en el `button`, agregaremos un atributo llamado `onclick`. El valor del atributo será una función que creamos llamada `changeText()`.


📃`events.html`
```html
<!DOCTYPE html>
<html lang="en-US">

<head>
	<title>Events</title>
</head>

<body>

	<button onclick="changeText()">Click me</button>

	<p>Try to change me.</p>

</body>

<script src="js/events.js"></script>

</html>
```

Creemos nuestro archivo `events.js`, que colocamos aquí en el directorio `js/`. Dentro de él, crearemos la función `changeText()`, que modificará el `textContent` del elemento `p`.




📃`js/events.js`
```js
// Function to modify the text content of the paragraph
const changeText = () => {
	const p = document.querySelector('p');

	p.textContent = "I changed because of an inline event handler.";
}
```

Cuando cargues `events.html` por primera vez, verás una página similar a esta:


![events](./img/events-1.png)


Sin embargo, cuando usted u otro usuario hacen clic en el botón, el texto de la etiqueta `p` cambiará de `Try to change me.`  a `I changed because of an inline event handler.`:


![events](./img/events-2.png)



Los manejadores de eventos en línea son una forma sencilla de comenzar a comprender los eventos, pero generalmente no deben usarse más allá de fines educativos y de prueba.


Puede comparar manejadores de eventos en línea con estilos CSS en línea en un elemento HTML. Es mucho más práctico mantener una hoja de estilos de clases separada que crear estilos en línea en cada elemento, del mismo modo que es más factible mantener JavaScript que se maneja completamente a través de un archivo de script separado que agregar manejadores a cada elemento.

### Propiedades del Manejador de Eventos

El siguiente paso desde un manejador de eventos en línea es la **propiedad del manejador de eventos**. Esto funciona de manera muy similar a un manejador en línea, excepto que configuramos la propiedad de un elemento en JavaScript en lugar del atributo en HTML.

La configuración será la misma aquí, excepto que ya no incluimos `onclick="changeText()"` en el marcado:


📃`events.html`
```html
<body>

	<button>Click me</button>

	<p>I will change.</p>

</body>
```


Nuestra función también seguirá siendo similar, excepto que ahora necesitamos acceder al elemento del `button` en JavaScript. Simplemente podemos acceder al `onclick` tal como accederíamos al `style` o `id` o cualquier otra propiedad de elemento, luego asignar la referencia de la función.


📃`js/events.js`
```js
// Function to modify the text content of the paragraph
const changeText = () => {
	const p = document.querySelector('p');

	p.textContent = "I changed because of an event handler property.";
}

// Add event handler as a property of the button element
const button = document.querySelector('button');
button.onclick = changeText;
```

:::info Nota
Los manejadores de eventos no siguen la convención _camelCase_ a la que se adhiere la mayoría del código JavaScript. Observe que el código es `onclick`, no `onClick`.
:::

Cuando cargue la página por primera vez, el navegador mostrará lo siguiente:

![events](./img/events-3.png)

Ahora, cuando hagas clic en el botón, tendrá un efecto similar al anterior:

![events](./img/events-4.png)


Tenga en cuenta que al pasar una referencia de función a la propiedad `onclick`, no incluimos paréntesis, ya que no estamos invocando la función en ese momento, sino que solo le pasamos una referencia.


La propiedad del manejador de eventos es un poco más fácil de mantener que el manejador en línea, pero aún sufre algunos de los mismos obstáculos. Por ejemplo, intentar establecer varias propiedades `onclick` separadas provocará que todas menos la última se sobrescriban, como se demuestra a continuación.


📃`js/events.js`
```js
const p = document.querySelector('p');
const button = document.querySelector('button');

const changeText = () => {
	p.textContent = "Will I change?";
}

const alertText = () => {
	alert('Will I alert?');
}

// Events can be overwritten
button.onclick = changeText;
button.onclick = alertText;
```

En el ejemplo anterior, hacer clic en el `button` solo mostraría una alerta y no cambiaría el texto `p`, ya que el código `alert()` fue el último agregado a la propiedad.


![events](./img/events-5.png)


Una vez que comprendamos tanto los manejadores de eventos en línea como las propiedades del manejador de eventos, pasemos a los detectores de eventos.


### Detectores de Eventos

La última incorporación a los manejadores de eventos de JavaScript son los detectores de eventos. Un **detector de eventos** busca un evento en un elemento. En lugar de asignar el evento directamente a una propiedad del elemento, usaremos el método `addEventListener()` para escuchar el evento.

`addEventListener()` toma dos parámetros obligatorios: el evento que se va a escuchar y la función de devolución de llamada del detector.


El HTML de nuestro detector de eventos será el mismo que el del ejemplo anterior.


📃`events.html`
```html
...
	<button>Click me</button>

	<p>I will change.</p>
...
```

Seguiremos usando la misma función `changeText()` que antes. Adjuntaremos el método `addEventListener()` al botón.



📃`js/events.js`
```js
// Function to modify the text content of the paragraph
const changeText = () => {
	const p = document.querySelector('p');

	p.textContent = "I changed because of an event listener.";
}

// Listen for click event
const button = document.querySelector('button');
button.addEventListener('click', changeText);
```

Tenga en cuenta que con los dos primeros métodos, un evento de clic se denominaba `onclick`, pero con los detectores de eventos se denomina `click`. Cada detector de eventos elimina la palabra `on`. En la siguiente sección, veremos más ejemplos de otros tipos de eventos.

Cuando recargas la página con el código JavaScript anterior, recibirás el siguiente resultado:


![events](./img/events-6.png)


A primera vista, los detectores de eventos parecen muy similares a las propiedades del manejador de eventos, pero tienen algunas ventajas. Podemos configurar varios detectores de eventos en el mismo elemento, como se demuestra en el siguiente ejemplo.


📃`js/events.js`
```js
const p = document.querySelector('p');
const button = document.querySelector('button');

const changeText = () => {
	p.textContent = "Will I change?";
}

const alertText = () => {
	alert('Will I alert?');
}

// Multiple listeners can be added to the same event and element
button.addEventListener('click', changeText);
button.addEventListener('click', alertText);
```


En este ejemplo, ambos eventos se activarán y proporcionarán al usuario una alerta y un texto modificado una vez que haga clic para salir de la alerta.


A menudo, se utilizarán funciones anónimas en lugar de una referencia de función en un detector de eventos. Las funciones anónimas son funciones que no tienen nombre.


```js
// An anonymous function on an event listener
button.addEventListener('click', () => {
	p.textContent = "Will I change?";
});
```


También es posible utilizar la función `removeEventListener()` para eliminar uno o todos los eventos de un elemento.


```js
// Remove alert function from button element
button.removeEventListener('click', alertText);
```


Además, puede utilizar `addEventListener()` en el `document` y el objeto `window`.


Los detectores de eventos son actualmente la forma más común y preferida de manejar eventos en JavaScript.


## Eventos Comunes

Hemos aprendido sobre los manejadores de eventos en línea, las propiedades del manejador de eventos y los detectores de eventos mediante el evento click, pero hay muchos más eventos en JavaScript. A continuación repasaremos algunos de los eventos más comunes.

### Eventos del Mouse

Los eventos de mouse se encuentran entre los eventos más utilizados. Se refieren a eventos que implican hacer clic en botones del mouse o pasar el cursor y mover el puntero del mouse. Estos eventos también corresponden a la acción equivalente en un dispositivo táctil.

|Evento|Descripción|
|-|-|
|`click`|Se activa cuando se presiona y suelta el mouse sobre un elemento|
|`dblclick`|Se activa cuando se hace clic dos veces en un elemento|
|`mouseenter`|Se activa cuando un puntero ingresa a un elemento|
|`mouseleave`|Se activa cuando un puntero abandona un elemento|
|`mousemove`|Se activa cada vez que un puntero se mueve dentro de un elemento|

Un `click` es un evento compuesto que se compone de eventos combinados de `mousedown` y `mouseup`, que se activan cuando se presiona o levanta el botón del mouse, respectivamente.

El uso de `mouseenter` y `mouseleave` en conjunto recrea un efecto de desplazamiento que dura mientras el puntero del mouse esté sobre el elemento.

### Eventos de Formulario

Los eventos de formulario son acciones que pertenecen a formularios, como la selección o anulación de selección de elementos `input` y el envío de formularios.

|Evento|Descripción|
|-|-|
|`submit`|Se activa cuando se envía un formulario|
|`focus`|Se activa cuando un elemento (como una entrada) recibe el foco|
|`blur`|Se dispara cuando un elemento pierde el foco|

El _enfoque_ se logra cuando se selecciona un elemento, por ejemplo, mediante un clic del mouse o navegando hasta él mediante la tecla `TAB`.

JavaScript se utiliza a menudo para enviar formularios y enviar los valores a un lenguaje de backend. La ventaja de usar JavaScript para enviar formularios es que no requiere recargar la página para enviar el formulario, y JavaScript se puede usar para validar los campos de entrada requeridos.

### Eventos de Teclado

Los eventos de teclado se utilizan para manejar acciones del teclado, como presionar una tecla, levantar una tecla y mantener presionada una tecla.

|Evento|Descripción|
|-|-|
|`keydown`|Se dispara una vez cuando se presiona una tecla|
|`keyup`|Se dispara una vez cuando se suelta una tecla|
|`keypress`|Se dispara continuamente mientras se presiona una tecla|

Aunque parecen similares, los eventos `keydown` y `keypress` no acceden exactamente a las mismas teclas. Si bien `keydown` reconocerá cada tecla que se presione, `keypress` omitirá las teclas que no producen un carácter, como `SHIFT`, `ALT` o `DELETE`.

Los eventos de teclado tienen propiedades específicas para acceder a teclas individuales.

Si un parámetro, conocido como objeto `event`, se pasa al detector de eventos, podemos acceder a más información sobre la acción que tuvo lugar. Dos propiedades que pertenecen a los objetos del teclado incluyen `key` y `code`.

Por ejemplo, si el usuario presiona la letra `a` en su teclado, aparecerán las siguientes propiedades relacionadas con esa tecla:


|Propiedad|Descripción|Ejemplo|
|-|-|-|
|`key`|Representa el nombre del caracter|a|
|`code`|Representa la tecla física que se presiona|KeyA|

Para mostrar cómo recopilar esa información a través de la consola JavaScript, podemos escribir las siguientes líneas de código.

```js
// Test the key and code properties
document.addEventListener('keydown', event => {
	console.log('key: ' + event.key);
	console.log('code: ' + event.code);
});
```

Una vez que presionamos `ENTER` en la Consola, ahora podemos presionar una tecla en el teclado; en este ejemplo, presionaremos `a`.

```sh
Output
key: a
code: KeyA
```

La propiedad `key` es el nombre del carácter — que puede cambiar, por ejemplo, presionar `a` con `SHIFT` daría como resultado un `key`de `A`. La propiedad `code` representa la tecla física en el teclado.

Para obtener más información, puede ver la [lista completa de eventos en Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/Events).

## Objetos de Evento

El objeto `Event` consta de propiedades y métodos a los que todos los eventos pueden acceder. Además del objeto `Event` genérico, cada tipo de evento tiene sus propias extensiones, como `KeyboardEvent` y `MouseEvent`.

El objeto `Event` se pasa a través de una función detectora como parámetro. Suele escribirse como `event` o `e`. Podemos acceder a la propiedad `code` del evento `keydown` para replicar los controles del teclado de un juego de PC.

Para probarlo, cree un archivo HTML básico con etiquetas `<p>` y cárguelo en un navegador.


📃`event-test-p.html`
```html
<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>Events</title>
</head>
<body>

  <p></p>

</body>
</html>
```

Luego, escriba el siguiente código JavaScript en la [Consola de Desarrolladores](./how-to-use-the-js-dev-console.html) de su navegador.


```js
// Pass an event through to a listener
document.addEventListener('keydown', event => {
	var element = document.querySelector('p');

	// Set variables for keydown codes
	var a = 'KeyA';
	var s = 'KeyS';
	var d = 'KeyD';
	var w = 'KeyW';

	// Set a direction for each code
	switch (event.code) {
		case a:
			element.textContent = 'Left';
			break;
		case s:
			element.textContent = 'Down';
			break;
		case d:
			element.textContent = 'Right';
			break;
		case w:
			element.textContent = 'Up';
			break;
	}
});
```

Cuando presiona una de las teclas — `a`, `s`, `d` o `w` —, verá un resultado similar al siguiente:


![events](./img/events-7.png)


A partir de aquí, puede continuar desarrollando cómo responderá el navegador y si el usuario presiona esas teclas, y puede crear un sitio web más dinámico.

A continuación, repasaremos una de las propiedades de eventos más utilizadas: la propiedad `target`. En el siguiente ejemplo, tenemos tres elementos `div` dentro de una `section`.


📃`event-test-div.html`
```html
<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>Events</title>
</head>
<body>

  <section>
  	<div id="one">One</div>
  	<div id="two">Two</div>
  	<div id="three">Three</div>
  </section>

</body>
</html>
```

Usando `event.target` con JavaScript en la Consola de Desarrolladores de nuestro navegador, podemos colocar un detector de eventos en el elemento `section` exterior y obtener el elemento anidado más profundamente.


```js
const section = document.querySelector('section');

// Print the selected target
section.addEventListener('click', event => {
	console.log(event.target);
});
```

Al hacer clic en cualquiera de esos elementos, se devolverá la salida del elemento específico relevante a la consola usando `event.target`. Esto es extremadamente útil, ya que le permite colocar solo un detector de eventos que puede usarse para acceder a muchos elementos anidados.


![events](./img/events-8.png)


Con el objeto `Event`, podemos configurar respuestas relacionadas con todos los eventos, incluidos eventos genéricos y extensiones más específicas.


## Conclusión

Los eventos son acciones que tienen lugar en un sitio web, como hacer clic, desplazarse, enviar un formulario, cargar una página o presionar una tecla en el teclado. JavaScript se vuelve verdaderamente interactivo y dinámico cuando podemos hacer que los sitios web respondan a las acciones que ha realizado el usuario.

En este tutorial, aprendimos qué son los eventos, ejemplos de eventos comunes, la diferencia entre manejadores y detectores de eventos y cómo acceder al objeto `Event`. Con este conocimiento, podrá comenzar a crear aplicaciones y sitios web dinámicos.
