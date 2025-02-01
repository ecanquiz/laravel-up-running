# Configuración de Laravel Vite

Vite es un entorno de desarrollo frontend local que combina un servidor de desarrollo y una cadena de herramientas de compilación basada en Rollup. Puede parecer mucho, pero en Laravel, se usa principalmente para agrupar activos CSS y JavaScript.

Laravel ofrece un complemento NPM y una directiva Blade para facilitar el trabajo con Vite. Ambos están incluidos en las aplicaciones de Laravel junto con un archivo de configuración: `vite.config.js`.

Eche un vistazo al ejemplo siguiente para ver cómo se ve el contenido del archivo `vite.config.js` predeterminado.

_El predeterminado `vite.config.js`_
```ts
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

Estamos definiendo los archivos desde los cuales nuestro complemento debe construirse (`input`) y diciendo que queremos que la función “actualizar mi página cada vez que guardo un archivo de vista” esté habilitada (`refresh`).

De forma predeterminada, Vite extrae datos de los dos archivos enumerados en el ejemplo anterior y se actualizará automáticamente cada vez que se produzca un cambio en algún archivo de estas carpetas:

- `app/View/Components/`
- `lang/`
- `resources/lang/`
- `resources/views/`
- `routes/`

Ahora que tenemos nuestra configuración de Vite apuntando a nuestros archivos de entrada CSS y JavaScript, querremos hacer referencia a esos archivos usando la directiva Blade `@vite`, como puede ver en el ejemplo siguiente.

_Uso de la directiva `@vite` de Blade_
```html
<html>
  <head>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
```

¡Eso es todo! A continuación, veamos cómo agrupar archivos con Vite.

:::info
Si su dominio de desarrollo local es seguro (HTTPS), deberá modificar su archivo `vite.config.js` para que apunte a sus credenciales. Si está usando Valet, hay una opción de configuración especial para eso:
```ts
// ...
export default defineConfig({
  plugins: [
    laravel({
        // ...
        valetTls: 'name-of_my-app-here.test',
    }),
  ],
});
```
:::

## Bundling Files with Vite