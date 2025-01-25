# Eventos Elocuentes

Los modelos Eloquent lanzan eventos al vacío de tu aplicación cada vez que ocurren ciertas acciones, independientemente de si estás detectando. Si estás familiarizado con pub/sub, se trata del mismo modelo ([equí aprenderás más sobre todo el sistema de eventos de Laravel](../queues-jobs-events-broadcasting-and-the-scheduler/queques.html)).

A continuación, se muestra un resumen rápido de cómo vincular un detector cuando se crea un nuevo `Contact`. Lo vincularemos en el método `boot()` de `AppServiceProvider` e imaginemos que estamos notificando a un servicio de terceros cada vez que creamos un nuevo `Contact` (ejemplo siguiente).

_Vincular un detector a un evento Eloquent_
```php
class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $thirdPartyService = new SomeThirdPartyService;

        Contact::creating(function ($contact) use ($thirdPartyService) {
            try {
                $thirdPartyService->addContact($contact);
            } catch (Exception $e) {
                Log::error('Failed adding contact to ThirdPartyService; canceled.');
                return false; // Cancels Eloquent create()
            }
        });
    }
```

Podemos ver algunas cosas en el ejemplo anterior. Primero, usamos `Modelname::eventName()` como método y le pasamos una clausura. La clausura obtiene acceso a la instancia del modelo en la que se está operando. Segundo, vamos a necesitar definir este receptor en un proveedor de servicios en algún lugar. Y tercero, si devolvemos `false`, la operación se cancelará y `save()` o `update()` se cancelarán.

Estos son los eventos que cada modelo Eloquent dispara:

• `creating`
• `created`
• `updating`
• `updated`
• `saving`
• `saved`
• `deleting`
• `deleted`
• `restoring`
• `restored`
• `retrieved`

La mayoría de estos deberían ser bastante claros, excepto posiblemente `restoring` y `restored`, que se disparan cuando se restaura una fila eliminada-suavemente. Además, `saving` se dispara tanto para `creating` como para `updating` y `saved` se dispara tanto para `created` como para `updated`.

El evento `retrieved` se dispara cuando se recupera un modelo existente de la base de datos.

