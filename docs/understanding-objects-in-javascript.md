# Comprender Objetos en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript)
:::

## Introducción

Un **objeto** en JavaScript es un [tipo de datos](./understanding-data-types.html) que se compone de una colección de **nombres** o **claves** y **valores**, representados en **pares nombre:valor**. Los pares nombre:valor pueden constar de propiedades que pueden contener cualquier tipo de datos, incluidas cadenas, números y valores booleanos, así como **métodos**, que son funciones contenidas dentro de un objeto.

Los objetos en JavaScript son entidades independientes que se pueden comparar con objetos de la vida real. Por ejemplo, un libro puede ser un objeto que describirías por título, autor, número de páginas y género. De manera similar, un automóvil podría ser un objeto que describirías por el color, la marca, el modelo y la potencia. Los [arreglos](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript) de JavaScript también son un tipo de objeto.

Los objetos son un aspecto integral y fundamental de la mayoría de los programas de JavaScript. Por ejemplo, un objeto de cuenta de usuario puede contener datos como nombres de usuario, contraseñas y direcciones de correo electrónico. Otro caso de uso común es el carrito de compras de una plataforma de compras web que podría consistir en una matriz de muchos objetos que contienen toda la información pertinente para cada artículo, como el nombre, el precio y el peso para la información de envío. Una lista de tareas pendientes es otra aplicación común que puede consistir en objetos.

En este tutorial, revisaremos cómo crear un objeto, qué son las propiedades y los métodos del objeto, y cómo acceder, agregar, eliminar, modificar y recorrer las propiedades del objeto.

## Crear un Objeto

Un objeto es un [tipo de datos de JavaScript](./understanding-data-types.html), al igual que un número o una cadena también es un tipo de datos. Como tipo de datos, un objeto puede estar contenido en una variable.

Hay dos formas de construir un objeto en JavaScript:

- El **objeto literal**, que usa corchetes: `{}`
- El **constructor de objetos**, que utiliza la palabra clave `new`

Podemos hacer un ejemplo de objeto vacío usando ambos métodos para propósitos de demostración.

Primero, el objeto literal.

```js
// Initialize object literal with curly brackets
const objectLiteral = {};
```

El objeto literal inicializa el objeto con corchetes.

En el siguiente ejemplo, usaremos el constructor de objetos.

```js
// Initialize object constructor with new Object
const objectConstructor = new Object();
```

Los mismos datos se crearon utilizando el método constructor de objetos que se inicializa con el `new Object()`.

Ambos enfoques crearán un objeto vacío. El uso de objetos literales es el método más común y preferido, ya que tiene menos posibilidades de incoherencias y resultados inesperados.

Podemos crear un objeto de ejemplo, contenido en la variable `gimli`, para describir un personaje.

```js
// Initialize gimli object
const gimli = {
	name: "Gimli",
	race: "dwarf",
	weapon: "axe",
	greet: function() {
		return `Hi, my name is ${this.name}!`;
	},
};
```

Nuestro nuevo objeto es `gimli`, que tiene tres propiedades. Cada propiedad consta de un par **nombre:valor**, también conocido como par **clave:valor**. `weapon` es uno de los nombres de propiedad, que está vinculado al valor de propiedad `"axe"`, una cadena. Tiene un método, con un nombre de método de `greet` y el valor del método consiste en el contenido de la función.

Dentro de `greet`, puede notar palabra clave `this`. Cuando se usa `this` dentro de un objeto, se refiere al objeto actual, en este caso, `gimli`.

Enviar `gimli` a la consola imprimirá todo el objeto.

```js
gimli;
```
```sh
Output
{name: "Gimli", race: "dwarf", weapon: "axe", greet: ƒ}
```
Esta salida puede mostrarse de manera diferente según la consola que esté usando, pero debe notar que todos los valores pasados al objeto se muestran en la salida.

A continuación, revisaremos las propiedades y métodos de un objeto de JavaScript.

## Propiedades y Métodos

Los objetos pueden tener **propiedades** y **métodos**.

Una propiedad es la asociación entre un nombre (clave) y un valor dentro de un objeto, y puede contener cualquier tipo de datos. Una propiedad generalmente se refiere a la característica de un objeto.

Un método es una función que es el valor de la propiedad de un objeto y, por lo tanto, una tarea que un objeto puede realizar.

Una manera fácil de recordar la diferencia entre las propiedades de los objetos y los métodos es pensar en una propiedad como un sustantivo y en un método como un verbo. `name`, `race` y `weapon` son sustantivos asociados con un objeto y son propiedades. `fight()` o `talk()` son verbos que pueden usarse como una definición de función de método.

## Acceso a las Propiedades del Objeto

Hay dos formas de acceder a las propiedades de un objeto.

- Notación de puntos: `.`
- Notación de corchetes: `[]`

Revisemos nuestro objeto de ejemplo original, `gimli`.

```js
const gimli = {
	name: "Gimli",
	race: "dwarf",
	weapon: "axe",
	greet: function() {
		return `Hi, my name is ${this.name}!`;
	},
};
```

Si queremos recuperar el valor de la propiedad de `weapon`, podemos hacerlo con la notación de puntos del objeto escribiendo el nombre de la variable del objeto, seguido de un punto (`.`) y el nombre de la propiedad o del método.

```js
// Retrieve the value of the weapon property
gimli.weapon;
```
```sh
Output
"axe"
```

`gimli.weapon` genera el valor de la propiedad, que es `"axe"`. También podemos recuperar los mismos datos con la notación de paréntesis de objetos. De manera similar a cómo puede [indexar y acceder a una cadena](https://www.digitalocean.com/community/tutorials/how-to-index-split-and-manipulate-strings-in-javascript), la sintaxis para la notación de corchetes es dos corchetes (`[]`) que encierran el nombre de la propiedad.

```js
// Retrieve the value of the weapon property
gimli["weapon"];
```
```sh
Output
"axe"
```
Tanto la notación de puntos como la notación de corchetes se utilizan regularmente. La notación de puntos es más rápida y legible, pero tiene más limitaciones. La notación de corchetes permite el acceso a los nombres de propiedades almacenados en una variable y debe usarse si la propiedad de un objeto contiene algún tipo de carácter especial.

Para recuperar un método de objeto, lo llamaría de la misma manera que llamaría a una función normal, simplemente adjunta a la variable de objeto.

```js
gimli.greet();
```
```sh
Output
"Hi, my name is Gimli!"
```

En el ejemplo anterior, vemos que se devuelve el valor de cadena para el método de objeto `greeting()`.

Ahora podemos pasar a modificar las propiedades de los objetos agregando pares de nombre:valor o modificando los existentes.

## Agregar y Modificar Propiedades de Objetos

Para agregar una nueva propiedad a un objeto, asignaría un nuevo valor a una propiedad con el operador de asignación (`=`).

Por ejemplo, podemos agregar un tipo de datos numéricos al objeto `gimli` como la nueva propiedad `age`. Tanto la notación de punto como la de corchete se pueden usar para agregar una nueva propiedad de objeto.

```js
// Add new age property to gimli
gimli.age = 139;
```
```js
// Add new age property to gimli
gimli["age"] = 139;
```

Podemos acceder a ese valor tal como se indicó anteriormente, ya sea con la notación de puntos o con la notación de corchetes.

```js
gimli.age;
```
```sh
Output
139
```

También se puede agregar un método al objeto usando el mismo proceso.

```js
// Add new fight method to gimli
gimli.fight = function() {
	return `Gimli attacks with an ${this.weapon}.`;
}
```

Una vez que hayamos creado este nuevo método de objeto, podemos llamarlo como lo hicimos anteriormente.

```js
gimli.fight();
```
```sh
Output
"Gimli attacks with an axe."
```
Usando el mismo método, la propiedad de un objeto se puede modificar asignando un nuevo valor a una propiedad existente.

```js
// Update weapon from axe to battle axe
gimli.weapon = "battle axe";
```

En este punto, si llamamos al objeto, veremos todas nuestras adiciones y modificaciones.

```js
gimli;
```
```sh
Output
{name: "Gimli", race: "dwarf", weapon: "battle axe", age: 139, greet: ƒ, fight: ƒ}
```

A través de la operación de asignación, podemos modificar las propiedades y métodos de un objeto de JavaScript.

## Remover Propiedades de Objetos

Para eliminar una propiedad de un objeto, utilizará la palabra clave `delete`. `delete` es un operador que elimina una propiedad de un objeto.

En el siguiente ejemplo, eliminaremos la propiedad `weapon` de `gimli` usando `delete`.

```js
// Remove weapon from gimli
delete gimli.weapon;
```
```sh
Output
true
```

La operación `delete` se evalúa como `true` si la propiedad se eliminó correctamente o si se usó en una propiedad que no existe.

Podemos probar la salida de `gimli` para ver si tuvo éxito.

```js
gimli;
```
```sh
Output
{name: "Gimli", race: "dwarf", age: 139, greet: ƒ, fight: ƒ}
```

En el resultado anterior, el nombre de `weapon` y su valor asociado ya no están disponibles, lo que muestra que hemos eliminado la propiedad con éxito.

En la siguiente sección, veremos formas de iterar a través de objetos en JavaScript.

## Recorrer las Propiedades de los Objetos

JavaScript tiene un tipo incorporado de bucle `for` que está diseñado específicamente para iterar sobre las propiedades de un objeto. Esto se conoce como bucle `for...in`.

Aquí hay una versión simplificada de nuestro ejemplo de objeto principal, `gimli`.

```js
const gimli = {
	name: "Gimli",
	race: "dwarf",
	weapon: "battle axe",
};
```

Podemos usar `for...in` para recorrer todas las propiedades de `gimli` e imprimirlas en la consola. Usando la notación de paréntesis, podemos recuperar el valor de la propiedad como una variable, en este caso `key`.

```js
// Iterate through properties of gimli
for (let key in gimli) {
  console.log(gimli[key]);
}
```
```sh
Output
Gimli
dwarf
battle axe
```

También podemos recuperar el nombre de la propiedad usando solo la primera variable en el bucle `for...in`. Hemos utilizado un método de cadena para [convertir los valores clave a mayúsculas](https://www.digitalocean.com/community/tutorials/how-to-index-split-and-manipulate-strings-in-javascript#converting-to-upper-or-lower-case).

```js
// Get keys and values of gimli properties
for (let key in gimli) {
  console.log(key.toUpperCase() + ':', gimli[key]);
}
```
```sh
Output
NAME: Gimli
RACE: dwarf
WEAPON: battle axe
```

El bucle `for...in` no debe confundirse con el bucle `for...of`, que se utiliza exclusivamente en el tipo de objeto Array. Puede obtener más información sobre la iteración a través de arreglos en el tutorial "[Comprender Arreglos en JavaScript](https://www.digitalocean.com/community/tutorials/understanding-arrays-in-javascript#looping-through-an-array)".

Otro método de enumeración útil es el método `Object.keys()`, que devolverá un arreglo de las claves del objeto.

```js
// Initialize method on gimli object to return property keys
Object.keys(gimli);
```
```sh
Output
["name", "race", "weapon"]
```

Este método nos permite trabajar con las claves o los nombres de un objeto como un arreglo, por lo que puede aprovechar todos los métodos disponibles para los arreglos de JavaScript.

## Conclusión

Los objetos son una característica extremadamente útil y versátil del lenguaje de programación JavaScript. Son algunos de los principales bloques de construcción para escribir código en JavaScript y son una forma práctica de organizar datos y funciones relacionados. Las listas de tareas pendientes, los carritos de compras, las cuentas de usuario y las ubicaciones en un mapa web son algunos de los muchos ejemplos de objetos JavaScript del mundo real que puede encontrar.

En este tutorial, aprendimos la diferencia entre propiedades y métodos, cómo crear objetos y cómo agregar, eliminar, modificar y recorrer las propiedades de los objetos. Para obtener más información sobre los objetos de JavaScript, lea sobre [Trabajar con Objetos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) en la red de desarrolladores de Mozilla.
