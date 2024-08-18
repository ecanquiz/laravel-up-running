# Rutas Firmadas

Muchas aplicaciones envían notificaciones periódicas sobre acciones puntuales (restablecer una contraseña, aceptar una invitación, etc.) y proporcionan enlaces sencillos para realizar esas acciones. Imaginemos que enviamos un correo electrónico para confirmar que el destinatario está dispuesto a ser agregado a una lista de correo.

Hay tres formas de enviar ese enlace:

- Hacer pública esa URL y esperar que nadie más descubra la URL de aprobación o modifique su propia URL de aprobación para aprobar a otra persona.
- Poner la acción detrás de la autenticación, vincular a la acción y exigir al usuario que inicie sesión si aún no lo ha hecho (lo que, en este caso, puede ser imposible, ya que muchos destinatarios de la lista de correo probablemente no sean usuarios con cuentas).
- “Firmar” el enlace para que demuestre de manera única que el usuario recibió el enlace de su correo electrónico, sin que tenga que iniciar sesión, algo como `http://myapp.com/invitations/5816/yes?signature=030ab0ef6a8237bd86a8b8`.

Una forma sencilla de lograr la última opción es utilizar una función llamada _URL firmadas_, que facilita la creación de un sistema de autenticación de firmas para enviar enlaces autenticados. Estos enlaces están compuestos por el enlace de ruta normal con una “firma” adjunta que demuestra que la URL no ha cambiado desde que se envió (y, por lo tanto, que nadie ha modificado la URL para acceder a la información de otra persona).

## Firmar una Ruta

Para crear una URL firmada para acceder a una ruta determinada, la ruta debe tener un nombre:


```php
Route::get('invitations/{invitation}/{answer}', InvitationController::class)
    ->name('invitations');
```

Para generar un enlace normal a esta ruta, utilizaría el asistente `route()`, como ya hemos explicado, pero también podría utilizar la fachada `URL` para hacer lo mismo: `URL::route('invitations', ['invitation' => 12345, 'answer' => 'yes'])`. Para generar un enlace _firmado_ a esta ruta, simplemente utilice el método `signedRoute()`. Y si desea generar una ruta firmada con una fecha de caducidad, utilice `temporarySignedRoute()`:

```php
// Generate a normal link
URL::route('invitations', ['invitation' => 12345, 'answer' => 'yes']);

// Generate a signed link
URL::signedRoute('invitations', ['invitation' => 12345, 'answer' => 'yes']);

// Generate an expiring (temporary) signed link
URL::temporarySignedRoute(
    'invitations',
    now()->addHours(4),
    ['invitation' => 12345, 'answer' => 'yes']
);
```

:::info Uso del Asistente `now()`
Laravel ofrece un asistente `now()` que es el equivalente de `Carbon::now();` devuelve un objeto Carbon que representa el día de hoy, en este mismo segundo.

Carbon es una biblioteca de fecha y hora que está incluida en Laravel.
:::

## Modificar Rutas para Permitir Enlaces Firmados

Ahora que ha generado un enlace a su ruta firmada, debe protegerse contra cualquier acceso no firmado. La opción más sencilla es aplicar el middleware `signed`:

```php
Route::get('invitations/{invitation}/{answer}', InvitationController::class)
    ->name('invitations')
    ->middleware('signed');
```

Si lo prefiere, puede validar manualmente utilizando el método `hasValidSignature()` en el objeto `Request` en lugar de utilizar el middleware `signed`.


```php
class InvitationController
{
    public function __invoke(Invitation $invitation, $answer, Request $request)
    {
        if (! $request->hasValidSignature()) {
            abort(403);
        }

        //
    }
}
```

