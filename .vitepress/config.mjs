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
    ],

    sidebar: [
      {
        text: 'Meta',
        items: [
          { text: 'Installation', link: '/installation' },
          { text: 'About', link: '/about' }
        ]
      },
      {
        text: 'Fundamentals',
        items: [
          { text: 'Variables', link: '/vars' },
          { text: 'Types', link: '/types' },
          { text: 'Functions', link: '/functions' },
          { text: 'Control Flow', link: '/control-flow' },
          { text: 'Pattern Matching', link: '/pattern-matching' },
          { text: 'Modules and Imports', link: '/modules-and-imports' },
          { text: 'Error Handling', link: '/error-handling' },
        ]
      },
      {
        text: 'DbC Concepts',
        items: [
          { text: 'Preconditions', link: '/preconditions' },
          { text: 'Postconditions', link: '/postconditions' },
          { text: 'Invariants', link: '/invariants' },
          { text: 'Assertions', link: '/assertions' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/spectrelang/spectre' }
    ]
  }
})
