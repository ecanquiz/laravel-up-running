# Cómo Usar Métodos de Objeto en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-object-methods-in-javascript)
:::

## Introducción

Los [objetos](./understanding-objects-in-javascript.html) en JavaScript son colecciones de pares **clave/valor**. Los valores pueden consistir en **propiedades** y **métodos**, y pueden contener todos los demás tipos de datos de JavaScript, como cadenas, números y Booleanos.

Todos los objetos en JavaScript descienden del constructor [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) principal. `Object` tiene muchos métodos integrados útiles que podemos usar y acceder para simplificar el trabajo con objetos individuales. A diferencia de los [métodos prototipo de Matriz](./how-to-use-array-methods-in-javascript-mutator-methods.html) como `sort()` y `reverse()` que se usan en la instancia de matriz, los métodos _Object_ se usan directamente en el constructor `Object` y usan la instancia de objeto como parámetro. Esto se conoce como método estático.

Este tutorial repasará importantes métodos de objetos integrados, y cada sección siguiente trata sobre un método específico y proporciona un ejemplo de uso.


## Prerrequisitos

Para aprovechar al máximo este tutorial, debe estar familiarizado con la creación, modificación y trabajo con objetos, lo cual puede revisar en el artículo "[Comprender Objetos en JavaScript](./understanding-objects-in-javascript.html)".

Para obtener orientación adicional sobre JavaScript en general, puede revisar nuestra serie [Cómo codificar en JavaScript](./intro.html).


## Object.create()

El método [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) se utiliza para crear un nuevo objeto y vincularlo al prototipo de un objeto existente.

Podemos crear una instancia de objeto `job` y extenderla a un objeto más específico.


```js
// Initialize an object with properties and methods
const job = {
  position: 'cashier',
  type: 'hourly',
  isAvailable: true,
  showDetails() {
    const accepting = this.isAvailable ? 'is accepting applications' : "is not currently accepting applications";

    console.log(`The ${this.position} position is ${this.type} and ${accepting}.`);
  }
};

// Use Object.create to pass properties
const barista = Object.create(job);

barista.position = "barista";
barista.showDetails();
```

```sh
Output
The barista position is hourly and is accepting applications.
```

El objeto `barista` ahora tiene una propiedad — `position` — pero todas las demás propiedades y métodos del `job` están disponibles a través del prototipo. `Object.create()` es útil para mantener el código [DRY](https://www.digitalocean.com/community/tutorials/digitalocean-community-glossary#dry-development) minimizando la duplicación.


## Object.keys()

[`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) crea una matriz que contiene las claves de un objeto.

Podemos crear un objeto e imprimir la matriz de claves.


```js
// Initialize an object
const employees = {
  boss: 'Michael',
  secretary: 'Pam',
  sales: 'Jim',
  accountant: 'Oscar'
};

// Get the keys of the object
const keys = Object.keys(employees);

console.log(keys);
```

```sh
Output
["boss", "secretary", "sales", "accountant"]
```


Como `Object.keys` convierte las claves de su objeto en una matriz de claves, el método de matriz `forEach()` se puede utilizar para iterar a través de las claves y los valores.


```js
// Iterate through the keys
Object.keys(employees).forEach(key => {
  let value = employees[key];

  console.log(`${key}: ${value}`);
});
```


```sh
Output
boss: Michael
secretary: Pam
sales: Jim
accountant: Oscar
```

`Object.keys` también es útil para verificar la longitud de la matriz convertida usando la propiedad `length`.


```js
// Get the length of the keys
const length = Object.keys(employees).length;

console.log(length);
```

```sh
Output
4
```


Usando la propiedad `length`, pudimos contar las `4` propiedades de `employees`.


## Object.values()

[`Object.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) crea una matriz que contiene los valores de un objeto.



```js
// Initialize an object
const session = {
  id: 1,
  time: `26-July-2018`,
  device: 'mobile',
  browser: 'Chrome'
};

// Get all values of the object
const values = Object.values(session);

console.log(values);
```


```sh
Output
[1, "26-July-2018", "mobile", "Chrome"]
```


`Object.keys()` y `Object.values()` le permiten devolver los datos de un objeto.



## Object.entries()

[`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) crea una matriz anidada de los pares clave/valor de un objeto.


```js
// Initialize an object
const operatingSystem = {
    name: 'Ubuntu',
    version: 18.04,
    license: 'Open Source'
};

// Get the object key/value pairs
const entries = Object.entries(operatingSystem);

console.log(entries);
```

```sh
Output
[
    ["name", "Ubuntu"]
    ["version", 18.04]
    ["license", "Open Source"]
]
```

Una vez que tengamos las matrices de pares clave/valor, podemos usar el método `forEach()` para recorrer y trabajar con los resultados.



```js
// Loop through the results
entries.forEach(entry => {
  let key = entry[0];
  let value = entry[1];

  console.log(`${key}: ${value}`);
});
```

```sh
Output
name: Ubuntu
version: 18.04
license: Open Source
```


El método `Object.entries()` solo devolverá las propiedades propias de la instancia del objeto, y no ninguna propiedad que pueda heredarse a través de su prototipo.


## Object.assign()

[`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) se utiliza para copiar valores de un objeto a otro.

Podemos crear dos objetos y fusionarlos con `Object.assign()`.


```js
// Initialize an object
const name = {
    firstName: 'Philip',
    lastName: 'Fry'
};

// Initialize another object
const details = {
    job: 'Delivery Boy',
    employer: 'Planet Express'
};

// Merge the objects
const character = Object.assign(name, details);

console.log(character);
```


```sh
Output
{firstName: "Philip", lastName: "Fry", job: "Delivery Boy", employer: "Planet Express"}
```


También es posible utilizar el operador de extensión (`...`) para realizar la misma tarea. En el código siguiente, modificaremos la forma en que declaramos `character` fusionando los objetos `name` y `details`.



```js
// Initialize an object
const name = {
  firstName: 'Philip',
  lastName: 'Fry'
};

// Initialize another object
const details = {
  job: 'Delivery Boy',
  employer: 'Planet Express'
};

// Merge the object with the spread operator
const character = {...name, ...details}

console.log(character);
```


```sh
Output
{firstName: "Philip", lastName: "Fry", job: "Delivery Boy", employer: "Planet Express"}
```

Esta [sintaxis propagada](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) en literales de objetos también se conoce como clonación superficial.


## Object.freeze()


[`Object.freeze()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) evita la modificación de las propiedades y valores de un objeto, y evita que se agreguen o eliminen propiedades de un objeto.


```js
// Initialize an object
const user = {
  username: 'AzureDiamond',
  password: 'hunter2'
};

// Freeze the object
const newUser = Object.freeze(user);

newUser.password = '*******';
newUser.active = true;

console.log(newUser);
```

```sh
Output
{username: "AzureDiamond", password: "hunter2"}
```


En el ejemplo anterior, intentamos anular la contraseñas `hunter2` con `*******` pero la propiedad `password` siguió siendo la misma. También intentamos agregar una nueva propiedad, `active`, pero no se agregó.

`Object.isFrozen()` está disponible para determinar si un objeto se ha congelado o no y devuelve un valor Booleano.


## Object.seal()


[`Object.seal()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) evita que se agreguen nuevas propiedades a un objeto, pero permite modificar las propiedades existentes. Este método es similar a `Object.freeze()`. Actualice su consola antes de implementar el código siguiente para evitar un error.


```js
// Initialize an object
const user = {
  username: 'AzureDiamond',
  password: 'hunter2'
};

// Seal the object
const newUser = Object.seal(user);

newUser.password = '*******';
newUser.active = true;

console.log(newUser);
```


```sh
Output
{username: "AzureDiamond", password: "*******"}
```


La nueva propiedad `active` no se agregó al objeto sellado, pero la propiedad `password` se cambió exitosamente.


## Object.getPrototypeOf()


[`Object.getPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) se utiliza para obtener el `[[Prototype]]` interno oculto de un objeto, también accesible a través de la propiedad `__proto__`.

En este ejemplo, podemos crear una matriz que tenga acceso al prototipo `Array`.



```js
const employees = ['Ron', 'April', 'Andy', 'Leslie'];

Object.getPrototypeOf(employees);
```


```sh
Output
[constructor: ƒ, concat: ƒ, find: ƒ, findIndex: ƒ, pop: ƒ, …]
```


Podemos ver en el resultado que el prototipo de la matriz `employees` tiene acceso a `pop`, `find` y otros métodos de prototipo _Array_. Podemos confirmar esto probando el prototipo de los `employees` contra `Array.prototype`.


```js
Object.getPrototypeOf(employees) === Array.prototype;
```


```sh
Output
true
```

Este método puede resultar útil para obtener más información sobre un objeto o garantizar que tenga acceso al prototipo de otro objeto.

También hay un método relacionado [`Object.setPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) que agregará un prototipo a otro objeto.


## Conclusión

Los objetos tienen muchos métodos útiles que nos ayudan a modificarlos, protegerlos e iterarlos. En este tutorial, revisamos cómo crear y asignar nuevos objetos, iterar a través de las claves y/o valores de un objeto y congelar o sellar un objeto.

Si necesita revisar objetos de JavaScript, puede leer "[Comprender Objetos en JavaScript](/understanding-objects-in-javascript.html)". Si desea familiarizarse con la cadena de prototipos, puede consultar "[Comprensión de Prototipos y Herencia en JavaScript](understanding-prototypes-and-inheritance-in-javascript.html)".
