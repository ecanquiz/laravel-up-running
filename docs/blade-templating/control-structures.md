# Estructuras de Control

La mayoría de las estructuras de control de Blade te resultarán muy familiares. Muchas reflejan directamente el nombre y la estructura de la misma etiqueta en PHP.

Hay algunas herramientas útiles, pero en general, las estructuras de control tienen un aspecto más limpio que en PHP.

## Condicionales

Primero, echemos un vistazo a las estructuras de control que permiten la lógica.

### `@if`

La función `@if ($condition)` de Blade se compila como `<?php if ($condition): ?>`. `@else`, `@elseif` y `@endif` también se compilan con exactamente el mismo estilo de sintaxis en PHP. Eche un vistazo al ejemplo siguiente.

_`@if`, `@else`, `@elseif` y `@endif`_

```html
@if (count($talks) === 1)
    There is one talk at this time period.
@elseif (count($talks) === 0)
    There are no talks at this time period.
@else
    There are {{ count($talks) }} talks at this time period.
@endif
```
Al igual que con las condiciones nativas de PHP, puedes combinarlas como quieras. No tienen ninguna lógica especial; hay literalmente un analizador que busca algo con la forma de `@if ($condition)` y lo reemplaza con el código PHP apropiado.

### `@unless` y `@endunless`

Por otro lado, `@unless` es una sintaxis nueva que no tiene un equivalente directo en PHP. Es el inverso directo de `@if`. `@unless ($condition)` es lo mismo que `<?php if (!$condition)`. Puedes ver su uso en el ejemplo siguiente.

_`@unless` y `@endunless`_
```html
@unless ($user->hasPaid())
   You can complete your payment by switching to the payment tab.
@endunless
```

## Bucles

A continuación, echemos un vistazo a los bucles.

### `@for`, `@foreach` y `@while`

`@for`, `@foreach` y `@while` funcionan igual en Blade que en PHP; consulte los ejemplos siguientes.

_`@for` y `@endfor`_
```html
@for ($i = 0; $i < $talk->slotsCount(); $i++)
    The number is {{ $i }}<br>
@endfor
```

_`@foreach` y `@endforeach`_
```html
@foreach ($talks as $talk)
    • {{ $talk->title }} ({{ $talk->length }} minutes)<br>
@endforeach
```

_`@while` y `@endwhile`_
```html
@while ($item = array_pop($items))
    {{ $item->orSomething() }}<br>
@endwhile
```

### `@forelse` y `@endforelse`

`@forelse` es un `@foreach` que también te permite programar una función de respaldo si el objeto sobre el que estás iterando está vacío. Lo vimos en acción [al comienzo de este capítulo](./echoing-data.html); el ejemplo siguiente muestra otro.

_`@forelse`_
```html
@forelse ($talks as $talk)
    • {{ $talk->title }} ({{ $talk->length }} minutes)<br>
@empty
    No talks this day.
@endforelse
```

>**`$loop` Dentro de `@foreach` y `@forelse`**
>
>Las directivas `@foreach` y `@forelse` agregan una característica que no está disponible en los bucles `foreach` de PHP: la variable `$loop`. Cuando se utiliza dentro de un bucle `@foreach` o `@forelse`, esta variable devolverá un objeto `stdClass` con estas propiedades:
>- `index`: El índice basado en 0 del elemento actual en el bucle; `0` significaría _"primer elemento"_.
>- `iteration`: El índice basado en 1 del elemento actual en el bucle; `1` significaría _“primer elemento”_.
>- `remaining`: Cuántos elementos quedan en el bucle.
>- `count`: El recuento de elementos en el bucle.
>- `first` y `last`: Valores booleanos que indican si este es el primer o el último elemento del bucle.
>- `even` y `odd`: Valores booleanos que indican si se trata de una iteración par o impar.
>- `depth`: ¿Cuántos “niveles” de profundidad tiene este bucle: `1` para un bucle, `2` para un bucle dentro de un bucle, etc.?
>- `parent`: Una referencia a la variable `$loop` para el elemento del bucle padre si este bucle está dentro de otro bucle `@foreach`; de lo contrario, `null`.

>```html
><ul>
>@foreach ($pages as $page)
>    <li>{{ $loop->iteration }}: {{ $page->title }}
>        @if ($page->hasChildren())
>        <ul>
>        @foreach ($page->children() as $child)
>            <li>{{ $loop->parent->iteration }}
>                .{{ $loop->iteration }}:
>                {{ $child->title }}</li>
>        @endforeach
>        </ul>
>        @endif
>    </li>
>@endforeach
></ul>
>```

