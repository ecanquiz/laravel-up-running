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
      { text: 'Comenzar', link: '/why-laravel' },
      { text: 'ecanquiz', link: 'https://ecanquiz.github.io/' },     
    ],
    sidebar: [{      
      path: '/',      // optional, link of the title, which should be an absolute path and must exist        
      sidebarDepth: 1,    // optional, defaults to 1
      items: [
        { text: '¿Por qué Laravel?', link: '/why-laravel' },
        { text: 'Entorno de Desarrollo', link: '/set-up-laravel-dev-env' },
        { text: 'Estructura de Directorios de Laravel', link: '/laravel-s-directory-structure' },
        { text: 'Configuración', link: '/configuration' },
        { text: 'Artisan y Tinker', link: '/artisan-and-tinker' },
        { text: 'Pruebas', link: '/testing' },


      ]
    }],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ecanquiz/laravel-up-running' }
    ]
  }
})



