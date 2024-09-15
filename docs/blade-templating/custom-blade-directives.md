# Directivas Blade Personalizadas

Toda la sintaxis incorporada de Blade que hemos cubierto hasta ahora — `@if`, `@unless`, etc. — se denomina _directivas_. Cada directiva de Blade es una asignación entre un patrón (por ejemplo, `@if ($condition)`) y una salida PHP (por ejemplo, `<?php if ($condition): ?>`).

Las directivas no son solo para el núcleo; de hecho, puedes crear las tuyas propias. Podrías pensar que las directivas son buenas para crear pequeños atajos a fragmentos de código más grandes — por ejemplo, usar `@button('buttonName')` y hacer que se expanda a un conjunto más grande de botones HTML. Esta no es una mala idea, pero para una expansión de código simple como esta, tal vez sea mejor incluir una vista parcial.

Las directivas personalizadas suelen ser más útiles cuando simplifican alguna forma de lógica repetida. Digamos que estamos cansados ​​de tener que encapsular nuestro código con `@if (auth()->guest())` (para comprobar si un usuario ha iniciado sesión o no) y queremos una directiva `@ifGuest` personalizada. Al igual que con los compositores de vistas, podría valer la pena tener un proveedor de servicios personalizado para registrarlos, pero por ahora, simplemente pongámoslo en el método `boot()` de `App\Providers\AppServiceProvider`. Eche un vistazo al ejemplo siguiente para ver cómo se verá esta vinculación.

_Vinculación de una directiva Blade personalizada en un proveedor de servicios_
```php
public function boot(): void
{
    Blade::directive('ifGuest', function () {
        return "<?php if (auth()->guest()): ?>";
    });
}
```

Ahora hemos registrado una directiva personalizada, `@ifGuest`, que será reemplazada por el código PHP `<?php if (auth()->guest()): ?>`.

Puede que esto te parezca extraño. Estás escribiendo una _cadena_ que se devolverá y luego se ejecutará como PHP. Pero lo que esto significa es que ahora puedes tomar los aspectos complejos, feos, poco claros o repetitivos de tu código de plantilla PHP y ocultarlos detrás de una sintaxis clara, simple y expresiva.

:::info Almacenamiento en Caché de Resultados de Directivas Personalizadas

Es posible que sienta la tentación de aplicar algo de lógica para que su directiva personalizada sea más rápida realizando una operación en el vínculo y luego incorporando el resultado dentro de la cadena devuelta:
```php
Blade::directive('ifGuest', function () {
    // Antipattern! Do not copy.
    $ifGuest = auth()->guest();
    return "<?php if ({$ifGuest}): ?>";
});
```
El problema con esta idea es que supone que esta directiva se volverá a crear en cada carga de página. Sin embargo, Blade almacena en caché de forma agresiva, por lo que te encontrarás en una mala situación si intentas esto.
:::

## Parámetros en Directivas de Blade Personalizadas

¿Qué sucede si desea aceptar parámetros en su lógica personalizada? Consulte el ejemplo siguiente.

_Creación de una directiva Blade con parámetros_
```php
// Binding
Blade::directive('newlinesToBr', function ($expression) {
    return "<?php echo nl2br({$expression}); ?>";
});
```
```html
<!-- In use -->
<p>@newlinesToBr($message->body)</p>
```

El parámetro `$expression` que recibe la clausura representa lo que está dentro de los paréntesis. Como puede ver, generamos un fragmento de código PHP válido y lo devolvemos.

Si se encuentra escribiendo constantemente la misma lógica condicional una y otra vez, debería considerar una directiva Blade.

## Ejemplo: Usando Directivas Blade Personalizadas para una Aplicación  _Multitenant_

Imaginemos que estamos creando una aplicación que admite _multitenancy_, lo que significa que los usuarios podrían visitar el sitio desde `www.myapp.com`, `client1.myapp.com`, `client2.myapp.com` o desde otro lugar.

Supongamos que hemos escrito una clase para encapsular parte de nuestra lógica _multitenancy_ y la hemos llamado `Context`. Esta clase capturará información y lógica sobre el contexto de la visita actual, como quién es el usuario autenticado y si el usuario está visitando el sitio web público o un subdominio de cliente.

Probablemente resolveremos con frecuencia esa clase `Context` en nuestras vistas y ejecutaremos condicionales en ella, como en el ejemplo siguiente. `app('context')` es un atajo para obtener una instancia de una clase del contenedor, sobre lo cual aprenderemos más en [El Contenedor](../the-container/a-quick-intro-to-dependency-injection.html#el-contenedor).


_Condicionales en contexto sin una directiva Blade personalizada_

```html
@if (app('context')->isPublic())
    &copy; Copyright MyApp LLC
@else
    &copy; Copyright {{ app('context')->client->name }}
@endif
```

 ¿Qué pasaría si pudiéramos simplificar `@if (app('context')->isPublic())` a simplemente `@ifPublic`? Hagámoslo. Veamos el ejemplo siguiente.

 _Condicionales en contexto con una directiva Blade personalizada_
```php
// Binding
Blade::directive('ifPublic', function () {
    return "<?php if (app('context')->isPublic()): ?>";
});
```

```html
<!-- In use -->
@ifPublic
    &copy; Copyright MyApp LLC
@else
    &copy; Copyright {{ app('context')->client->name }}
@endif
```

Dado que esto se resuelve en una simple declaración `if`, aún podemos confiar en las condiciones nativas `@else` y `@endif`. Pero si quisiéramos, también podríamos crear una directiva `@elseIfClient` personalizada, o una directiva `@ifClient` separada, o realmente cualquier otra cosa que queramos.

## Directivas Personalizadas Más Fáciles para Declaraciones `if`

Aunque las directivas Blade personalizadas son potentes, el uso más común para ellas son las instrucciones `if`. Por lo tanto, existe una forma más sencilla de crear directivas `if` personalizadas: `Blade::if()`. El ejemplo siguiente muestra cómo podríamos refactorizar el ejemplo anterior utilizando el método `Blade::if()`:

_Definición de una directiva Blade “if” personalizada_
```php
// Binding
Blade::if('ifPublic', function () {
    return (app('context'))->isPublic();
});
```
Usarás las directivas exactamente de la misma manera, pero como puedes ver, definirlas es un poco más simple. En lugar de tener que escribir manualmente las llaves PHP, puedes escribir una clausura que devuelva un valor Booleano.

