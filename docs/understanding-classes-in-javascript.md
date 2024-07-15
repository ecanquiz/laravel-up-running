# Comprender Clases en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/understanding-classes-in-javascript)
:::

## Introducción

JavaScript es un lenguaje basado en prototipos y cada objeto en JavaScript tiene una propiedad interna oculta llamada `[[Prototype]]` que se puede usar para ampliar las propiedades y métodos del objeto. Puede leer más sobre prototipos en nuestro tutorial [Comprensión de Prototipos y Herencia en JavaScript](./understanding-prototypes-and-inheritance-in-javascript.html).

Hasta hace poco, los desarrolladores laboriosos utilizaban [funciones constructoras](./understanding-prototypes-and-inheritance-in-javascript.html#funciones-constructoras) para imitar un patrón de diseño orientado a objetos en JavaScript. La especificación del lenguaje ECMAScript 2015, a menudo denominada ES6, introdujo clases en el lenguaje JavaScript. Las clases en JavaScript en realidad no ofrecen funcionalidad adicional y, a menudo, se describen como que proporcionan "azúcar sintáctico" sobre los prototipos y la herencia, ya que ofrecen una sintaxis más limpia y elegante. Debido a que otros lenguajes de programación usan clases, la sintaxis de clases en JavaScript hace que sea más sencillo para los desarrolladores moverse entre idiomas.

## Las Clases Son Funciones

Una clase de JavaScript es un tipo de función. Las clases se declaran con la palabra clave `class`. Usaremos la sintaxis de expresión de función para inicializar una función y la sintaxis de expresión de clase para inicializar una clase.



```js
// Initializing a function with a function expression
const x = function() {}
```

```js
// Initializing a class with a class expression
const y = class {}
```

Podemos acceder al `[[Prototype]]` de un objeto usando el método [`Object.getPrototypeOf()`](./understanding-prototypes-and-inheritance-in-javascript.html#prototipos-de-javascript). Usemos eso para probar la **función** vacía que creamos.


```js
Object.getPrototypeOf(x);
```

```sh
Output
ƒ () { [native code] }
```


También podemos usar ese método en la **clase** que acabamos de crear.


```js
Object.getPrototypeOf(y);
```

```sh
Output
ƒ () { [native code] }
```

El código declarado con `function` y `class` devuelve una función `[[Prototype]]`. Con los prototipos, cualquier función puede convertirse en una instancia de constructor utilizando la palabra clave `new`.



```js
const x = function() {}

// Initialize a constructor from a function
const constructorFromFunction = new x();

console.log(constructorFromFunction);
```

```sh
Output
x {}
constructor: ƒ ()
```


Esto también se aplica a las clases.



```js
const y = class {}

// Initialize a constructor from a class
const constructorFromClass = new y();

console.log(constructorFromClass);
```


```sh
Output
y {}
constructor: class
```


Estos ejemplos de constructores de prototipos están vacíos, pero podemos ver cómo debajo de la sintaxis, ambos métodos logran el mismo resultado final.


## Definiendo una Clase

En el [tutorial de prototipos y herencia](./understanding-prototypes-and-inheritance-in-javascript.html#funciones-constructoras), creamos un ejemplo basado en la creación de personajes en un juego de rol basado en texto. Continuemos con ese ejemplo aquí para actualizar la sintaxis de funciones a clases.

Una **función constructora** se inicializa con una serie de parámetros, que serían asignados como propiedades de `this`, haciendo referencia a la función misma. La primera letra del identificador estaría en mayúscula por convención.



📃`constructor.js`
```js
// Initializing a constructor function
function Hero(name, level) {
	this.name = name;
	this.level = level;
}
```


Cuando traducimos esto a la sintaxis de `class`, que se muestra a continuación, vemos que está estructurado de manera muy similar.


📃`class.js`
```js
// Initializing a class definition
class Hero {
	constructor(name, level) {
		this.name = name;
		this.level = level;
	}
}
```


Sabemos que una función constructora está destinada a ser un modelo de objeto por el uso de mayúsculas en la primera letra del inicializador (que es opcional) y por la familiaridad con la sintaxis. La palabra clave `class` comunica de una manera más directa el objetivo de nuestra función.


La única diferencia en la sintaxis de la inicialización es usar la palabra clave `class` en lugar de función y asignar las propiedades dentro de un método `constructor()`.


## Definición de Métodos

La práctica común con las funciones constructoras es asignar métodos directamente al `prototype` en lugar de en la inicialización, como se ve en el método `greet()` a continuación.



📃`constructor.js`
```js
function Hero(name, level) {
	this.name = name;
	this.level = level;
}

// Adding a method to the constructor
Hero.prototype.greet = function() {
	return `${this.name} says hello.`;
}
```

Con las clases, esta sintaxis se simplifica y el método se puede agregar directamente a la clase. Utilizando la [abreviatura de definición de métodos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) introducida en ES6, definir un método es un proceso aún más conciso.



📃`class.js`
```js
class Hero {
	constructor(name, level) {
		this.name = name;
		this.level = level;
	}

	// Adding a method to the constructor
	greet() {
		return `${this.name} says hello.`;
    }
}
```

Echemos un vistazo a estas propiedades y métodos en acción. Crearemos una nueva instancia de `Hero` usando la palabra clave `new` y le asignaremos algunos valores.


```js
const hero1 = new Hero('Varg', 1);
```


Si imprimimos más información sobre nuestro nuevo objeto con `console.log(hero1)`, podemos ver más detalles sobre lo que está sucediendo con la inicialización de la clase.


```sh
Output
Hero {name: "Varg", level: 1}
__proto__:
  ▶ constructor: class Hero
  ▶ greet: ƒ greet()
```

Podemos ver en el resultado que las funciones `constructor()` y `greet()` se aplicaron al `__proto__`, o `[[Prototype]]` de `hero1`, y no directamente como un método en el objeto `hero1`. Si bien esto es claro al crear funciones constructoras, no es obvio al crear clases. Las clases permiten una sintaxis más simple y concisa, pero sacrifican algo de claridad en el proceso.



## Extendiendo una Clase


Una característica ventajosa de las funciones y clases constructoras es que se pueden ampliar a nuevos planos de objetos basados ​​en el padre. Esto evita la repetición de código para objetos que son similares pero que necesitan algunas características adicionales o más específicas.


Se pueden crear nuevas funciones constructoras desde el padre usando el método [`call()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call). En el siguiente ejemplo, crearemos una clase de personaje más específica llamada `Mage` y le asignaremos las propiedades de `Hero` usando `call()`, además de agregar una propiedad adicional.


📃`constructor.js`
```js
// Creating a new constructor from the parent
function Mage(name, level, spell) {
	// Chain constructor with call
	Hero.call(this, name, level);

	this.spell = spell;
}
```


En este punto, podemos crear una nueva instancia de `Mage` usando las mismas propiedades que `Hero`, así como una nueva que agregamos.



```js
const hero2 = new Mage('Lejon', 2, 'Magic Missile');
```


Al enviar `hero2` a la consola, podemos ver que hemos creado un nuevo `Mage` basado en el constructor.


```sh
Output
Mage {name: "Lejon", level: 2, spell: "Magic Missile"}
__proto__:
    ▶ constructor: ƒ Mage(name, level, spell)
```



Con las clases de ES6, la palabra clave [`super`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) se usa en lugar de `call` para acceder a las funciones principales. Usaremos `extends` para referirnos a la clase principal.



📃`class.js`
```js
// Creating a new class from the parent
class Mage extends Hero {
	constructor(name, level, spell) {
		// Chain constructor with super
		super(name, level);

		// Add a new property
		this.spell = spell;
	}
}
```


Ahora podemos crear una nueva instancia `Mage` de la misma manera.


```js
const hero2 = new Mage('Lejon', 2, 'Magic Missile');
```


Imprimiremos `hero2` en la consola y veremos el resultado.


```sh
Output
Mage {name: "Lejon", level: 2, spell: "Magic Missile"}
__proto__: Hero
    ▶ constructor: class Mage
```


El resultado es casi exactamente el mismo, excepto que en la construcción de la clase el `[[Prototype]]` está vinculado al padre, en este caso `Hero`.



A continuación se muestra una comparación lado a lado de todo el proceso de inicialización, adición de métodos y herencia de una función constructora y una clase.


📃`constructor.js`
```js
function Hero(name, level) {
	this.name = name;
	this.level = level;
}

// Adding a method to the constructor
Hero.prototype.greet = function() {
	return `${this.name} says hello.`;
}

// Creating a new constructor from the parent
function Mage(name, level, spell) {
	// Chain constructor with call
	Hero.call(this, name, level);

	this.spell = spell;
}
```



📃`class.js`
```js
// Initializing a class
class Hero {
	constructor(name, level) {
		this.name = name;
		this.level = level;
	}

	// Adding a method to the constructor
	greet() {
		return `${this.name} says hello.`;
    }
}

// Creating a new class from the parent
class Mage extends Hero {
	constructor(name, level, spell) {
		// Chain constructor with super
		super(name, level);

		// Add a new property
		this.spell = spell;
	}
}
```


Aunque la sintaxis es bastante diferente, el resultado subyacente es casi el mismo entre ambos métodos. Las clases nos brindan una forma más concisa de crear planos de objetos y las funciones constructoras describen con mayor precisión lo que sucede bajo el capó.


## Conclusión

En este tutorial, aprendimos sobre las similitudes y diferencias entre las funciones constructoras de JavaScript y las clases de ES6. Tanto las clases como los constructores imitan un modelo de herencia orientado a objetos en JavaScript, que es un lenguaje de herencia basado en prototipos.

Comprender la herencia prototípica es fundamental para ser un desarrollador de JavaScript eficaz. Estar familiarizado con las clases es extremadamente útil, ya que las bibliotecas de JavaScript populares como [React](https://react.dev/) hacen uso frecuente de la sintaxis de `class`.




