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
      { text: 'Comenzar', link: '/why-laravel/why-use-a-framework' },
      { text: 'ecanquiz', link: 'https://ecanquiz.github.io/' },     
    ],
        sidebar: [{ 
      text: '¿Por qué Laravel?',   // required
      path: '/why-laravel/',      // optional, link of the title, which should be an absolute path and must exist
      sidebarDepth: 1,    // optional, defaults to 1
      collapsible: true,
      collapsed: true,
      items: [
        { text: '¿Por qué utilizar un framework? ', link: '/why-laravel/why-use-a-framework' },
        { text: 'Una breve historia de los frameworks web y PHP', link: '/why-laravel/a-short-history-of-web-and-php-frameworks' },
        { text: '¿Qué tiene de especial Laravel?', link: '/why-laravel/what-s-so-special-about-laravel' },
        { text: 'Cómo Funciona', link: '/why-laravel/how-it-works' },
        { text: '¿Por qué Laravel?', link: '/why-laravel/why-laravel' }
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
          { text: 'MVC, Verbos HTTP y REST', link: '/routing-and-controllers/a-quick-Intro-to-mvc-the-http-verbs-and-rest' },
          { text: 'Definiciones de Ruta', link: '/routing-and-controllers/route-definitions' },
          { text: 'Controladores', link: '/routing-and-controllers/controllers' },
        ]
    }, {
        text: 'Artisan y Tinker',   // required
        path: '/artisan-and-tinker/',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'Artisan y Tinker', link: '/artisan-and-tinker/index' },
        ]
    },{      
      text: 'Pruebas',   // required
      path: '/',      // optional, link of the title, which should be an absolute path and must exist
      sidebarDepth: 1,    // optional, defaults to 1
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'Pruebas', link: '/testing/index' }
      ]
    } ,{      
        text: 'Escribir APIs',   // required
        path: '/',      // optional, link of the title, which should be an absolute path and must exist
        sidebarDepth: 1,    // optional, defaults to 1
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'Fundamentos de APIs JSON Tipo REST', link: '/writing-apis/the-basics-of-rest-like-json-apis' }
        ]}
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ecanquiz/laravel-up-running' }
    ]
  }
})



