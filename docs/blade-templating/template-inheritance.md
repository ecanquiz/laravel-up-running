# Herencia de Plantilla

Blade proporciona una estructura para la herencia de plantillas que permite que las vistas amplíen, modifiquen e incluyan otras vistas.

Veamos cómo se estructura la herencia con Blade.

## Definición de secciones con `@section`/`@show` y `@yield`

Comencemos con un diseño Blade de nivel superior, como en el ejemplo siguiente. Esta es la definición de un contenedor de página genérico en el que luego colocaremos contenido específico de la página.

_Diseño Blade_
```html
<!-- resources/views/layouts/master.blade.php -->
<html>
    <head>
        <title>My Site | @yield('title', 'Home Page')</title>
    </head>
    <body>
        <div class="container">
            @yield('content')
        </div>
        @section('footerScripts')
            <script src="app.js"></script>
        @show
    </body>
</html>
```

Esto se parece un poco a una página HTML normal, pero puedes ver que hemos definido _yield_ en dos lugares (`title` y `content`) y hemos definido una _section_ en un tercero (`footerScripts`). Tenemos tres directivas Blade aquí: `@yield('content')` solo, `@yield('title', 'Home Page')` con un valor predeterminado definido y `@section/@show` con contenido real en él.

Aunque cada una tiene un aspecto un poco diferente, _las tres funcionan básicamente de la misma manera_. Las tres definen que hay una sección con un nombre determinado (el primer parámetro) que se puede extender más adelante, y las tres definen qué hacer si la sección no se extiende. Lo hacen proporcionando una cadena _fallback_ (`'Home Page'`), ningún _fallback_ (que simplemente no mostrará nada si no se extiende) o un bloque _fallback_ completo (en este caso, `<script src="app.js"></script>`).

¿Qué es diferente? Bueno, claramente, `@yield('content')` no tiene contenido predeterminado. Pero además, el contenido predeterminado en `@yield('title')` solo se mostrará si nunca se extiende. Si se extiende, sus secciones secundarias no tendrán acceso programático al valor predeterminado. `@section/@show`, por otro lado, define un valor predeterminado y lo hace de tal manera que su contenido predeterminado esté disponible para sus secciones secundarias, a través de `@parent`.

Una vez que tenga un diseño principal como este, puede extenderlo en un nuevo archivo de plantilla como en el ejemplo siguiente.

_Extendiendo un Diseño Blade_
```html
<!-- resources/views/dashboard.blade.php -->
@extends('layouts.master')

@section('title', 'Dashboard')

@section('content')
    Welcome to your application dashboard!
@endsection

@section('footerScripts')
    @parent
    <script src="dashboard.js"></script>
@endsection
```

:::info `@show` Versus `@endsection`
Es posible que hayas notado que el primer ejemplo usa `@section/@show`, pero el segundo ejemplo usa `@section/@endsection`. ¿Cuál es la diferencia?

Usa `@show` cuando estás definiendo el lugar para una sección, en la plantilla principal. Usa `@endsection` cuando estás definiendo el contenido para una plantilla en una plantilla secundaria
:::

Esta vista secundaria nos permite cubrir algunos conceptos nuevos en la herencia de Blade.

### `@extends`
En el segundo ejemplo, con `@extends('layouts.master')`, definimos que esta vista no debe representarse por sí sola, sino que en su lugar extiende otra vista. Eso significa que su función es definir el contenido de varias secciones, pero no ser independiente. Es casi más como una serie de contenedores de contenido, en lugar de una página HTML. Esta línea también define que la vista que está extendiendo se encuentra en `resources/views/layouts/master.blade.php`.

Cada archivo solo debe extender otro archivo, y la llamada `@extends` debe ser la primera línea del archivo.

### `@section` y `@endsection`

Con `@section('title', 'Dashboard')`, proporcionamos nuestro contenido para la primera sección, `title`. Dado que el contenido es tan corto, en lugar de usar `@section` y `@endsection`, solo usamos un atajo. Esto nos permite pasar el contenido como el segundo parámetro de `@section` y luego continuar. Si es un poco desconcertante ver `@section` sin `@endsection`, puede usar la sintaxis normal.

Con `@section('content')` y siguientes, usamos la sintaxis normal para definir el contenido de la sección de contenido. Solo agregaremos un pequeño saludo por ahora. Sin embargo, tenga en cuenta que cuando usa `@section` en una vista secundaria, la termina con `@endsection` (o su alias `@stop`), en lugar de `@show`, que está reservado para definir secciones en vistas principales.

### `@parent`

Finalmente, con `@section('footerScripts')` y siguientes, usamos la sintaxis normal para definir el contenido de la sección `footerScripts`.

Pero recuerda, en realidad definimos ese contenido (o, al menos, su “predeterminado”) ya en el diseño maestro. Entonces, esta vez, tenemos dos opciones: podemos _sobrescribir_ el contenido de la vista principal, o podemos _agregarlo_.

Puedes ver que tenemos la opción de incluir el contenido de la vista principal usando la directiva `@parent` dentro de la sección. Si no lo hiciéramos, el contenido de esta sección sobrescribiría por completo todo lo definido en la vista principal para esta sección.

## Incluyendo Vistas Parciales

Ahora que hemos establecido los conceptos básicos de la herencia, hay algunos trucos más que podemos realizar.

### `@include`

¿Qué sucede si estamos en una vista y queremos incluir otra vista? Tal vez tengamos un botón de llamada a la acción _"Sign up"_ que queramos reutilizar en el sitio. Y tal vez queramos personalizar el texto del botón cada vez que lo usemos. Eche un vistazo al ejemplo siguiente.

_Incluir vistas parciales con `@include`_
```html
<!-- resources/views/home.blade.php -->
<div class="content" data-page-name="{{ $pageName }}">
    <p>Here's why you should sign up for our app: <strong>It's Great.</strong></p>

    @include('sign-up-button', ['text' => 'See just how great it is'])
</div>
```

```html
<!-- resources/views/sign-up-button.blade.php -->
<a class="button button--callout" data-page-name="{{ $pageName }}">
    <i class="exclamation-icon"></i> {{ $text }}
</a>
```

`@include` extrae el archivo parcial y, opcionalmente, le pasa datos. Tenga en cuenta que no solo puede pasar datos _explícitamente_ a un archivo incluido a través del segundo parámetro de `@include`, sino que también puede hacer referencia a cualquier variable dentro del archivo incluido que esté disponible para la vista que lo incluye (`$pageName`, en este ejemplo). Una vez más, puede hacer lo que quiera, pero le recomendaría que considere siempre pasar explícitamente cada variable que desee utilizar, solo para mayor claridad.

También se utilizan las directivas @includeIf, @includeWhen y @includeFirst, como se muestra en el ejemplo siguiente.

_Incluyendo vistas condicionalmente_
```html
{{-- Include a view if it exists --}}
@includeIf('sidebars.admin', ['some' => 'data'])

{{-- Include a view if a passed variable is truth-y --}}
@includeWhen($user->isAdmin(), 'sidebars.admin', ['some' => 'data'])

{{-- Include the first view that exists from a given array of views --}}
@includeFirst(['customs.header', 'header'], ['some' => 'data'])
```

### `@each`

Probablemente puedas imaginar algunas circunstancias en las que necesitarías recorrer una matriz o una colección y hacer `@include` un parcial para cada elemento. Hay una directiva para eso: `@each`.

Digamos que tenemos una barra lateral compuesta de módulos y queremos incluir varios módulos, cada uno con un título diferente. Eche un vistazo al ejemplo siguiente.

_Uso de vistas parciales en un bucle con `@each`_
```html
<!-- resources/views/sidebar.blade.php -->
<div class="sidebar">
    @each('partials.module', $modules, 'module', 'partials.empty-module')
</div>
```

```html
<!-- resources/views/partials/module.blade.php -->
<div class="sidebar-module">
    <h1>{{ $module->title }}</h1>
</div>
```

```html
<!-- resources/views/partials/empty-module.blade.php -->
<div class="sidebar-module">
    No modules :(
</div>
```

Tenga en cuenta la sintaxis `@each`. El primer parámetro es el nombre de la parte de la vista. El segundo es la matriz o colección sobre la que se va a iterar. El tercero es el nombre de la variable con la que se pasará cada elemento (en este caso, cada elemento de la matriz `$modules`) a la vista. Y el cuarto parámetro opcional es la vista que se mostrará si la matriz o colección está vacía (u, opcionalmente, puede pasar una cadena aquí que se utilizará como plantilla).

## Uso de Componentes

Laravel ofrece otro patrón para incluir contenido entre vistas: _componentes_. Los componentes tienen más sentido en contextos en los que se utilizan parciales de vista y se pasan grandes fragmentos de contenido a ellos como variables. Eche un vistazo al ejemplo siguiente para ver un modal o ventana emergente que podría alertar al usuario en respuesta a un error u otra acción.

_Un modal como un parcial de vista extraño_
```html
<!-- resources/views/partials/modal.blade.php -->
<div class="modal">
    <h2>{{ $title }}</h2>
    <div>{!! $content !!}</div>
        <div class="close button etc">...</div>
    </div>
```
```html
<!-- in another template -->
@include('partials.modal', [
    'title' => 'Insecure password',
    'content' => '<p>The password you have provided is not valid. Here are the rules
    for valid passwords: [...]</p><p><a href="#">...</a></p>'
])
```

Esto es demasiado para estas pobres variables y es el ajuste perfecto para un componente.

Los componentes de Laravel son otra forma de estructurar las vistas parciales que se parece mucho más a cómo funcionan los componentes en los frameworks frontend como Vue. Puede que sean más familiares para los desarrolladores frontend, pero también tienen algunas ventajas significativas en comparación con las vistas parciales, incluido el hecho de que es mucho más fácil pasarles grandes secciones de código de plantilla.

Eche un vistazo al ejemplo siguiente para ver cómo refactorizar el ejemplo anterior con componentes.

### _Un modal como componente más apropiado_
```html
<!-- resources/views/components/modal.blade.php -->
<div class="modal">
    <h2>{{ $title }}</h2>
    <div>{{ $slot }}</div>

    <div class="close button etc">...</div>
</div>
```
```html
<!-- in another template -->
<x-modal title="Insecure password">
    <p>The password you have provided is not valid.
    Here are the rules for valid passwords: [...]</p>

    <p><a href="#">...</a></p>
</x-modal>
```

Como puede ver en el ejemplo siguiente, los componentes nos permiten extraer nuestro código HTML de una cadena de variables abarrotada y devolverlo al espacio de la plantilla.

Profundicemos en las características de los componentes, cómo están estructurados y cómo los escribimos.

### Creando componentes

Los componentes pueden existir como plantillas Blade puras (componentes anónimos) o como plantillas Blade respaldadas por una clase PHP que inyecta datos y funcionalidad (componentes basados ​​en clases).

Si solo necesita una plantilla, puede generar su componente con el indicador `--view`:

```sh
php artisan make:component modal --view
```

Si también desea generar la clase PHP, excluya esa bandera:

```sh
php artisan make:component modal
```

Si desea agrupar sus componentes en carpetas, puede utilizar el separador `.`:

```sh
# To create it:
php artisan make:component modals.cancellation
```

```html
// To use it:
<x-modals.cancellation />
```

### Pasar datos a los componentes

Hay cuatro formas de pasar datos a los componentes: atributos de cadena, atributos PHP, la ranura predeterminada y ranuras con nombre.

### Pasar datos a los componentes mediante atributos.

Empecemos con los atributos. Puedes pasar cadenas directamente a los componentes pasando atributos sin prefijo, o puedes pasar variables y expresiones PHP con un prefijo de dos puntos, como puedes ver en el ejemplo siguiente.

_Pasar datos a componentes a través de atributos_
```html
<!-- Passing the data in -->
<x-modal title="Title here yay" :width="$width" />
```
```html
<!-- Accessing the data in the template -->
<div style="width: {{ $width }}">
<h1>{{ $title }}</h1>
</div>
```

Para los componentes basados ​​en clases, deberá definir cada atributo en la clase PHP y establecerlo como una propiedad pública en la clase, como en el ejemplo siguiente.

_Definición de atributos como públicos en las clases de componentes_
```php
class Modal extends Component
{
    public function __construct(
        public string $title,
        public string $width,
    ) {}
}
```

Para los componentes anónimos, deberá definir los atributos en una matriz de propiedades en la parte superior de su plantilla:


```html
@props([
    'width',
    'title',
])

<div style="width: {{ $width }}">
    <h1>{{ $title }}</h1>
</div>
```

Pasar datos a componentes a través de ranuras.

En [este ejemplo](./template-inheritance.html#un-modal-como-componente-mas-apropiado), es posible que haya notado que se hacía referencia al contenido del modal como una variable, `$slot`. Pero, ¿de dónde salió esto?

De forma predeterminada, cada componente que tiene una etiqueta de apertura y una de cierre cuando se hace referencia a él tiene una variable `$slot`, y se llena con todo el HTML entre esas dos etiquetas. En [este ejemplo](./template-inheritance.html#un-modal-como-componente-mas-apropiado), la variable `$slot` contiene las dos etiquetas `<p>` y todo lo que está dentro (y entre) ellas.

Pero, ¿qué pasa si necesitas dos o más espacios? Puedes agregar más que el espacio predeterminado, dándole a cada espacio su propio nombre y variable. Rehagamos [este ejemplo](./template-inheritance.html#un-modal-como-componente-mas-apropiado) suponiendo que queremos definir el título en un espacio; echa un vistazo al ejemplo siguiente.

_Definición de múltiples ranuras_
```html
<x-modal>
    <x-slot:title>
        <h2 class="uppercase">Password requirements not met</h2>
    </x-slot>

    <p>The password you have provided is not valid.
    Here are the rules for valid passwords: [...]</p>

    <p><a href="#">...</a></p>
</x-modal>
```

El contenido de esta nueva variable `$slot` será accesible para la plantilla de componente como una variable `$title`, tal como lo era el atributo antes.

### Métodos de componentes

A veces puede resultar útil tener un método auxiliar en un componente que realice alguna lógica. Un patrón común es utilizar estos métodos para comprobaciones lógicas complejas que preferirías mantener fuera de tus plantillas.

Los componentes te permiten llamar a cualquier método público en su clase PHP asociada en la plantilla anteponiendo el nombre del método con `$`, como puedes ver en el ejemplo siguiente.

_Definición y llamada de métodos de componentes_
```php
// in the component definition
public function isPromoted($item)
{
    return $item->promoted_at !== null && ! $item->promoted_at->isPast();
}
```

```html
<!-- in the template -->
<div>
    @if ($isPromoted($item))
        <!-- show promoted badge -->
    @endif
    <!-- ... -->
</div>
```

### Bolsa de mano de atributos

La mayoría de los atributos que pasaremos a nuestros componentes tendrán nombre, serán específicos y similares a los que se pasan a una función PHP.

Pero a veces solo queremos pasar atributos HTML sueltos, casi siempre para que se puedan asignar al elemento raíz de nuestra plantilla.

Con los componentes, puedes capturar todos esos atributos a la vez, utilizando la variable `$attributes`. Esta variable captura todos los atributos no definidos como propiedades y te permite reproducirlos (tratándolos como una cadena) o interactuar con algunos de sus métodos para capturar o inspeccionar datos.

Eche un vistazo a la [documentación](https://laravel.com/docs/11.x/blade#component-attributes) para conocer todas las formas en que puede interactuar con el objeto `$attributes`, pero aquí hay un truco muy útil:

```html
<!-- Merge default classes with passed-in classes -->
<!-- Definition -->
<div {{ $attributes->merge(['class' => 'p-4 m-4']) }}>
    {{ $message }}
</div>
```
```html
<!-- Usage -->
<x-notice class="text-blue-200">
    Message here
</x-notice>
```
```html
<!-- Outputs: -->
<div class="p-4 m-4 text-blue-200">
    Message here
</div>
```

## Usando Pilas

Un patrón común que puede ser difícil de gestionar utilizando inclusiones básicas de Blade es cuando cada vista en una jerarquía de inclusiones de Blade necesita agregar algo a una sección determinada — casi como agregar una entrada a una matriz.

La situación más habitual es cuando determinadas páginas (y, a veces, de forma más amplia, determinadas secciones de un sitio web) tienen archivos CSS y JavaScript específicos y únicos que deben cargarse. Imagina que tienes un archivo CSS “global” para todo el sitio, un archivo CSS de “sección de empleos” y un archivo CSS de página de “solicitud de empleo”.

Las _pilas_ de Blade están diseñadas exactamente para esta situación. En la plantilla principal, defina una pila, que es simplemente un marcador de posición. Luego, en cada plantilla secundaria, puede "empujar" entradas en esa pila con `@push`/`@endpush`, que las agrega al final de la pila en la representación final. También puede usar `@prepend/@endprepend` para agregarlas al principio de la pila. El ejemplo sigiente lo ilustra.

_Uso de pilas de Blade_
```html
<!-- resources/views/layouts/app.blade.php -->
<html>
<head>
    <link href="/css/global.css">
    <!-- the placeholder where stack content will be placed -->
    @stack('styles')

</head>
<body>
    <!-- // -->
</body>
</html>
```

```html
<!-- resources/views/jobs.blade.php -->
@extends('layouts.app')

@push('styles')
    <!-- push something to the bottom of the stack -->
    <link href="/css/jobs.css">
@endpush
```

```html
<!-- resources/views/jobs/apply.blade.php -->
@extends('jobs')

@prepend('styles')
    <!-- push something to the top of the stack -->
    <link href="/css/jobs--apply.css">
@endprepend
```

Estos generan el siguiente resultado:

```html
<html>
    <head>
      <link href="/css/global.css">
      <!-- the placeholder where stack content will be placed -->
      <!-- push something to the top of the stack -->
      <link href="/css/jobs--apply.css">
      <!-- push something to the bottom of the stack -->
      <link href="/css/jobs.css">
    </head>
    <body>
      <!-- // -->
    </body>
</html>
```
