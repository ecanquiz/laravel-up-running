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

## Laravel Breeze

