# Generador de Consultas

>## ¿Qué Es una Interfaz Fluida?
>A fluent interface is one that primarily uses method chaining to provide a simpler API
>to the end user. Rather than expecting all of the relevant data to be passed into either
>a constructor or a method call, fluent call chains can be built gradually, with consecu‐
>tive calls. Consider this comparison:
>```php
>// Non-fluent:
>$users = DB::select(['table' => 'users', 'where' => ['type' => 'donor']]);
>// Fluent:
>$users = DB::table('users')->where('type', 'donor')->get();
>```
