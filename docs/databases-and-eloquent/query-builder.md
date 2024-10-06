# Generador de Consultas

Ahora que está conectado y ha migrado y agregado las semillas a sus tablas, comencemos a usar las herramientas de base de datos. En el centro de cada pieza de la funcionalidad de base de datos de Laravel se encuentra el _generador de consultas_, una interfaz fluida para interactuar con varios tipos diferentes de bases de datos con una única API clara.


>## ¿Qué Es una Interfaz Fluida?
>Una _interfaz fluida_ es aquella que utiliza principalmente el encadenamiento de métodos para proporcionar una API más simple al usuario final. En lugar de esperar que todos los datos relevantes se pasen a un constructor o a una llamada de método, las cadenas de llamadas fluidas se pueden crear de forma gradual, con llamadas consecutivas. Considere esta comparación::
>```php
>// Non-fluent:
>$users = DB::select(['table' => 'users', 'where' => ['type' => 'donor']]);
>// Fluent:
>$users = DB::table('users')->where('type', 'donor')->get();
>```

La arquitectura de base de datos de Laravel puede conectarse a MySQL, PostgreSQL, SQLite y SQL Server a través de una única interfaz, con solo cambiar algunos ajustes de configuración.

Si alguna vez ha utilizado un framework PHP, probablemente haya utilizado una herramienta que le permite ejecutar consultas SQL _"raw"_ (sin procesar) con un escape básico para mayor seguridad. El generador de consultas es eso, con muchas capas de conveniencia y ayudantes encima. Entonces, comencemos con algunas llamadas simples.

## Uso Básico de la Fachada `DB`

Antes de comenzar a crear consultas complejas con encadenamiento de métodos fluido, veamos algunos ejemplos de comandos de creación de consultas. La fachada `DB` se utiliza tanto para el encadenamiento de consultas como para consultas sin formato más simples, como se ilustra en el ejemplo siguiente.

_Ejemplo de uso de SQL sin procesar y generador de consultas_
```php
// Basic statement
DB::statement('drop table users');

// Raw select, and parameter binding
DB::select('select * from contacts where validated = ?', [true]);

// Select using the fluent builder
$users = DB::table('users')->get();

// Joins and other complex calls
DB::table('users')
    ->join('contacts', function ($join) {
        $join->on('users.id', '=', 'contacts.user_id')
            ->where('contacts.type', 'donor');
    })
    ->get();
```

## Raw SQL
