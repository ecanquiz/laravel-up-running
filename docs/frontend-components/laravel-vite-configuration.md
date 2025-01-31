# Configuración de Laravel Vite

Vite es un entorno de desarrollo frontend local que combina un servidor de desarrollo y una cadena de herramientas de compilación basada en Rollup. Puede parecer mucho, pero en Laravel, se usa principalmente para agrupar activos CSS y JavaScript.

Laravel ofrece un complemento NPM y una directiva Blade para facilitar el trabajo con Vite. Ambos están incluidos en las aplicaciones de Laravel junto con un archivo de configuración: `vite.config.js`.

Eche un vistazo al ejemplo siguiente para ver cómo se ve el contenido del archivo `vite.config.js` predeterminado.

_El predeterminado `vite.config.js`_
```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});
```

We’re defining the files our plug-in should build from (input) and saying we do want
the “refresh my page every time I save a view file” feature enabled (refresh).