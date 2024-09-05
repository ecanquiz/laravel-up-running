# Herencia de Plantilla

_Blade_ proporciona una estructura para la herencia de plantillas que permite que las vistas amplíen, modifiquen e incluyan otras vistas.

Veamos cómo se estructura la herencia con _Blade_.

## Definición de secciones con `@section`/`@show` y `@yield`

Comencemos con un diseño _Blade_ de nivel superior, como en el ejemplo siguiente. Esta es la definición de un contenedor de página genérico en el que luego colocaremos contenido específico de la página.

_Diseño Blade_
```php
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

Esto se parece un poco a una página HTML normal, pero puedes ver que hemos definido _yield_ en dos lugares (`title` y `content`) y hemos definido una _section_ en un tercero (`footerScripts`). Tenemos tres directivas _Blade_ aquí: `@yield('content')` solo, `@yield('title', 'Home Page')` con un valor predeterminado definido y `@section/@show` con contenido real en él.

Aunque cada una tiene un aspecto un poco diferente, _las tres funcionan básicamente de la misma manera_. Las tres definen que hay una sección con un nombre determinado (el primer parámetro) que se puede extender más adelante, y las tres definen qué hacer si la sección no se extiende. Lo hacen proporcionando una cadena _fallback_ (`'Home Page'`), ningún _fallback_ (que simplemente no mostrará nada si no se extiende) o un bloque _fallback_ completo (en este caso, `<script src="app.js"></script>`).

¿Qué es diferente? Bueno, claramente, `@yield('content')` no tiene contenido predeterminado. Pero además, el contenido predeterminado en `@yield('title')` solo se mostrará si nunca se extiende. Si se extiende, sus secciones secundarias no tendrán acceso programático al valor predeterminado. `@section/@show`, por otro lado, define un valor predeterminado y lo hace de tal manera que su contenido predeterminado esté disponible para sus secciones secundarias, a través de `@parent`.

Una vez que tenga un diseño principal como este, puede extenderlo en un nuevo archivo de plantilla como en el ejemplo siguiente.

_Extendiendo un Diseño Blade_
```php
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

Esta vista secundaria nos permite cubrir algunos conceptos nuevos en la herencia de _Blade_.

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
```php
<!-- resources/views/home.blade.php -->
<div class="content" data-page-name="{{ $pageName }}">
    <p>Here's why you should sign up for our app: <strong>It's Great.</strong></p>

    @include('sign-up-button', ['text' => 'See just how great it is'])
</div>
```

```php
<!-- resources/views/sign-up-button.blade.php -->
<a class="button button--callout" data-page-name="{{ $pageName }}">
    <i class="exclamation-icon"></i> {{ $text }}
</a>
```

`@include` extrae el archivo parcial y, opcionalmente, le pasa datos. Tenga en cuenta que no solo puede pasar datos _explícitamente_ a un archivo incluido a través del segundo parámetro de `@include`, sino que también puede hacer referencia a cualquier variable dentro del archivo incluido que esté disponible para la vista que lo incluye (`$pageName`, en este ejemplo). Una vez más, puede hacer lo que quiera, pero le recomendaría que considere siempre pasar explícitamente cada variable que desee utilizar, solo para mayor claridad.

También se utilizan las directivas @includeIf, @includeWhen y @includeFirst, como se muestra en el ejemplo siguiente.

_Incluyendo vistas condicionalmente_
```php
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
```php
<!-- resources/views/sidebar.blade.php -->
<div class="sidebar">
    @each('partials.module', $modules, 'module', 'partials.empty-module')
</div>
```

```php
<!-- resources/views/partials/module.blade.php -->
<div class="sidebar-module">
    <h1>{{ $module->title }}</h1>
</div>
```

```php
<!-- resources/views/partials/empty-module.blade.php -->
<div class="sidebar-module">
    No modules :(
</div>
```

Tenga en cuenta la sintaxis `@each`. El primer parámetro es el nombre de la parte de la vista. El segundo es la matriz o colección sobre la que se va a iterar. El tercero es el nombre de la variable con la que se pasará cada elemento (en este caso, cada elemento de la matriz `$modules`) a la vista. Y el cuarto parámetro opcional es la vista que se mostrará si la matriz o colección está vacía (u, opcionalmente, puede pasar una cadena aquí que se utilizará como plantilla).

## Using Components
