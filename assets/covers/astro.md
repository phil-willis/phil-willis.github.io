---
title: 'astro'
excerpt: ''
coverImage: '/assets/covers/_blank_.jpg'
ogImage:
  url: '/assets/covers/_blank_.jpg'
---

# Astro
- Astro is a meta-framework that lets you component from just about any frontend framework (React, Preact, Svelte, Vue, Solid, Vanilla)
- It also have a great implementation of partial hydration, which loads the javascript for components only when you need them.
- Astro leverages `Frontmatter` at the top of HTML file and instead of `.html` you use `.astro`
    ```html
    ---
    ---

    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <meta name="viewport" content="width=device-width" />
            <meta name="generator" content={Astro.generator} />
            <title>Astro</title>
        </head>
        <body>
            <h1>Astro</h1>
        </body>
    </html>
    ```
- The frontmatter is where you add data and/or variables that you can use in your templates
- 




# Getting started
- Install and use the Nest CLI
    ```shell
    $ yarn create astro
    $ npm init astro
    ```
- vscode extension, `astro-build.astro-vscode`


- Update the port via the [config file](https://docs.astro.build/en/reference/configuration-reference/#server-options)
    ```js
    import { defineConfig } from "astro/config";

    export default defineConfig({
    server: { port: 1234, host: true },
    });
    ```
 - update the ./src/pages/index.astro 
 ```html
    ---
    ---

    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <meta name="viewport" content="width=device-width" />
            <meta name="generator" content={Astro.generator} />
        <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css">
            <title>Astro</title>
        </head>
        <body>
        <div class="container">
        <h1>Astro</h1>
        <slot />
        </div>
        </body>
    </html>
    ```
- Create a layout template `src/layouts/Main.astro`
    ```html
    ---
    ---

    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <meta name="viewport" content="width=device-width" />
            <meta name="generator" content={Astro.generator} />
        <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css">
            <title>Astro</title>
        </head>
        <body>
        <div class="container">
        <h1>Astro</h1>
        <slot />
        </div>
        </body>
    </html>
    ```

