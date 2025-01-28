# Componentes del Frontend

Laravel es conocido principalmente como un framework PHP, pero también es _full stack_, lo que significa que tiene una serie de componentes y convenciones enfocados en generar código frontend. Algunos de estos, como paginación y bolsas de mensajes, son ayudantes PHP que apuntan al frontend, pero Laravel también proporciona un sistema de construcción de frontend basado en Vite, algunas convenciones sobre recursos no-PHP y varios kits de inicio.

## Kits de Inicio de Laravel

De fábrica, Laravel proporciona un sistema de compilación completo, que cubriremos en breve, pero también incluye kits de inicio fáciles de instalar que contienen plantillas, autenticación, estilos, JavaScript y flujos de trabajo de registro y gestión de usuarios.

Los dos kits de inicio de Laravel se llaman Breeze y Jetstream.

Breeze es la opción más sencilla; proporciona todas las rutas, vistas y estilos necesarios para el sistema de autenticación de Laravel, incluidos el registro, el inicio de sesión, el restablecimiento de contraseña, la confirmación de contraseña, la confirmación por correo electrónico y una página de "editar perfil". Breeze incluye estilos Tailwind y puedes elegir entre plantillas Blade o Inertia con React o Vue.

Jetstream es más complejo y robusto; ofrece todo lo que ofrece Breeze, pero también agrega autenticación de dos factores, administración de sesiones, administración de tokens de API y funciones de administración de equipos. Jetstream incluye estilos Tailwind y puedes elegir entre Livewire o Inertia con Vue.

:::info Inertia
Es una herramienta de interfaz que te permite crear aplicaciones de una sola página en JavaScript, mientras usas rutas y controladores de Laravel para proporcionar el enrutamiento y los datos a cada vista, como si fuera una aplicación tradicional renderizada en servidor. Obtén más información en [inertiajs.com](https://inertiajs.com/).
:::

Si recién estás comenzando a usar Laravel, Breeze es más fácil de entender y se puede usar solo con Blade. La mayoría de las aplicaciones de Laravel funcionan bien solo con Breeze.

Jetstream no tiene una opción exclusiva para Blade ni tampoco una opción para React; necesitarás trabajar con algún tipo de framework de frontend. Tu opción es Vue/Inertia o Livewire, que es un proyecto que te permite escribir principalmente código de backend pero obtener interactividad de frontend en tus aplicaciones Laravel. Sin embargo, Jetstream es más robusto, así que si te sientes cómodo con Laravel y Livewire o Inertia, y tu proyecto necesita esas características adicionales, Jetstream puede ser tu mejor opción.

## Breeze de Laravel

Laravel Breeze es un kit de inicio simple que proporciona todo lo que necesita para una aplicación Laravel promedio para permitir que sus usuarios se registren, inicien sesión y administren sus perfiles.

### Instalación de Breeze

Breeze está pensado para instalarse en aplicaciones nuevas, por lo que suele ser lo primero que instalarás cuando inicies una nueva aplicación:

```sh
laravel new myProject
cd myProject
composer require laravel/breeze --dev
```

Una vez que Breeze se agregue a su proyecto, ejecutará su instalador:

```sh
php artisan breeze:install
```

Una vez que ejecute el instalador, se le solicitará que elija una pila: Blade, Inertia con React, Inertia con Vue o API, que está diseñada para impulsar una interfaz que no sea de Inertia, como Next.js. Estas pilas se explican en la siguiente sección.

Después de instalar Breeze, asegúrese de ejecutar sus migraciones y crear su interfaz:

```sh
php artisan migrate
npm install
npm run dev
```

### Lo que viene con Breeze

Breeze registra automáticamente las rutas para las páginas de registro, inicio de sesión, cierre de sesión, restablecimiento de contraseña, verificación de correo electrónico y confirmación de contraseña. Estas rutas se almacenan en un nuevo archivo `routes/auth.php`.

La forma sin API de Breeze también registra rutas para un panel y una página de “editar perfil” para los usuarios, y agrega estas rutas directamente al archivo `routes/web.php`.

La forma sin API de Breeze también publica controladores para la página de “editar perfil”, verificación de correo electrónico, restablecimiento de contraseñas y varias otras funciones relacionadas con la autenticación.

Además, agrega Tailwind, Alpine.js y PostCSS (para Tailwind). Más allá de estos archivos y dependencias compartidas, cada pila agrega los suyos propios, exclusivos para sus necesidades:

- Breeze Blade

Breeze Blade incluye una serie de plantillas Blade para todas las funciones mencionadas anteriormente, que puede encontrar en `resources/views/auth`, `resources/view/components`, `resources/views/profile` y algunas otras por ahí.

- Breeze Inertia

Ambas pilas de Inertia incorporan Inertia, Ziggy (una herramienta para generar URLs a rutas de Laravel en JavaScript), el componente “forms” de Tailwind y los paquetes de JavaScript necesarios para que sus respectivos frameworks frontend funcionen. Ambas también publican una plantilla Blade básica que carga Inertia y una serie de componentes React/Vue para todas las páginas publicadas en el directorio `resources/js`.

- API de Breeze

La pila de API para Breeze instala significativamente menos código y menos paquetes que las otras pilas, pero también elimina los archivos de arranque existentes que vienen con todas las nuevas aplicaciones de Laravel. La pila de API está pensada para preparar una aplicación para que sea _solo_ un backend de API para una aplicación Next.js independiente, por lo que elimina `package.json`, todos los archivos JavaScript y CSS y todas las plantillas de frontend.

## Laravel Jetstream

