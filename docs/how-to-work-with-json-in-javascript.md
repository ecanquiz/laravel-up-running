# Cómo Trabajar con JSON en JavaScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-work-with-json-in-javascript)
:::


## Introducción

Debido a que JSON se deriva del lenguaje de programación JavaScript, es una opción natural usarlo como formato de datos en JavaScript. JSON, abreviatura de JavaScript Object Notation, normalmente se pronuncia como el nombre "Jason".

Para obtener más información sobre JSON en términos generales, lea el tutorial "[Introducción a JSON](./an-introduction-to-json)".

Para comenzar a pensar en dónde puede usar JSON en sus programas JavaScript, algunos casos de uso generales de JSON incluyen:

- Almacenamiento de datos
- Generar estructuras de datos a partir de la entrada del usuario.
- Transferir datos de servidor a cliente, de cliente a servidor y de servidor a servidor
- Configurar y verificar datos

Este tutorial le proporcionará una introducción a cómo trabajar con JSON en JavaScript. Para aprovechar al máximo esta introducción, debe estar familiarizado con el lenguaje de programación JavaScript.


## Formato JSON

El formato JSON se deriva de la sintaxis de objetos de JavaScript, pero está completamente basado en texto. Es un formato de datos clave-valor que normalmente se representa entre llaves.

Cuando trabaja con JSON, probablemente verá objetos JSON en un archivo `.json`, pero también pueden existir como un objeto JSON o una cadena dentro del contexto de un programa. Lea más sobre la [sintaxis y la estructura aquí](./an-introduction-to-json).

📃`sammy.json`
```json
{ 
  "first_name"  :  "Sammy", 
  "last_name"   :  "Shark", 
  "online"      :  true 
}
```

Si, en cambio, tienes un objeto JSON en un archivo `.js` o `.html`, probablemente lo verás configurado en una variable:


```js
var sammy = { 
  "first_name"  :  "Sammy", 
  "last_name"   :  "Shark", 
  "online"      :  true 
}
```


Además, es posible que vea JSON como una cadena en lugar de un objeto dentro del contexto de un archivo de programa o secuencia de comandos JavaScript. En este caso, también podrás verlo todo en una sola línea:


```js
var sammy = '{"first_name" : "Sammy", "last_name" : "Shark", "location" : "Ocean"}';
```

Convertir objetos JSON en cadenas puede resultar especialmente útil para transportar datos de forma rápida.

Hemos repasado el formato general de JSON y cómo puede esperar verlo como un archivo `.json` o dentro de JavaScript como un objeto o una cadena.


## Comparación al Objeto JavaScript

Vale la pena tener en cuenta que JSON fue desarrollado para ser utilizado por cualquier lenguaje de programación, mientras que los objetos JavaScript solo se pueden trabajar directamente a través del lenguaje de programación JavaScript.

En términos de sintaxis, los objetos JavaScript son similares a JSON, pero las claves de los objetos JavaScript no son cadenas entre comillas. Además, los objetos JavaScript están menos limitados en términos de tipos pasados ​​a valores, por lo que pueden usar funciones como valores.

Veamos un ejemplo de un objeto JavaScript del usuario del sitio web Sammy Shark que está actualmente en línea.


```js
var user = {
    first_name: "Sammy",
    last_name : "Shark",
    online    : true,
    full_name : function() {
       return this.first_name + " " + this.last_name;
    }
};
```

Esto le resultará muy familiar como objeto JSON, pero no hay comillas alrededor de ninguna de las claves (`first_name`, `last_name`, `online` o `full_name`) **y** hay un valor de función en la última línea.

Si queremos acceder a los datos del objeto JavaScript anterior, podríamos usar la [notación de puntos](./how-to-work-with-json-in-javascript.html#acceso-a-datos-json) para llamar a `user.first_name;` y obtener una cadena, pero si queremos acceder al nombre completo, tendríamos que hacerlo llamando a `user.full_name();` porque es una función.

Los objetos JavaScript solo pueden existir dentro del lenguaje JavaScript, por lo que cuando trabaja con datos a los que se debe acceder mediante varios idiomas, es mejor optar por JSON.

## Acceso a Datos JSON

Normalmente se accede a los datos JSON en Javascript mediante notación de puntos. Para entender cómo funciona esto, consideremos el objeto JSON `sammy`:


```js
var sammy = { 
  "first_name"  :  "Sammy", 
  "last_name"   :  "Shark", 
  "online"      :  true 
}
```


Para acceder a cualquiera de los valores, usaremos una notación de puntos que se ve así:


```js
sammy.first_name
sammy.last_name
sammy.online
```


La variable `sammy` está primero, seguida de un punto, seguida de la clave a la que se accederá.


Para crear una alerta de JavaScript que nos muestre el valor asociado a la clave `first_name` en una ventana emergente, podemos hacerlo llamando a la función JavaScript `alert()`:


```js
alert(sammy.first_name);
```

```sh
Output
Sammy
```


Aquí, hemos llamado con éxito el valor asociado con la clave `first_name` del objeto JSON `sammy`.


También podemos utilizar la sintaxis de corchetes para acceder a datos desde JSON. Para hacer eso, mantendríamos la clave entre comillas dobles entre corchetes. Para nuestra variable `sammy` anterior, el uso de la sintaxis de corchetes en una función `alert()` se ve así:


```js
alert(sammy["online"]);
```

```sh
Output
true
```

Cuando trabaja con [elementos de una matriz anidada](./an-introduction-to-json.html#matrices-anidadas), debe llamar al número del elemento en su matriz. Consideremos el JSON a continuación:



```js
var user_profile = { 
  "username" : "SammyShark",
  "social_media" : [
    {
      "description" : "twitter",
      "link" : "https://twitter.com/digitalocean"
    },
    {
      "description" : "facebook",
      "link" : "https://www.facebook.com/DigitalOceanCloudHosting"
    },
    {
      "description" : "github",
      "link" : "https://github.com/digitalocean"
    }
  ]
}
```

Para acceder a la cadena `facebook`, podemos llamar a ese elemento en la matriz dentro del contexto de la notación de puntos:


```js
alert(user_profile.social_media[1].description);
```


```sh
Output
facebook
```


Observe que para cada elemento anidado usaremos un punto adicional.

El uso de notación de puntos o sintaxis de corchetes nos permite acceder a los datos contenidos en formato JSON.


## Funciones para Trabajar con JSON

Esta sección analizará dos métodos para encadenar y analizar JSON. Poder convertir JSON de objeto a cadena y viceversa es útil para transferir y almacenar datos.


### JSON.stringify()

La función `JSON.stringify()` convierte un objeto en una cadena JSON.

Las cadenas son útiles para transportar datos de un cliente a un servidor mediante el almacenamiento o el paso de información de forma ligera. Por ejemplo, puede recopilar la configuración de un usuario en el lado del cliente y luego enviarla a un servidor. Más tarde, podrá leer la información con el método `JSON.parse()` y trabajar con los datos según sea necesario.

Veremos un objeto JSON que asignamos a la variable `obj` y luego lo convertiremos usando `JSON.stringify()` pasando `obj` a la función. Podemos asignar esta cadena a la variable `s`:



```js
var obj = {"first_name" : "Sammy", "last_name" : "Shark", "location" : "Ocean"}

var s = JSON.stringify(obj)
```

Ahora, si trabajamos con `s`, tendremos el JSON disponible como una cadena en lugar de un objeto.


```js
'{"first_name" : "Sammy", "last_name" : "Shark", "location" : "Ocean"}'
```

La función `JSON.stringify()` nos permite convertir objetos en cadenas. Para hacer lo contrario, veremos la función `JSON.parse()`.


### JSON.parse()

Las cadenas son útiles para el transporte, pero querrás poder convertirlas nuevamente en un objeto JSON en el lado del cliente y/o del servidor. Podemos hacer esto usando la función `JSON.parse()`.


Para convertir el ejemplo de la sección [JSON.stringify()](./how-to-work-with-json-in-javascript.html#json-stringify) anterior, pasaríamos la cadena `s` a la función y la asignaríamos a una nueva variable:



```js
var o = JSON.parse(s)
```


Entonces, tendríamos el objeto `o` con el que trabajar, que sería idéntico al objeto `obj`.


Para profundizar más, consideremos un ejemplo de `JSON.parse()` dentro del contexto de un archivo HTML:


```html
<!DOCTYPE html>
<html>
<body>

<p id="user"></p>

<script>
var s = '{"first_name" : "Sammy", "last_name" : "Shark", "location" : "Ocean"}';

var obj = JSON.parse(s);

document.getElementById("user").innerHTML =
"Name: " + obj.first_name + " " + obj.last_name + "<br>" +
"Location: " + obj.location;
</script>

</body>
</html>
```


```sh
Output
Name: Sammy Shark
Location: Ocean
```

Dentro del contexto de un archivo HTML, podemos ver cómo la cadena JSON `s` se convierte en un objeto que se puede recuperar en la representación final de la página [accediendo al JSON](./how-to-work-with-json-in-javascript.html#acceso-a-datos-json) mediante notación de puntos.

`JSON.parse()` es una función segura para analizar cadenas JSON y convertirlas en objetos.


## Conclusión

JSON es un formato natural para usar en JavaScript y tiene muchas implementaciones disponibles para usar en muchos lenguajes de programación populares. Si desea utilizar el formato en otro idioma de programación, puede ver la compatibilidad completa con el idioma en el sitio ["Introduciendo JSON"](https://www.json.org/json-en.html).

Debido a que es liviano y se transfiere fácilmente entre sistemas y lenguajes de programación, JSON ha experimentado un mayor soporte en las API, incluida la [API de Twitter](https://www.digitalocean.com/community/tutorials/how-to-create-a-twitter-app-with-python).

Probablemente no creará sus propios archivos `.json`, sino que los obtendrá de otras fuentes. Puede consultar estos [recursos](/an-introduction-to-json.html) para obtener información sobre cómo convertir otras estructuras de datos a JSON.
