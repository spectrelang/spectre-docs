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
          { text: 'Interfaces/Specifications', link: '/specifications' },
          { text: 'Generics', link: '/generics' },
          { text: 'Type-Argument Constraints', link: '/type-argument-constraints' },
          { text: 'Tagged Unions', link: '/tagged-unions' },
        ]
      },
      {
        text: 'DbC Concepts',
        items: [
          { text: 'Preconditions', link: '/preconditions' },
          { text: 'Postconditions', link: '/postconditions' },
          { text: 'Invariants', link: '/invariants' },
          { text: 'Assertions', link: '/assertions' },
          { text: 'Trust Propagation', link: '/trust-propagation' },
        ]
      },
      {
        text: 'Intrinsics',
        items: [
          { text: '@fmt', link: '/fmt' },
          { text: '@len', link: '/len' },
          { text: '@addr', link: '/addr' },
          { text: '@deref', link: '/deref' },
          { text: '@alloc', link: '/alloc' },
          { text: '@free', link: '/free' },
          { text: '@memcpy', link: '/memcpy' },
          { text: '@memset', link: '/memset' },
          { text: '@memmove', link: '/memmove' },
          { text: '@puts', link: '/puts' },
          { text: '@print', link: '/print' },
          { text: '@zeroed', link: '/zeroed' },
          { text: '@args', link: '/args' },
          { text: '@bitcast', link: '/bitcast' },
          { text: '@load', link: '/load' },
          { text: '@load8', link: '/load8' },
          { text: '@call', link: '/call' },
          { text: '@snprintf', link: '/snprintf' },
          { text: '@dprintf', link: '/dprintf' },
          { text: '@reserve', link: '/reserve' },
          { text: '@get', link: '/get' },
          { text: '@insert', link: '/insert' },
          { text: '@capacity', link: '/capacity' },
          { text: '@ptradd', link: '/ptradd' },
          { text: '@store', link: '/store' },
          { text: '@store8', link: '/store8' },
          { text: '@staticerror', link: '/staticerror' },
          { text: '@flush', link: '/flush' },
          { text: '@stdin', link: '/stdin' },
          { text: '@stdout', link: '/stdout' },
          { text: '@fgets', link: '/fgets' },
          { text: '@atoi', link: '/atoi' },
          { text: '@itoa', link: '/itoa' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/spectrelang/spectre' }
    ]
  }
})
