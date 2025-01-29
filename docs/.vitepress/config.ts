import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Laravel en funcionamiento',
  description: 'Un framework para crear aplicaciones PHP modernas',
  base: '/laravel-up-running/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/me.jpg',
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Comenzar', link: '/why-laravel/' },
      { text: 'ecanquiz', link: 'https://ecanquiz.github.io/' },     
    ],
    sidebar: [{      
        path: '/',      // optional, link of the title, which should be an absolute path and must exist        
        sidebarDepth: 1,    // optional, defaults to 1
        items: [
          { text: '¿Por qué Laravel?', link: '/why-laravel/' },
        ]
      }, { 
      text: 'Utilizar un Framework?',   // required
      path: '/why-laravel/',      // optional, link of the title, which should be an absolute path and must exist
      sidebarDepth: 1,    // optional, defaults to 1
      collapsible: true,
      collapsed: true,
      items: [
        { text: '¿Por Qué Utilizar un Framework? ', link: '/why-laravel/why-use-a-framework' },
        { text: 'Una Breve Historia de los Frameworks Web y PHP', link: '/why-laravel/a-short-history-of-web-and-php-frameworks' },
        { text: '¿Qué Tiene de Especial Laravel?', link: '/why-laravel/what-s-so-special-about-laravel' },
        { text: 'Cómo Funciona', link: '/why-laravel/how-it-works' },
        { text: '¿Por Qué Laravel?', link: '/why-laravel/why-laravel' }
      ]}, {
      text: 'Configurar Entorno de Desarrollo',   // required
      path: '/set-up-laravel-dev-env/',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Requisitos del Sistema', link: '/set-up-laravel-dev-env/system-requirements' },
        { text: 'Entornos de Desarrollo Local', link: '/set-up-laravel-dev-env/local-development-environments' },        
        { text: 'Creando un Nuevo Proyecto', link: '/set-up-laravel-dev-env/creating-a-new-laravel-project' },        
        { text: 'Estructura de Directorios', link: '/set-up-laravel-dev-env/laravel-s-directory-structure' },        
        { text: 'Configuración', link: '/set-up-laravel-dev-env/configuration' },
        { text: 'En Marcha y Pruebas', link: '/set-up-laravel-dev-env/up-running-and-testing' } 
      ]}, {
        text: 'Enrutamiento y Controladores',   // required
        path: '/routing-and-controllers/',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'MVC, Verbos HTTP y REST', link: '/routing-and-controllers/a-quick-intro-to-mvc-the-http-verbs-and-rest' },
          { text: 'Definiciones de Ruta', link: '/routing-and-controllers/route-definitions' },
          { text: 'Grupos de Ruta', link: '/routing-and-controllers/route-groups' },
          { text: 'Rutas Firmadas', link: '/routing-and-controllers/signed-routes' },
          { text: 'Vistas', link: '/routing-and-controllers/views' },
          { text: 'Controladores', link: '/routing-and-controllers/controllers' },
          { text: 'Vincular Modelo de Ruta', link: '/routing-and-controllers/route-model-binding' },
          { text: 'Caché de Rutas', link: '/routing-and-controllers/route-caching' },
          { text: 'Suplantación de Métodos de Formulario', link: '/routing-and-controllers/form-method-spoofing' },
          { text: 'Protección CSRF', link: '/routing-and-controllers/csrf-protection' },
          { text: 'Redirecciones', link: '/routing-and-controllers/redirects' },
          { text: 'Abortando la Solicitud', link: '/routing-and-controllers/aborting-the-request' },
          { text: 'Respuestas Personalizadas', link: '/routing-and-controllers/custom-responses' },
          { text: 'Prueba y Resumen', link: '/routing-and-controllers/testing-and-summary' },         
        ]
    }, {
      text: 'Plantillas Blade',   // required
      path: '/blade-templating/',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Haciendo Eco de Los Datos', link: '/blade-templating/echoing-data' },
        { text: 'Estructuras de Control', link: '/blade-templating/control-structures' },
        { text: 'Herencia de Plantilla', link: '/blade-templating/template-inheritance' },       
        { text: 'Compositores de Vistas e Inyección de Servicios', link: '/blade-templating/view-composers-and-service-injection' },
        { text: 'Directivas Blade Personalizadas', link: '/blade-templating/custom-blade-directives' },
        { text: 'Pruebas y Resumen', link: '/blade-templating/testing-and-summary' }
      ]}, {
      text: 'Bases de Datos y Eloquent',   // required
      path: '/databases-and-eloquent/',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Configuración', link: '/databases-and-eloquent/configuration' },
        { text: 'Migraciones', link: '/databases-and-eloquent/migrations' },
        { text: 'Inspeccionar su Base de Datos', link: '/databases-and-eloquent/inspecting-your-database' },
        { text: 'Siembras', link: '/databases-and-eloquent/seeding' },
        { text: 'Generador de Consultas', link: '/databases-and-eloquent/query-builder' },
        { text: 'Introducción a Eloquent', link: '/databases-and-eloquent/introduction-to-eloquent' },
        { text: 'Eventos Elocuentes', link: '/databases-and-eloquent/eloquent-events' },
        { text: 'Pruebas y Resumen', link: '/databases-and-eloquent/testing-and-summary' }
      ]
    }, {
      text: 'Componentes del Frontend',   // required
      path: '/frontend-components/',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Kits de Inicio de Laravel', link: '/frontend-components/laravel-starter-kits' },
        { text: 'Configuración de Laravel Vite', link: '/frontend-components/laravel-vite-configuration' }        
      ]
    }, {
      text: 'Recopilación y Manejo de Datos de Usuario',   // required
      path: '/collecting-and-handling-user-data/',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Validación', link: '/collecting-and-handling-user-data/validation' },
      ]
    }, {
      text: 'Artisan y Tinker',   // required
      path: '/artisan-and-tinker/',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Artisan y Tinker', link: '/artisan-and-tinker/an-introduction-to-artisan' },
      ]
    }, {
        text: 'Autenticación y Autorización de Usuarios',   // required
        path: '/user-authentication-and-authorization/',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'El Modelo de Usuario y la Migración', link: '/user-authentication-and-authorization/the-user-model-and-migration' },
        ]
    }, {      
      text: 'Solicitudes, Respuestas y Middleware',   // required
      path: '/requests-responses-and-middleware/',      // optional, link of the title, which should be an absolute path and must exist
      sidebarDepth: 1,    // optional, defaults to 1
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Ciclo de Vida de Solicitud en Laravel', link: '/requests-responses-and-middleware/laravel-s-request-lifecycle' }
      ]
    }, {      
      text: 'El Contenedor',   // required
      path: '/the-container/',      // optional, link of the title, which should be an absolute path and must exist
      sidebarDepth: 1,    // optional, defaults to 1
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Breve Intro a Inyección de Dependencia', link: '/the-container/a-quick-intro-to-dependency-injection' }
      ]
    }, {      
      text: 'Pruebas',   // required
      path: '/testing/',      // optional, link of the title, which should be an absolute path and must exist
      sidebarDepth: 1,    // optional, defaults to 1
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Pruebas', link: '/testing/index' }
      ]
    }, {      
        text: 'Escribir APIs',   // required
        path: '/writing-apis/',      // optional, link of the title, which should be an absolute path and must exist
        sidebarDepth: 1,    // optional, defaults to 1
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'Fundamentos de APIs JSON Tipo REST', link: '/writing-apis/the-basics-of-rest-like-json-apis' }
        ]
    }, {      
      text: 'Colas, Trabajos, Eventos, Radiodifusión y el Programador',   // required
      path: '/queues-jobs-events-broadcasting-and-the-scheduler/',      // optional, link of the title, which should be an absolute path and must exist
      sidebarDepth: 1,    // optional, defaults to 1
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Colas', link: '/queues-jobs-events-broadcasting-and-the-scheduler/queques' }
      ]
    }, {      
      text: 'Ayudantes y Colecciones',   // required
      path: '/helpers-and-collections/',      // optional, link of the title, which should be an absolute path and must exist
      sidebarDepth: 1,    // optional, defaults to 1
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Ayudantes', link: '/helpers-and-collections/helpers' }
      ]
    }],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ecanquiz/laravel-up-running' }
    ]
  }
})




