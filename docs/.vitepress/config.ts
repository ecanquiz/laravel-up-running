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
        { text: 'Composer', link: '/set-up-laravel-dev-env/composer' },
        { text: 'Entornos de Desarrollo Local', link: '/set-up-laravel-dev-env/local-development-environments' },        
        { text: 'Creando un Nuevo Proyecto Laravel', link: '/set-up-laravel-dev-env/creating-a-new-laravel-project' },        
        { text: 'Estructura de Directorios de Laravel', link: '/set-up-laravel-dev-env/laravel-s-directory-structure' },        
        { text: 'Configuración', link: '/set-up-laravel-dev-env/configuration' },
        { text: 'En Marcha', link: '/set-up-laravel-dev-env/up-and-running' },
        { text: 'Pruebas', link: '/set-up-laravel-dev-env/testing' },
        { text: 'Resumen', link: '/set-up-laravel-dev-env/summary' }
      ]}, {
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
      ]}],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ecanquiz/laravel-up-running' }
    ]
  }
})



