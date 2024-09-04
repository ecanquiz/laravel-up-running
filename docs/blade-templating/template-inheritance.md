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

## Including View Partials
