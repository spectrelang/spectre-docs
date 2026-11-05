import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",

  title: "Spectre Docs",
  description: "Documentation for the Spectre Programming Language",
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/icon-transparent.png" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Specification", link: "/specification" },
    ],

    sidebar: [
      {
        text: "Meta",
        items: [
          { text: "Formal Specification", link: "/specification" },
          { text: "Installation", link: "/installation" },
          { text: "About", link: "/about" },
        ],
      },
      {
        text: "Fundamentals",
        items: [
          { text: "Variables", link: "/vars" },
          { text: "Types", link: "/types" },
          { text: "Functions", link: "/functions" },
          { text: "Control Flow", link: "/control-flow" },
          { text: "Pattern Matching", link: "/pattern-matching" },
          { text: "Modules and Imports", link: "/modules-and-imports" },
          { text: "Error Handling", link: "/error-handling" },
          { text: "Interfaces/Specifications", link: "/specifications" },
          { text: "Generics", link: "/generics" },
          {
            text: "Type-Argument Constraints",
            link: "/type-argument-constraints",
          },
          { text: "Tagged Unions", link: "/tagged-unions" },
        ],
      },
      {
        text: "DbC Concepts",
        items: [
          { text: "Preconditions", link: "/preconditions" },
          { text: "Postconditions", link: "/postconditions" },
          { text: "Invariants", link: "/invariants" },
          { text: "Assertions", link: "/assertions" },
          { text: "Trust Propagation", link: "/trust-propagation" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/spectrelang/spectre" },
    ],
  },
});
