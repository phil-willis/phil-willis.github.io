---
title: 'PaaS'
excerpt: ''
coverImage: '/assets/covers/paas.jpg'
ogImage:
  url: '/assets/covers/paas.jpg'
---


# Heroku

## Overview of heroku
- Heroku is a Platform-as-a-Service (PaaS).
- All Heroku-based applications are hosted by Amazon Web Service (AWS), an Infrastructure as a Service (IaaS) provider and the base of our pyramid.
- Heroku is a great spot to test out ideas without worring about cost tha might occur when working with the big boys like AWS, Google, Azure.
- Focus on creation and it supports many languages: Clojure, Go, Java, Node, PHP, Python, Ruby and Scala. 
- Install the `Heroku CLI`
  ```shell
  $ brew install heroku/brew/heroku
  ```
- Login via the terminal
  ```shell
  $ heroku login
  ```

## Express app




## PostGIS
- 
```shell
$ echo 'show extwlist.extensions' | heroku pg:psql

# Connect to Postgres via terminal
$ heroku pg:psql
```
- postgis is available on the Dev or Basic Hobby tier plans with Postgres version 9.4 and above. 

`CREATE EXTENSION postgis;`
