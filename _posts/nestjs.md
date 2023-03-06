---
title: 'nestjs'
excerpt: ''
coverImage: '/assets/covers/_blank_.jpg'
ogImage:
  url: '/assets/covers/_blank_.jpg'
---

# Nest.js
- Not to be confused with `Next.js`
- Nestjs is a nodejs framework for building server-side applications
- nder the hood, Nest makes use of robust HTTP Server frameworks like Express (the default) and optionally can be configured to use Fastify as well!
- It is somewhat opinionated and forces us to follow its vision of how an application should look like to some extent. 



# Getting started
- Install and use the Nest CLI
    ```shell
    $ npm i -g @nestjs/cli
    $ nest new project-name
    ```
- Alternatively you can clone the starter repo
    ```shell
    $ git clone https://github.com/nestjs/typescript-starter.git project
    $ cd project
    $ npm install
    $ npm run start
    ```
- Being opinionated, you're gonna want to structure your routes with controller/service potentially models & stores

- Create the controller/service/module with the CLI
    ```shell
    $ nest generate controller quptes
    $ nest generate module quotes
    $ nest generate service quotes
    ```
- Create an entire route with one command
    ```shell
    $ nest generate resource quotes
    ```

