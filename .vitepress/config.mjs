import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  
  title: "Spectre Docs",
  description: "Documentation for the Spectre Programming Language",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Fundamentals',
        items: [
          { text: 'Variables', link: '/vars' },
          { text: 'Types', link: '/types' },
          { text: 'Functions', link: '/functions' },
          { text: 'Control Flow', link: '/control-flow' },
          { text: 'Modules and Imports', link: '/modules-and-imports' },
          { text: 'Error Handling', link: '/error-handling' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
