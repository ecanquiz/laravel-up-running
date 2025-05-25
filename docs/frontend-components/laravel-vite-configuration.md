# Configuración de Laravel Vite

[Vite](https://vite.dev/) es un entorno de desarrollo frontend local que combina un servidor de desarrollo y una cadena de herramientas de compilación basada en Rollup. Puede parecer mucho, pero en Laravel, se usa principalmente para agrupar activos CSS y JavaScript.

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

## Agrupación de Archivos con Vite

Finalmente, es hora de agrupar nuestros recursos. Hay dos maneras de agruparlos con Vite: "build" y "dev".

Si desea compilar sus archivos una vez, ya sea para entregarlos a producción o para realizar pruebas locales, ejecute `npm run build` y Vite agrupará sus recursos. Sin embargo, si desarrolla localmente, puede que prefiera que Vite inicie un proceso que supervise sus archivos de vista para detectar cambios, reactive la compilación cada vez que detecte cambios y actualice la página en su navegador. Esto es lo que `npm run dev` hace por usted.

Los archivos compilados terminarán en la carpeta `public/build/assets` de su aplicación, con un archivo ubicado en `public/build/manifest.json` que le indica a Laravel y Vite cómo llegar a cada archivo compilado desde su referencia de ruta no compilada.

:::info
La carpeta `public/build` se ignora de forma predeterminada en `.gitignore` de Laravel, así que asegúrese de ejecutar `npm run build` como parte de su proceso de implementación.
:::

## El Servidor Dev de Vite

Al ejecutar `npm run dev`, se crea un servidor HTTP real, impulsado por Vite. El asistente Vite Blade reescribe las URL de los recursos para que apunten a las mismas ubicaciones en el servidor de desarrollo, en lugar de a su dominio local. Esto permite a Vite actualizar y actualizar sus dependencias con mayor rapidez.

Esto significa que si escribes la siguiente llamada Blade:

```php
@vite(['resources/css/app.css', 'resources/js/app.js'])
```

Se verá así en su aplicación de producción:

```html
<link rel="preload" as="style"
    href="http://my-app.test/build/assets/app-1c09da7e.css" />
<link rel="modulepreload"
    href="http://my-app.test/build/assets/app-ea0e9592.js" />
<link rel="stylesheet"
    href="http://my-app.test/build/assets/app-1c09da7e.css" />
<script type="module"
    src="http://my-app.test/build/assets/app-ea0e9592.js">
</script>
```

Pero se verá algo así localmente si su servidor Vite está ejecutándose:

```html
<script type="module" src="http://127.0.0.1:5173/@vite/client"></script>
<link rel="stylesheet" href="http://127.0.0.1:5173/resources/css/app.css" />
<script type="module" src="http://127.0.0.1:5173/resources/js/app.js"></script>
```

## Trabajar con Activos Estáticos y Vite

Hasta ahora solo hemos visto cómo cargar JavaScript y CSS con Vite. Sin embargo, la configuración de Vite de Laravel también puede procesar y versionar tus recursos estáticos (como imágenes).

Si trabaja con plantillas de JavaScript, Vite capturará los enlaces a cualquier recurso estático _relativo_, los procesará y versionará. Vite ignorará cualquier recurso estático _absoluto_.

Esto significa que las siguientes imágenes recibirán un tratamiento diferente si están en plantillas de JavaScript.

```html
<!-- Ignored by Vite -->
<img src="/resources/images/soccer.jpg">
<!-- Processed by Vite -->
<img src="../resources/images/soccer.jpg">
```

Si trabaja con plantillas Blade, deberá seguir dos pasos para que Vite gestione sus activos estáticos. Primero, deberá usar la llamada de fachada `Vite::asset` para vincular su activo:

```html
<img src="{{ Vite::asset('resources/images/soccer.jpg') }}">
```

En segundo lugar, deberá agregar un paso de configuración a su archivo `resources/js/app.js` que muestre a Vite qué archivos o carpetas importar:

```js
import.meta.glob([
  // Imports all the files in /resources/images/
  '../images/**',
]);
```

:::info
Si ejecuta el servidor Vite con `npm run dev`, el servidor puede cargar sus recursos estáticos _sin_ que usted agregue la configuración `import.meta.glob`. Esto significa que podría pensar que se mostrará, pero fallará en su compilación de producción.
:::

## Trabajar con Frameworks de JavaScript y Vite

>Si desea trabajar con [Vue](https://vuejs.org/), [React](https://react.dev/), [Inertia](https://inertiajs.com/) o una [aplicación de página única (SPA)](https://en.wikipedia.org/wiki/Single-page_application), es posible que necesite instalar complementos específicos o configurar elementos específicos. A continuación, se detallan los requisitos básicos para los escenarios más comunes.

### Vite y Vue

Para trabajar con Vite y Vue, primero instale el complemento Vue de Vite:

```sh
npm install --save-dev @vitejs/plugin-vue
```

Luego, debe modificar su archivo `vite.config.js` para llamar al complemento de Vue, pasándole dos opciones de configuración. La primera, `template.transformAssetUrls.base=null`, permite que el complemento de Laravel, en lugar del complemento de Vue, gestione la reescritura de URL. La segunda, `template.transformAssetUrls.includeAbsolute=false`, permite que las URL dentro de las plantillas de Vue hagan referencia a archivos en el directorio público:

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    laravel(['resources/js/app.js']),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
  ],
});
```

### Vite y React

Para trabajar con Vite y React, primero instale el complemento React de Vite:

```sh
npm install --save-dev @vitejs/plugin-react
```

Luego debes modificar tu archivo `vite.config.js` para llamar al complemento React:

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel(['resources/js/app.js']),
    react(),
  ],
});
```

Por último, agregue la directiva Blade `@viteReactRefresh` en su plantilla antes de importar sus archivos JavaScript con `@vite`:

```php
@viteReactRefresh
@vite('resources/js/app.jsx')
```

### Vite e Inercia

Si configuras Inertia tú mismo, lo necesitarás para resolver los componentes de tu página.

Aquí tienes un ejemplo del código que probablemente escribirás en el archivo `resources/js/app.js`, pero la mejor opción es instalar Inertia con Breeze, Jetstream o la documentación de Inertia.

```js
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
    return pages[`./Pages/${name}.vue`]
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})
```

### Vite y SPAs

Si estás creando una SPA, elimina `resources/css/app.css` de tu archivo `vite.config.js`, lo que lo elimina como punto de entrada.

En su lugar, importa tu CSS a tu JavaScript añadiendo esta línea a tu archivo `resources/js/app.js`, justo debajo de importar el bootstrap:

```js
import './bootstrap';
import '../css/app.css';
```

## Using Environment Variables in Vite