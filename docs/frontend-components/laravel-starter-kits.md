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

## Jetstream de Laravel

Jetstream se basa en la funcionalidad de Breeze y agrega aún más herramientas para iniciar una nueva aplicación; sin embargo, es una configuración más complicada con menos opciones de configuración, por lo que querrá saber que lo necesita antes de elegir Jetstream en lugar de Breeze.

Jetstream, al igual que Breeze, publica rutas, controladores, vistas y archivos de configuración. Al igual que Breeze, Jetstream utiliza Tailwind y viene en diferentes “pilas” tecnológicas.

Sin embargo, a diferencia de Breeze, Jetstream requiere interactividad, por lo que no existe una pila exclusiva de Blade. En cambio, tienes dos opciones: Livewire (que es Blade con algo de interactividad de JavaScript impulsada por PHP) o Inertia/Vue (no existe un formulario React para Jetstream).

Jetstream también amplía la oferta de Breeze al incorporar funciones de gestión de equipos, autenticación de dos factores, gestión de sesiones y gestión de tokens API personales.

### Instalación de Jetstream

Jetstream está diseñado para instalarse en una nueva aplicación de Laravel y puedes instalarlo con Composer:

```sh
laravel new myProject
cd myProject
composer require laravel/jetstream
```

Una vez que Jetstream se haya agregado a su proyecto, deberá ejecutar su instalador. A diferencia de Breeze, no se le solicitará que elija su pila; en su lugar, deberá pasar la pila (livewire o inercia) como primer parámetro.

```sh
php artisan jetstream:install livewire
```

Si desea agregar administración de equipo a su instalación de Jetstream, pase el indicador `--teams` al paso de instalación:

```sh
php artisan jetstream:install livewire --teams
```

Una vez que haya instalado Jetstream, asegúrese de ejecutar sus migraciones y construir su frontend:

```sh
php artisan migrate
npm install
npm run dev
```

### Lo que viene con Jetstream

Jetstream publica una increíble cantidad de código; aquí hay un resumen rápido:

- Se agregó la autenticación de dos factores y la funcionalidad de foto de perfil al modelo `User` (y se agregaron/modificaron las migraciones requeridas)
- Un _dashboard_ para usuarios que han iniciado sesión
- Tailwind, Tailwind forms, Tailwind typography
- Laravel Fortify, el componente de autenticación de backend sobre el que se basa Jetstream
- "Acciones" para Fortify y Jetstream en `app/Actions`
- Texto de Markdown para páginas de términos y políticas en `resources/markdown`
- Un conjunto enorme de pruebas

:::info Fortify
Fortify es un sistema de autenticación sin interfaz gráfica. Proporciona las rutas y los controladores para todas las funciones de autenticación que requiere Laravel, desde el inicio de sesión y el registro hasta el restablecimiento de contraseñas y más, para que las utilice cualquier interfaz que elija.

Jetstream se basa en Fortify, por lo que puede pensar en Jetstream como una de las muchas interfaces posibles antes de Fortify. Jetstream también agrega funcionalidad de backend, por lo que demuestra cuán sólido puede ser un sistema de autenticación respaldado por Fortify.
:::

Las configuraciones Livewire e Inertia de Jetstream vienen con dependencias y ubicaciones ligeramente diferentes para las plantillas:

#### Livewire de Jetstream

La plantilla Livewire de Jetstream prepara su aplicación para funcionar con Livewire y Alpine, y publica componentes Livewire para la interfaz. Proporciona:

- Livewire
- Alpine.js
- Componentes Livewire en `app/View/Components`
- Plantillas de interfaz en `resources/views`

#### Inertia de Jetstream

La plantilla Inertia de Jetstream prepara su aplicación para trabajar con Inertia y Vue, y publica componentes Vue para la interfaz. Proporciona:

- Inertia
- Vue
- Plantillas Vue en `resources/js`

#### Personalizando su instalación jetstream

Jetstream se basa en Fortify, por lo que personalizar Jetstream a veces implicará personalizar Fortify. Puede actualizar cualquier configuración en `config/fortify.php`, `config/jetstream.php`, `FortifyServiceProvider` y `JetstreamServiceProvider`.

Mientras que Breeze publica controladores para que usted modifique sus comportamientos, Jetstream publica acciones, cada una de ellas un fragmento único de comportamiento con nombres como `ResetUserPassword.php` y `DeleteUser.php`.

#### Más funciones de Jetstream

Jetstream permite que su aplicación administre equipos, tokens API personales, autenticación de dos factores y realice un seguimiento y desconecte todas las sesiones activas. También puede incorporar algunas de las funciones de interfaz de usuario de Jetstream en su propio código, como banners Flash personalizados.

Para obtener más información sobre cómo funciona todo esto, consulte la [documentación de Laravel para Jetstream](https://jetstream.laravel.com/introduction.html), que es exhaustiva.
