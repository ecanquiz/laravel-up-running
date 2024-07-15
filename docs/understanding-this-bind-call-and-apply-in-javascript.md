# Comprender This, Bind, Call y Apply en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/conceptual-articles/understanding-this-bind-call-and-apply-in-javascript)
:::

## Introducción

La palabra clave [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) es un concepto muy importante en JavaScript y también particularmente confuso tanto para los nuevos desarrolladores como para aquellos que tienen experiencia en otros lenguajes de programación. En JavaScript, `this` es una referencia a un objeto. El objeto al que `this` se refiere puede variar, implícitamente en función de si es global, en un objeto o en un constructor, y también puede variar explícitamente en función del uso de los métodos del prototipo `Function`: `bind`, `call` y `apply`.

Aunque `this` es un tema un poco complejo, también aparece tan pronto como comienzas a escribir tus primeros programas JavaScript. Ya sea que esté intentando acceder a un elemento o evento en [el Modelo de Objetos del Documento (DOM)](https://ecanquiz.github.io/understanding-the-dom/), creando clases para escribir en el estilo de programación orientada a objetos o utilizando las propiedades y métodos de objetos normales, encontrará `this`.

En este artículo, aprenderá a qué se refiere `this` implícitamente según el contexto y aprenderá a utilizar los métodos `bind`, `call`, y `apply` para determinar explícitamente el valor de `this`.


## Contexto Implícito

Hay cuatro contextos principales en los que se puede inferir implícitamente el valor de `this`:

- el contexto global
- como método dentro de un objeto
- como constructor de una función o clase
- como manejador de eventos DOM

### Global

En el contexto global, `this` se refiere al [objeto global](https://developer.mozilla.org/en-US/docs/Glossary/Global_object). Cuando estás trabajando en un navegador, el contexto global sería `window`. Cuando trabajas en Node.js, el contexto global es `global`.


:::info Nota
Si aún no está familiarizado con el concepto de alcance en JavaScript, consulte [Comprender Variables, Alcance y Elevación en JavaScript](./understanding-variables-scope-and-hoisting.html).
:::

Para los ejemplos, practicará el código en la consola de herramientas de desarrollo del navegador. Lea [Cómo Utilizar la Consola para Desarrolladores de JavaScript](./how-to-use-the-js-dev-console.html) si no está familiarizado con la ejecución de código JavaScript en el navegador.

Si registra el valor de `this` sin ningún otro código, verá a qué objeto se refiere `this`.


```js
console.log(this)
```

```sh
Output
Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
```

Puede ver que `this` es `window`, que es el objeto global de un navegador.


En [Comprender Variables, Alcance y Elevación en JavaScript](./understanding-variables-scope-and-hoisting.html), aprendió que las funciones tienen su propio contexto para las variables. Podría sentirse tentado a pensar que `this` seguiría las mismas reglas dentro de una función, pero no es así. Una función de nivel superior aún conservará la referencia `this` del objeto global.

Escribe una función de nivel superior, o una función que no está asociada con ningún objeto, como esta:


```js
function printThis() {
  console.log(this)
}

printThis()
```

```sh
Output
Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
```

Incluso dentro de una función, `this` todavía se refiere a `window` u objeto global.

Sin embargo, cuando se utiliza el [modo estricto](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), el contexto de `this` dentro de una función en el contexto global estará `undefined`.


```js
'use strict'

function printThis() {
  console.log(this)
}

printThis()
```

```sh
Output
undefined
```

Generalmente, es más seguro utilizar el modo estricto para reducir la probabilidad de que tenga un alcance inesperado. Rara vez alguien querrá referirse al objeto `window` usando `this`.

>Para obtener más información sobre el modo estricto y los cambios que realiza con respecto a errores y seguridad, lea la documentación del [Modo Estricto](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) en MDN.


### Un Método de Objeto

Un [método](./understanding-objects-in-javascript.html#propiedades-y-metodos) es una función de un objeto o una tarea que un objeto puede realizar. Un método usa `this` para referirse a las propiedades del objeto.


```js
const america = {
  name: 'The United States of America',
  yearFounded: 1776,

  describe() {
    console.log(`${this.name} was founded in ${this.yearFounded}.`)
  },
}

america.describe()
```


```sh
Output
"The United States of America was founded in 1776."
```

En este ejemplo, `this` es lo mismo que `america`.

En un objeto anidado, `this` se refiere al alcance del objeto actual del método. En el siguiente ejemplo, `this.symbol` dentro del objeto `details` hace referencia a `details.symbol`.


```js
const america = {
  name: 'The United States of America',
  yearFounded: 1776,
  details: {
    symbol: 'eagle',
    currency: 'USD',
    printDetails() {
      console.log(`The symbol is the ${this.symbol} and the currency is ${this.currency}.`)
    },
  },
}

america.details.printDetails()
```


```sh
Output
"The symbol is the eagle and the currency is USD."
```


Otra forma de pensarlo es que `this` se refiere al objeto en el lado izquierdo del punto cuando se llama a un método.


### Un Constructor de Funciones

Cuando usa la palabra clave [`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new), crea una instancia de una función o clase constructora. Los constructores de funciones eran la forma estándar de inicializar un objeto definido por el usuario antes de que se introdujera la sintaxis `class` en la actualización de ECMAScript 2015 a JavaScript. En [Comprender las Clases en JavaScript](./understanding-classes-in-javascript.html), aprenderá cómo crear un constructor de funciones y un constructor de clases equivalente.


```js
function Country(name, yearFounded) {
  this.name = name
  this.yearFounded = yearFounded

  this.describe = function() {
    console.log(`${this.name} was founded in ${this.yearFounded}.`)
  }
}

const america = new Country('The United States of America', 1776)

america.describe()
```


```sh
Output
"The United States of America was founded in 1776."
```

En este contexto, `this` ahora está vinculado a la instancia de `Country`, que está contenida en la constante `america`.


### Un Constructor de Clase

Un constructor de una clase actúa igual que un constructor de una función. Lea más sobre las similitudes y diferencias entre los constructores de funciones y las clases de ES6 en [Comprender las Clases en JavaScript](./understanding-classes-in-javascript.html).


```js
class Country {
  constructor(name, yearFounded) {
    this.name = name
    this.yearFounded = yearFounded
  }

  describe() {
    console.log(`${this.name} was founded in ${this.yearFounded}.`)
  }
}

const america = new Country('The United States of America', 1776)

america.describe()
```

`this` en el método `describe` se refiere a la instancia de `Country`, que es `america`.


```sh
Output
"The United States of America was founded in 1776."
```

### Un Manejador de Eventos DOM

En el navegador, hay un contexto especial `this` para los manejadores de eventos. En un manejador de eventos llamado por `addEventListener`, `this` hará referencia a `event.currentTarget`. La mayoría de las veces, los desarrolladores simplemente usarán `event.target` o `event.currentTarget` según sea necesario para acceder a elementos en el DOM, pero dado que la referencia `this` cambia en este contexto, es importante saberlo.

En el siguiente ejemplo, crearemos un botón, le agregaremos texto y lo agregaremos al [DOM](https://ecanquiz.github.io/understanding-the-dom/). Cuando registramos el valor de `this` dentro del manejador de eventos, imprimirá el objetivo.


```js
const button = document.createElement('button')
button.textContent = 'Click me'
document.body.append(button)

button.addEventListener('click', function(event) {
  console.log(this)
})
```

```sh
Output
<button>Click me</button>
```

Una vez que pegue esto en su navegador, verá un botón adjunto a la página que dice "Click me". Si hace clic en el botón, verá aparecer `<button>Click me</button>` en su consola, ya que al hacer clic en el botón se registra el elemento, que es el botón en sí. Por lo tanto, como puede ver, `this` se refiere al elemento objetivo, que es el elemento al que agregamos un detector de eventos.


## Contexto Explícito

En todos los ejemplos anteriores, el valor de `this` estuvo determinado por su contexto: ya sea global, en un objeto, en una función o clase construida, o en un manejador de eventos DOM. Sin embargo, al utilizar `call`, `apply` o `bind`, puede determinar explícitamente a qué debe referirse `this`.


Es difícil definir exactamente cuándo usar `call`, `apply` o `bind`, ya que dependerá del contexto de su programa. `bind` puede ser particularmente útil cuando desea utilizar eventos para acceder a las propiedades de una clase dentro de otra clase. Por ejemplo, si tuviera que escribir un juego simple, podría separar la interfaz de usuario y las E/S en una clase, y la lógica y el estado del juego en otra. Dado que la lógica del juego necesitaría acceder a la entrada, como presionar una tecla y hacer clic, querrás hacer `bind` (vincular) en los eventos para acceder al valor `this` de la clase de lógica del juego.

Lo importante es saber determinar a qué objeto se refiere `this`, lo cual puedes hacer de manera implícita con lo aprendido en las secciones anteriores, o explícitamente con los tres métodos que aprenderás a continuación.


### Call y Apply


`call` y `apply` son muy similares — invocan una función con un contexto `this` específico, y argumentos opcionales. La única diferencia entre `call` y `apply` es que `call` requiere que los argumentos se pasen uno por uno, y `apply` toma los argumentos como una matriz.

En este ejemplo, crearemos un objeto y crearemos una función que haga referencia a `this` pero que no tenga contexto `this`.



```js
const book = {
  title: 'Brave New World',
  author: 'Aldous Huxley',
}

function summary() {
  console.log(`${this.title} was written by ${this.author}.`)
}

summary()
```


```sh
Output
"undefined was written by undefined"
```


Dado que `summary` y `book` no tienen conexión, invocar `summary` por sí solo solo imprimirá `undefined`, ya que busca esas propiedades en el objeto global.


:::info Nota
Intentar esto en modo estricto daría como resultado `Uncaught TypeError: Cannot read property 'title' of undefined`, ya que `this` en sí mismo seía `undefined`.
:::

Sin embargo, puede usar `call` y `apply` para invocar el contexto `this` de `book` en la función.


```js
summary.call(book)
// or:
summary.apply(book)
```


```sh
Output
"Brave New World was written by Aldous Huxley."
```


Ahora existe una conexión entre `book` y `summary` cuando se aplican estos métodos. Confirmemos exactamente qué es `this`.


```js
function whatIsThis() {
  console.log(this)
}

whatIsThis.call(book)
// or:
whatIsThis.apply(book)
```

```sh
Output
{title: "Brave New World", author: "Aldous Huxley"}
```


En este caso, `this` en realidad se convierte en el objeto pasado como argumento.

Así es como `call` y `apply` son lo mismo, pero hay una pequeña diferencia. Además de poder pasar el contexto `this` como primer argumento, también puede pasar argumentos adicionales.



```js
function longerSummary(genre, year) {
  console.log(
    `${this.title} was written by ${this.author}. It is a ${genre} novel written in ${year}.`
  )
}
```


Con `call`, cada valor adicional que desea pasar se envía como un argumento adicional.



```js
longerSummary.call(book, 'dystopian', 1932)
```


```sh
Output
"Brave New World was written by Aldous Huxley. It is a dystopian novel written in 1932."
```


Si intentas enviar exactamente los mismos argumentos con `apply`, esto es lo que sucede:


```js
longerSummary.apply(book, 'dystopian', 1932)
```


```sh
Output
Uncaught TypeError: CreateListFromArrayLike called on non-object at <anonymous>:1:15
```


En cambio, para `apply`, debes pasar todos los argumentos en una matriz.


```js
longerSummary.apply(book, ['dystopian', 1932])
```

```sh
Output
"Brave New World was written by Aldous Huxley. It is a dystopian novel written in 1932."
```

La diferencia entre pasar los argumentos individualmente o en una matriz es sutil, pero es importante tenerla en cuenta. Podría ser más simple y conveniente usar `apply`, ya que no requeriría cambiar la llamada a la función si cambiaran algunos detalles de los parámetros.



### Bind


Tanto `call` como `apply` son métodos de uso único; si llama al método con el contexto `this`, lo tendrá, pero la función original permanecerá sin cambios.

A veces, es posible que necesites usar un método una y otra vez con el contexto `this` de otro objeto, y en ese caso podrías usar el método `bind` para crear una función completamente nueva con un `this` vinculado explícitamente.



```js
const braveNewWorldSummary = summary.bind(book)

braveNewWorldSummary()
```


```sh
Output
"Brave New World was written by Aldous Huxley"
```


En este ejemplo, cada vez que llame a `braveNewWorldSummary`, siempre devolverá el valor original `this` vinculado a él. Intentar vincular un nuevo contexto `this` fallará, por lo que siempre puedes confiar en que una función vinculada devolverá el valor `this` que esperas.



```js
const braveNewWorldSummary = summary.bind(book)

braveNewWorldSummary() // Brave New World was written by Aldous Huxley.

const book2 = {
  title: '1984',
  author: 'George Orwell',
}

braveNewWorldSummary.bind(book2)

braveNewWorldSummary() // Brave New World was written by Aldous Huxley.
```


Aunque este ejemplo intenta vincular `braveNewWorldSummary` una vez más, conserva el contexto original `this` de la primera vez que se vinculó.


## Funciones de Flecha


Las [funciones de flecha](./how-to-define-functions-in-javascript.html#funciones-de-flecha) no tienen su propia vinculación `this`. En cambio, pasan al siguiente nivel de ejecución.


```js
const whoAmI = {
  name: 'Leslie Knope',
  regularFunction: function() {
    console.log(this.name)
  },
  arrowFunction: () => {
    console.log(this.name)
  },
}

whoAmI.regularFunction() // "Leslie Knope"
whoAmI.arrowFunction() // undefined
```


Puede resultar útil utilizar la función de flecha en los casos en los que realmente desee que `this` se refiera al contexto externo. Por ejemplo, si tuviera un detector de eventos dentro de una clase, probablemente querrá que `this` haga referencia a algún valor de la clase.

En este ejemplo, creará y agregará un botón al DOM como antes, pero la clase tendrá un detector de eventos que cambiará el valor del texto del botón cuando se haga clic.



```js
const button = document.createElement('button')
button.textContent = 'Click me'
document.body.append(button)

class Display {
  constructor() {
    this.buttonText = 'New text'

    button.addEventListener('click', event => {
      event.target.textContent = this.buttonText
    })
  }
}

new Display()
```


Si hace clic en el botón, el contenido del texto cambiará al valor de `buttonText`. Si no hubiera usado una función de flecha aquí, `this` sería igual a `event.currentTarget` y no podría usarlo para acceder a un valor dentro de la clase sin vincularlo explícitamente. Esta táctica se usa a menudo en métodos de clase en marcos como React.


## Conclusión

En este artículo, aprendió sobre `this` en JavaScript y los diferentes valores que puede tener según el enlace implícito en tiempo de ejecución y el enlace explícito mediante `bind`, `call` y `apply`. También aprendió cómo la falta del vínculo `this` en las funciones de flecha se puede utilizar para hacer referencia a un contexto diferente. Con este conocimiento, debería poder determinar el valor de `this` en sus programas.
