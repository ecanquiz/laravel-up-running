# Introducción a Eloquent

Ahora que hemos cubierto el generador de consultas, hablemos de Eloquent, la herramienta de base de datos insignia de Laravel que se basa en el generador de consultas.

Eloquent es un _ORM de ActiveRecord_, lo que significa que es una capa de abstracción de base de datos que proporciona una única interfaz para interactuar con múltiples tipos de bases de datos. “ActiveRecord” significa que una única clase de Eloquent es responsable no solo de proporcionar la capacidad de interactuar con la tabla en su totalidad (por ejemplo, `User::all()` obtiene todos los usuarios), sino también de representar una fila de tabla individual (por ejemplo, `$sharon = new User`). Además, cada instancia es capaz de administrar su propia persistencia; puede llamar a `$sharon->save()` o `$sharon->delete()`.

Eloquent se centra principalmente en la simplicidad y, al igual que el resto del framework, se basa en la “convención sobre la configuración” para permitirle construir modelos potentes con un código mínimo.

Por ejemplo, con el modelo definido en el ejemplo siguiente:

_El modelo Eloquent más simple_
```php
<?php

use Illuminate\Database\Eloquent\Model;

class Contact extends Model {}
```

Puede realizar todas las operaciones del ejemplo siguiente:

_Operaciones alcanzables con el modelo Eloquent más simple_
```php
// In a controller
public function save(Request $request)
{
    // Create and save a new contact from user input
    $contact = new Contact();
    $contact->first_name = $request->input('first_name');
    $contact->last_name = $request->input('last_name');
    $contact->email = $request->input('email');
    $contact->save();

    return redirect('contacts');
}

public function show($contactId)
{
    // Return a JSON representation of a contact based on a URL segment;
    // if the contact doesn't exist, throw an exception
    return Contact::findOrFail($contactId);
}

public function vips()
{
    // Unnecessarily complex example, but still possible with basic Eloquent
    // class; adds a "formalName" property to every VIP entry
    return Contact::where('vip', true)->get()->map(function ($contact) {
        $contact->formalName = "The exalted {$contact->first_name} of the
        {$contact->last_name}s";

        return $contact;
    });
}
```

¿Cómo? Por convención. Eloquent asume el nombre de la tabla (`Contact` se convierte en `contacts`) y, con eso, tienes un modelo Eloquent completamente funcional.

Veamos cómo trabajamos con los modelos Eloquent.

## Creating and Defining Eloquent Models


