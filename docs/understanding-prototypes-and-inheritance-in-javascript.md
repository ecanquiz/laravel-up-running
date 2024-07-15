# Comprensión de Prototipos y Herencia en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript)
:::

## Introducción

JavaScript es un **lenguaje basado en prototipos**, lo que significa que las propiedades y métodos de los objetos se pueden compartir a través de objetos generalizados que tienen la capacidad de clonarse y ampliarse. Esto se conoce como herencia prototípica y difiere de la herencia de clases. Entre los lenguajes de programación orientados a objetos populares, JavaScript es relativamente único, ya que otros lenguajes destacados como PHP, Python y Java son lenguajes basados ​​en clases, que en cambio definen clases como planos para objetos.

En este tutorial, aprenderemos qué son los prototipos de objetos y cómo utilizar la función constructora para extender los prototipos a nuevos objetos. También aprenderemos sobre la herencia y la cadena de prototipos.


## Prototipos de JavaScript

En [Comprender Objetos en JavaScript](./understanding-objects-in-javascript.html), repasamos el tipo de datos del objeto, cómo crear un objeto y cómo acceder y modificar las propiedades del objeto. Ahora aprenderemos cómo se pueden utilizar los prototipos para ampliar objetos.

Cada objeto en JavaScript tiene una propiedad interna llamada `[[Prototype]]`. Podemos demostrar esto creando un objeto nuevo y vacío.


```js
let x = {};
```

Esta es la forma en que normalmente crearíamos un objeto, pero tenga en cuenta que otra forma de lograrlo es con el constructor de objetos: `let x = new Object()`.


:::info
Los corchetes dobles que encierran [[Prototype]] significan que es una propiedad interna y no se puede acceder a ella directamente en el código.
:::


Para encontrar el `[[Prototype]]` de este objeto recién creado, usaremos el método `getPrototypeOf()`.



```js
Object.getPrototypeOf(x);
```

El resultado constará de varias propiedades y métodos integrados.


```sh
Output
{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, …}
```


Otra forma de encontrar el `[[Prototype]]` es mediante la propiedad `__proto__`. [`__proto__`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto) es una propiedad que expone el `[[Prototype]]` interno de un objeto.


:::info
Es importante tener en cuenta que `.__proto__` es una característica heredada y no debe usarse en el código de producción, y no está presente en todos los navegadores modernos. Sin embargo, podemos utilizarlo a lo largo de este artículo con fines demostrativos.
:::


```js
x.__proto__;
```

El resultado será el mismo que si hubiera utilizado `getPrototypeOf()`.


```sh
Output
{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, …}
```

Es importante que cada objeto en JavaScript tenga un `[[Prototype]]`, ya que crea una forma de vincular dos o más objetos.


Los objetos que crea tienen un `[[Prototype]]`, al igual que los objetos integrados, como `Date` y `Array`. Se puede hacer una referencia a esta propiedad interna de un objeto a otro mediante la propiedad `prototype`, como veremos más adelante en este tutorial.


## Herencia de Prototipo

Cuando intenta acceder a una propiedad o método de un objeto, JavaScript primero buscará en el objeto mismo y, si no lo encuentra, buscará en el `[[Prototype]]` del objeto. Si después de consultar tanto el objeto como su `[[Prototype]]` aún no se encuentra ninguna coincidencia, JavaScript verificará el prototipo del objeto vinculado y continuará buscando hasta llegar al final de la cadena de prototipos.

Al final de la cadena de prototipos está [`Object.prototype`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object). Todos los objetos heredan las propiedades y métodos de [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object). Cualquier intento de buscar más allá del final de la cadena resulta en `null`.

En nuestro ejemplo, `x` es un objeto vacío que hereda de `Object`. `x` puede usar cualquier propiedad o método que tenga `Object`, como `toString()`.


```js
x.toString();
```

```sh
Output
[object Object]
```


Este prototipo de cadena tiene sólo un eslabón de largo. `x` -> `Object`. Lo sabemos porque si intentamos encadenar dos propiedades `[[Prototype]]`, será `null`.


```js
x.__proto__.__proto__;
```

```sh
Output
null
```

Veamos otro tipo de objeto. Si tiene experiencia [Trabajando con Matrices en JavaScript](./understanding-arrays-in-javascript.html), sabrá que tienen muchos métodos integrados, como `pop()` y `push()`. La razón por la que tiene acceso a estos métodos cuando crea una nueva matriz es porque cualquier matriz que cree tiene acceso a las propiedades y métodos en `Array.prototype`.

Podemos probar esto creando una nueva matriz.


```js
let y = [];
```

Tenga en cuenta que también podemos escribirlo como un constructor de matrices, `let y = new Array()`.

Si echamos un vistazo al `[[Prototype]]` de la nueva matriz `y`, veremos que tiene más propiedades y métodos que el objeto `x`. Ha heredado todo de `Array.prototype`.


```js
y.__proto__;
```

```sh
Output
[constructor: ƒ, concat: ƒ, pop: ƒ, push: ƒ, …]
```

Notará una propiedad de `constructor` en el prototipo que está configurada en `Array()`. La propiedad `constructor` devuelve la función constructora de un objeto, que es un mecanismo utilizado para construir objetos a partir de funciones.

Ahora podemos encadenar dos prototipos, ya que nuestra cadena de prototipos es más larga en este caso. Parece `y` -> `Array` -> `Objeto`.


```js
y.__proto__.__proto__;
```

```sh
Output
{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, …}
```


Esta cadena ahora se refiere a `Object.prototype`. Podemos probar el `[[Prototype]]` interno con la propiedad `prototype` de la función constructora para ver que se refieren a lo mismo.



```js
y.__proto__ === Array.prototype;            // true
y.__proto__.__proto__ === Object.prototype; // true
```


También podemos usar el método `isPrototypeOf()` para lograr esto.


```js
Array.prototype.isPrototypeOf(y);      // true
Object.prototype.isPrototypeOf(Array); // true
```

Podemos usar el operador `instanceof` para probar si la propiedad `prototype` de un constructor aparece en algún lugar dentro de la cadena prototipo de un objeto.


```js
y instanceof Array; // true
```

En resumen, todos los objetos JavaScript tienen una propiedad `[[Prototype]]` interna oculta (que puede estar expuesta a través de `__proto__` en algunos navegadores).  Los objetos se pueden extender y heredarán las propiedades y métodos en `[[Prototype]]` de su constructor.

Estos prototipos se pueden encadenar y cada objeto adicional heredará todo a lo largo de la cadena. La cadena termina con el `Object.prototype`.


## Funciones Constructoras

Las **funciones constructoras** son funciones que se utilizan para construir nuevos objetos. El [operador `new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) se utiliza para crear nuevas instancias basadas en una función constructora. Hemos visto algunos constructores de JavaScript integrados, como `new Array()` y `new Date()`, pero también podemos crear nuestras propias plantillas personalizadas a partir de las cuales construir nuevos objetos.

Como ejemplo, digamos que estamos creando un juego de rol muy simple basado en texto. Un usuario puede seleccionar un personaje y luego elegir qué clase de personaje tendrá, como guerrero, sanador, ladrón, etc.

Dado que cada personaje compartirá muchas características, como tener un nombre, un nivel y puntos de vida, tiene sentido crear un constructor como plantilla. Sin embargo, dado que cada clase de personaje puede tener habilidades muy diferentes, queremos asegurarnos de que cada personaje solo tenga acceso a sus propias habilidades. Echemos un vistazo a cómo podemos lograr esto con constructores y herencia de prototipos.

Para empezar, una función constructora es simplemente una función normal. Se convierte en constructor cuando lo llama una instancia con la palabra clave `new`. En JavaScript, ponemos en mayúscula la primera letra de una función constructora por convención.


📃`characterSelect.js`
```js
// Initialize a constructor function for a new Hero
function Hero(name, level) {
  this.name = name;
  this.level = level;
}
```

Hemos creado una función constructora llamada `Hero` con dos parámetros: `name` y `level`. Dado que cada personaje tendrá un nombre y un nivel, tiene sentido que cada personaje nuevo tenga estas propiedades. La palabra clave `this` se referirá a la nueva instancia que se crea, por lo que establecer `this.name` en el parámetro `name` garantiza que el nuevo objeto tendrá una propiedad `name` establecida.

Ahora podemos crear una nueva instancia con `new`.



```js
let hero1 = new Hero('Bjorn', 1);
```

Si mostramos por la consola el resultado de `hero1`, veremos que se ha creado un nuevo objeto con las nuevas propiedades configuradas como se esperaba.


```sh
Output
Hero {name: "Bjorn", level: 1}
```

Ahora, si obtenemos el `[[Prototype]]` de `hero1`, podremos ver el `constructor` como `Hero()`. (Recuerde, esto tiene la misma entrada que `hero1.__proto__`, pero es el método adecuado a utilizar).


```js
Object.getPrototypeOf(hero1);
```

```sh
Output
constructor: ƒ Hero(name, level)
```

Puede notar que solo hemos definido propiedades y no métodos en el constructor. Es una práctica común en JavaScript definir métodos en el prototipo para aumentar la eficiencia y la legibilidad del código.


Podemos agregar un método a `Hero` usando `prototype`. Crearemos un método `greet()`.

📃`characterSelect.js`
```js
...
// Add greet method to the Hero prototype
Hero.prototype.greet = function () {
  return `${this.name} says hello.`;
}
```

Dado que `greet()` está en el `prototype` de `Hero` y `hero1` es una instancia de `Hero`, el método está disponible para `hero1`.



```js
hero1.greet();
```

```sh
Output
"Bjorn says hello."
```

Si inspeccionas el `[[Prototype]]` de `Hero`, verás `greet()` como una opción disponible ahora.


Esto es bueno, pero ahora queremos crear clases de personajes para que las utilicen los héroes. No tendría sentido poner todas las habilidades de cada clase en el constructor `Hero`, porque diferentes clases tendrán diferentes habilidades. Queremos crear nuevas funciones constructoras, pero también queremos que estén conectadas al `Hero` original.

Podemos usar el método [`call()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) para copiar propiedades de un constructor a otro constructor. Creemos un constructor _Warrior_ y _Healer_.



📃`characterSelect.js`
```js
...
// Initialize Warrior constructor
function Warrior(name, level, weapon) {
  // Chain constructor with call
  Hero.call(this, name, level);

  // Add a new property
  this.weapon = weapon;
}

// Initialize Healer constructor
function Healer(name, level, spell) {
  Hero.call(this, name, level);

  this.spell = spell;
}
```

Ambos nuevos constructores ahora tienen las propiedades de `Hero` y algunas más únicas. Agregaremos el método `attack()` a `Warrior` y el método `heal()` a `Healer`.


📃`characterSelect.js`
```js
...
Warrior.prototype.attack = function () {
  return `${this.name} attacks with the ${this.weapon}.`;
}

Healer.prototype.heal = function () {
  return `${this.name} casts ${this.spell}.`;
}
```

En este punto, crearemos nuestros personajes con las dos nuevas clases de personajes disponibles.


📃`characterSelect.js`
```js
const hero1 = new Warrior('Bjorn', 1, 'axe');
const hero2 = new Healer('Kanin', 1, 'cure');
```

`hero1` ahora es reconocido como un `Warrior` con las nuevas propiedades.


```sh
Output
Warrior {name: "Bjorn", level: 1, weapon: "axe"}
```

Podemos utilizar los nuevos métodos que establecimos en el prototipo de `Warrior`.


```js
hero1.attack();
```

```sh
Console
"Bjorn attacks with the axe."
```

Pero, ¿qué sucede si intentamos utilizar métodos más abajo en la cadena del prototipo?


```js
hero1.greet();
```

```sh
Output
Uncaught TypeError: hero1.greet is not a function
```

Las propiedades y métodos del prototipo no se vinculan automáticamente cuando usa `call()` para encadenar constructores. Usaremos `Object.setPropertyOf()` para vincular las propiedades en el constructor `Hero` con los constructores `Warrior` y `Healer`, asegurándonos de colocarlo antes de cualquier método adicional.


📃`characterSelect.js`
```js
...
Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
Object.setPrototypeOf(Healer.prototype, Hero.prototype);

// All other prototype methods added below
...
```


Ahora podemos utilizar con éxito métodos prototipo de `Hero` en una instancia de `Warrior` o `Healer`.


```js
hero1.greet();
```

```sh
Output
"Bjorn says hello."
```

Aquí está el código completo de nuestra página de creación de personajes.


📃`characterSelect.js`
```js
// Initialize constructor functions
function Hero(name, level) {
  this.name = name;
  this.level = level;
}

function Warrior(name, level, weapon) {
  Hero.call(this, name, level);

  this.weapon = weapon;
}

function Healer(name, level, spell) {
  Hero.call(this, name, level);

  this.spell = spell;
}

// Link prototypes and add prototype methods
Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
Object.setPrototypeOf(Healer.prototype, Hero.prototype);

Hero.prototype.greet = function () {
  return `${this.name} says hello.`;
}

Warrior.prototype.attack = function () {
  return `${this.name} attacks with the ${this.weapon}.`;
}

Healer.prototype.heal = function () {
  return `${this.name} casts ${this.spell}.`;
}

// Initialize individual character instances
const hero1 = new Warrior('Bjorn', 1, 'axe');
const hero2 = new Healer('Kanin', 1, 'cure');
```


Con este código creamos nuestro constructor `Hero` con las propiedades base, creamos dos constructores de personajes llamados `Warrior` y `Healer` a partir del constructor original, agregamos métodos a los prototipos y creamos instancias de personajes individuales.


## Conclusión

JavaScript es un lenguaje basado en prototipos y funciona de manera diferente al paradigma tradicional basado en clases que utilizan muchos otros lenguajes orientados a objetos.

En este tutorial, aprendimos cómo funcionan los prototipos en JavaScript y cómo vincular propiedades y métodos de objetos a través de la propiedad oculta `[[Prototype]]` que comparten todos los objetos. También aprendimos cómo crear funciones de constructor personalizadas y cómo funciona la herencia de prototipos para transmitir valores de propiedades y métodos.
