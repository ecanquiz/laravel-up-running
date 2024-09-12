# Plantillas Blade

En comparación con la mayoría de los demás lenguajes de backend, PHP funciona relativamente bien como lenguaje de plantillas. Pero tiene sus deficiencias y también es feo usar `<?php` en línea por todos lados, por lo que se puede esperar que la mayoría de los frameworks modernos ofrezcan un lenguaje de plantillas.

Laravel ofrece un motor de plantillas personalizado llamado _Blade_, que está inspirado en el motor _Razor_ de _.NET_. Se jacta de una sintaxis concisa, una curva de aprendizaje sencilla, un modelo de herencia potente e intuitivo y una fácil extensibilidad.

Para ver rápidamente cómo se escribe Blade, consulte el ejemplo siguiente.

_Muestras de Blade_
```html
<h1>{{ $group->title }}</h1>
{!! $group->heroImageHtml() !!}

@forelse ($users as $user)
    • {{ $user->first_name }} {{ $user->last_name }}<br>
@empty
    No users in this group.
@endforelse
```

Como puede ver, Blade utiliza llaves para su _“echo”_ e introduce una convención en la que sus etiquetas personalizadas, llamadas _“directives”_, tienen como prefijo `@`. Utilizará directivas para todas sus estructuras de control y también para la herencia y cualquier funcionalidad personalizada que desee agregar.

La sintaxis de Blade es clara y concisa, por lo que, en esencia, es más agradable y ordenado trabajar con él que con las alternativas. Pero en el momento en que necesitas algo de cierta complejidad en tus plantillas — herencia anidada, condicionales complejos o recursión — Blade comienza a brillar de verdad. Al igual que los mejores componentes de Laravel, toma requisitos de aplicaciones complejas y los hace fáciles y accesibles.

Además, dado que toda la sintaxis de Blade se compila en código PHP normal y luego se almacena en caché, es rápido y te permite usar PHP nativo en tus archivos Blade si lo deseas. Sin embargo, te recomendaría evitar usar PHP en la medida de lo posible — por lo general, si necesitas hacer algo que no puedes hacer con Blade o una directiva Blade personalizada, no pertenece a la plantilla.

:::info Uso de Twig con Laravel

A diferencia de muchos otros frameworks basados ​​en _Symfony_, Laravel no utiliza _Twig_ de forma predeterminada. Pero si te encanta _Twig_, existe un [paquete _TwigBridge_](https://github.com/rcrowe/TwigBridge) que facilita el uso de _Twig_ en lugar de _Blade_.
:::

## Haciendo Echo de Los Datos

Como puede ver en el ejemplo anterior, `{ { and } }` se utilizan para encapsular secciones de PHP que desea _hacer echo_. _`{ { variable } }`_ es similar a _`<?= $variable ?>`_ en PHP simple.

Sin embargo, hay un aspecto diferente, y es posible que ya lo hayas adivinado: Blade escapa todos los _echos_ de forma predeterminada utilizando `htmlentities()` de PHP para proteger a tus usuarios de la inserción de _scripts_ maliciosos. Eso significa que `{ { $variable } }` es funcionalmente equivalente a `<?= htmlentities($variable) ?>`. Si quieres hacer _echo_ sin el escape, utiliza `{!!and !!}` en su lugar.

>**`{ { and } }` Cuando se Utiliza un Framework de Plantillas de Interfaz de Usuario**
>
>Es posible que hayas notado que la sintaxis de _echo_ para Blade (`{ { } }`) es similar a la sintaxis de _echo_ para muchos frameworks _frontend_. Entonces, ¿cómo sabe Laravel cuándo estás escribiendo Blade o _Handlebars_?
>
>Blade ignorará cualquier `{ {` que esté precedido por un `@`. Por lo tanto, analizará el primero de los siguientes ejemplos, pero el segundo se >reproducirá directamente:
>
>```php
>// Parsed as Blade; the value of $bladeVariable is echoed to the view
>{{ $bladeVariable }}
>
>// @ is removed and "{{ handlebarsVariable }}" echoed to the view directly
>@{{ handlebarsVariable }}
>```
>
>También puedes envolver cualquier sección grande de contenido de _script_ con la [`directiva @verbatim`](https://laravel.com/docs/11.x/blade#the-at-verbatim-directive).
