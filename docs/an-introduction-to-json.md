# Una Introducción a JSON

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/an-introduction-to-json)
:::

## Introducción

JSON, abreviatura de _JavaScript Object Notation_, es un formato para compartir datos. Como sugiere su nombre, JSON se deriva del lenguaje de programación JavaScript, pero está disponible para su uso en muchos lenguajes, incluidos Python, Ruby, PHP y Java. JSON suele pronunciarse como el nombre "Jason".

JSON también es legible, liviano, ofrece una buena alternativa a XML y requiere mucho menos formato. Esta guía informativa analizará los datos que puede utilizar en archivos JSON y la estructura general y la sintaxis de este formato.

## Comprender la Sintaxis y la Estructura

JSON usa la extensión `.json` cuando está solo y cuando se define en otro formato de archivo (como en `.html`), puede aparecer entre comillas como una cadena JSON o puede ser un objeto asignado a una variable. Este formato se transmite entre el servidor web y el cliente o navegador.

Un _objeto JSON_ es un formato de datos clave-valor que normalmente se representa entre llaves. Cuando trabaja con JSON, probablemente encontrará objetos JSON en un archivo `.json`, pero también pueden existir como un objeto JSON o una cadena dentro del contexto de un programa.

A continuación se muestra un ejemplo de un objeto JSON:


```json
{
  "first_name" : "Sammy",
  "last_name" : "Shark",
  "location" : "Ocean",
  "online" : true,
  "followers" : 987 
}
```

Aunque este es un ejemplo breve, y JSON puede tener muchas líneas de largo, esto demuestra que el formato generalmente se configura con dos llaves (o llaves) que se representan con `{}` en cada extremo y con clave-valor pares que pueblan el espacio entre ellos. La mayoría de los datos utilizados en JSON terminan encapsulados en un objeto JSON.

Los _pares clave-valor_ tienen dos puntos entre ellos como en `"key" : "value"`. Cada par clave-valor está separado por una coma, por lo que la mitad de un JSON enumera lo siguiente: `"key" : "value", "key" : "value", "key": "value"`. En el ejemplo anterior, el primer par clave-valor es `"first_name": "Sammy"`.


Las _claves_ JSON están en el lado izquierdo de los dos puntos. Deben estar entre comillas dobles, como en `"key"`, y pueden ser cualquier cadena válida. Dentro de cada objeto, las claves deben ser únicas. Estas cadenas de claves pueden incluir espacios en blanco, como en `"first name"`, pero eso puede dificultar el acceso cuando estás programando, por lo que es mejor usar guiones bajos, como en "`"first_name"`".

Los _valores_ JSON se encuentran a la derecha de los dos puntos. A nivel granular, estos deben ser uno de los seis tipos de datos siguientes:

- strings
- numbers
- objects
- arrays
- Booleans (true or false)
- null

En un nivel más amplio, los valores también pueden estar compuestos por tipos de datos complejos de objetos o matrices JSON, que se analizan en la siguiente sección.

Cada uno de los tipos de datos que se pasan como valores a JSON mantendrá su propia sintaxis, lo que significa que las cadenas estarán entre comillas, pero los números no.

Con los archivos `.json`, normalmente obtendrás un formato expandido en varias líneas, pero JSON también se puede escribir todo en una sola línea, como en el siguiente ejemplo:


```json
{ "first_name" : "Sammy", "last_name": "Shark",  "online" : true, }
```


Esto es más común dentro de otro tipo de archivo o cuando encuentra una cadena JSON.

Escribir el formato JSON en varias líneas a menudo lo hace mucho más legible, especialmente cuando se trata de un gran conjunto de datos. Debido a que JSON ignora los espacios en blanco entre sus elementos, puede espaciar los dos puntos y los pares clave-valor para que los datos sean aún más legibles para los humanos:


```json
{ 
  "first_name"  :  "Sammy", 
  "last_name"   :  "Shark", 
  "online"      :  true 
}
```


Es importante tener en cuenta que, aunque parecen similares, un objeto JSON no tiene el mismo formato que un _objeto JavaScript_, por lo que, aunque puede utilizar funciones dentro de objetos JavaScript, no puede utilizarlas como valores en JSON. El atributo más importante de JSON es que se puede transferir fácilmente entre lenguajes de programación en un formato con el que todos los lenguajes participantes puedan trabajar. Por el contrario, solo se puede trabajar con objetos JavaScript directamente a través del lenguaje de programación JavaScript.

JSON puede volverse cada vez más complejo con jerarquías compuestas de matrices y objetos anidados. A continuación, aprenderá más sobre estas estructuras complejas.


## Trabajar con Tipos Complejos en JSON

JSON puede almacenar objetos anidados en formato JSON además de matrices anidadas. Estos objetos y matrices se pasarán como valores asignados a claves y también pueden estar compuestos por pares clave-valor.

### Objetos Anidados

En el siguiente archivo `users.json`, para cada uno de los cuatro usuarios (`"sammy"`, `"jesse"`, `"drew"`, `"jamie"`) hay un objeto JSON anidado pasado como valor para cada uno de ellos, con sus propias claves anidadas de `"username"` y `"location"` que se relacionan con cada uno de los usuarios. Cada entrada de usuario en el siguiente bloque de código es un ejemplo de un objeto JSON anidado:


📃`users.json`
```json
{ 
  "sammy" : {
    "username"  : "SammyShark",
    "location"  : "Indian Ocean",
    "online"    : true,
    "followers" : 987
  },
  "jesse" : {
    "username"  : "JesseOctopus",
    "location"  : "Pacific Ocean",
    "online"    : false,
    "followers" : 432
  },
  "drew" : {
    "username"  : "DrewSquid",
    "location"  : "Atlantic Ocean",
    "online"    : false,
    "followers" : 321
  },
  "jamie" : {
    "username"  : "JamieMantisShrimp",
    "location"  : "Pacific Ocean",
    "online"    : true,
    "followers" : 654
  }
}
```

En este ejemplo, se utilizan llaves para formar un objeto JSON anidado con nombre de usuario asociado y datos de ubicación para cada uno de los cuatro usuarios. Como ocurre con cualquier otro valor, cuando se utilizan objetos, se utilizan comas para separar elementos.


### Matrices Anidadas


Los datos también se pueden anidar en formato JSON mediante el uso de matrices de JavaScript que se pasan como un valor. JavaScript utiliza corchetes `[]` en cada extremo de su tipo de matriz. Las matrices son colecciones ordenadas y pueden contener valores de diferentes tipos de datos.

Por ejemplo, puede utilizar una matriz cuando se trata de una gran cantidad de datos que se pueden agrupar, como cuando hay varios sitios web y perfiles de redes sociales asociados con un solo usuario.

Con la primera matriz anidada, un perfil de usuario para `"Sammy"` se puede representar de la siguiente manera:


📃`user_profile.json`
```json
{ 
  "first_name" : "Sammy",
  "last_name" : "Shark",
  "location" : "Ocean",
  "websites" : [
    {
      "description" : "work",
      "URL" : "https://www.digitalocean.com/"
    },
    {
      "desciption" : "tutorials",
      "URL" : "https://www.digitalocean.com/community/tutorials"
    }
  ],
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

La clave `"websites"` y la clave `"social_media"` utilizan cada una una matriz para anidar información perteneciente a los dos enlaces del sitio web de Sammy y los tres enlaces del perfil de las redes sociales. Puede identificar que se trata de matrices gracias al uso de corchetes.

El uso de anidamiento dentro de su formato JSON le permite trabajar con datos más complicados y jerárquicos.


## Comparando JSON con XML

_XML_, o _eXtensible Markup Language_, es una forma de almacenar datos accesibles que pueden ser leídos tanto por humanos como por máquinas. El formato XML está disponible para su uso en muchos lenguajes de programación.

En muchos sentidos, XML es similar a JSON, pero requiere mucho más texto, lo que hace que su lectura y escritura sean más largas y lleven más tiempo. XML también debe analizarse con un analizador XML, pero JSON se puede analizar con una función estándar. Además, a diferencia de JSON, XML no puede utilizar matrices.

A continuación se muestra un ejemplo del formato XML:


📃`users.xml`
```xml
<users>
    <user>
        <username>SammyShark</username> <location>Indian Ocean</location>
    </user>
    <user>
        <username>JesseOctopus</username> <location>Pacific Ocean</location>
    </user>
    <user>
        <username>DrewSquir</username> <location>Atlantic Ocean</location>
    </user>
    <user>
        <username>JamieMantisShrimp</username> <location>Pacific Ocean</location>
    </user>
</users>
```

Ahora, compare los mismos datos representados en JSON:


📃`users.json`
```js
{
  "users": [
    {"username" : "SammyShark", "location" : "Indian Ocean"},
    {"username" : "JesseOctopus", "location" : "Pacific Ocean"},
    {"username" : "DrewSquid", "location" : "Atlantic Ocean"},
    {"username" : "JamieMantisShrimp", "location" : "Pacific Ocean"}
  ]
}
```

JSON es mucho más compacto y no requiere etiquetas finales, mientras que XML sí. Además, XML no utiliza una matriz como lo hace este ejemplo de JSON (lo cual se puede saber mediante el uso de corchetes).

Si está familiarizado con HTML, notará que XML es bastante similar en el uso de etiquetas. Si bien JSON es más sencillo y menos detallado que XML y rápido de usar en muchas situaciones, incluidas las aplicaciones AJAX, primero debes comprender el tipo de proyecto en el que estás trabajando antes de decidir qué estructuras de datos usar.


## Conclusión


JSON es un formato ligero que le permite compartir, almacenar y trabajar con datos. Como formato, JSON ha experimentado un mayor soporte en las API, incluida la [API de Twitter](https://www.digitalocean.com/community/tutorials/how-to-create-a-twitter-app-with-python). JSON también es un formato natural para usar en JavaScript y tiene muchas implementaciones disponibles para usar en varios lenguajes de programación populares. Puede leer el soporte completo de idiomas en el sitio ["Introduciendo JSON"](https://www.json.org/json-en.html).


Debido a que probablemente no creará sus propios archivos `.json` sino que los obtendrá de otras fuentes, es importante pensar menos en la estructura de JSON y más en cómo utilizar mejor JSON en sus programas. Por ejemplo, puede convertir CSV o datos delimitados por tabulaciones que puede encontrar en programas de hojas de cálculo a JSON utilizando la herramienta de código abierto [Mr. Data Converter](https://shancarter.github.io/mr-data-converter/). También puede convertir XML a JSON y viceversa con el [sitio utilidades-online.info](https://www.utilities-online.info/xmltojson) con licencia Creative Commons.

Finalmente, al traducir otros tipos de datos a JSON o crear los suyos propios, puede validar su JSON con [JSONLint](https://jsonlint.com/) y probar su JSON en un contexto de desarrollo web con [JSFiddle](https://jsfiddle.net/).




