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
- Under the hood, Nest makes use of robust HTTP Server frameworks like Express (the default) and optionally can be configured to use Fastify as well!
- It is somewhat opinionated and forces us to follow its vision of how an application should look like to some extent. 
- Concepts like: Controllers, Providers, Modules, Middleware, Pipes, Guards keeps you in a structed code base which in the JS world might be a breath of fresh air.
- Check out the official docs [here](https://docs.nestjs.com/)
 


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
- You can also just update your package.json to have:
  ```json
  {
    "scripts":{
      "new": "nest generate resource"
    }
  }
  ```
- Being opinionated, you're gonna want to structure your routes with controller/service potentially models & stores
- Update the linting

1. Install some packages
    ```shell
    # Linting packages
    $ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier prettier @trivago/prettier-plugin-sort-imports

    $ mkdir .vscode
    $ touch .vscode/settings.json .prettierrc .eslintrc 
    ```  
2. Update the `.eslint.js` file
    ```js
    module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js']
    }
    ```
3. Add to the `./.prettierrc` file
  ```json
  {
    "semi": false,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 100,
    "importOrder": ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
    "importOrderSeparation": true
  }
  ```
4. Add to the `./.vscode/settings.json` file
  ```json
  {
    // Set prettier to be the default formatter
    "editor.defaultFormatter": "esbenp.prettier-vscode",

    // Don't format any files by default
    "editor.formatOnSave": false,
    
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },

    // JavaScript stuff
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    // TypeScript stuff if you need it
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    }
  }
  ```
5. Add dotenv for the custom port
  ```shell
  $ yarn add dotenv
  ```

  ```ts
  import { NestFactory } from '@nestjs/core'
  import * as dotenv from 'dotenv'

  import { AppModule } from './app.module'

  dotenv.config()

  const PORT = process.env.PORT || 3000

  async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  console.log(`⚡ The magic happens at: http://localhost:${PORT}`)
  await app.listen(PORT)
  }
  bootstrap()
  ```
6. Zip the dist folder with only the node_modules needed for the app
  - Install a zipper package
    ```shell
    $ yarn add lambda-zipper -D
    ```
  - Update the `package.json`
    ```json
    {
      "scripts": {
        "build": "nest build",
        "postbuild": "lambda-zipper build -f dist -o build/app.zip",
        "start": "node main",
        "format": "prettier --write \"src/*.ts\" \"src/**/*.ts\" \"test/**/*.ts\""
      }
    }
    ```
  - **NOTE:** make sure you update the `start` script to `"start": "node main"` so the build version of the app works


# Make your first route
- So the default app is very bare-bones, let's add a component based route
- Create an entire route resource with one command
  ```shell
  $ nest generate resource quotes
  $ yarn lint
  ```
- (or) Create the controller/service/module with the CLI
  ```shell
  $ nest generate controller quotes
  $ nest generate module quotes
  $ nest generate service quotes
  ```
- This will create a bunch of files
  ```shell
  src/quotes
  ├── dto
  │   ├── create-quote.dto.ts
  │   └── update-quote.dto.ts
  ├── entities
  │   └── quote.entity.ts
  ├── quotes.controller.spec.ts
  ├── quotes.controller.ts
  ├── quotes.module.ts
  ├── quotes.service.spec.ts
  └── quotes.service.ts
  ```
- NestJS provides a  `@Body()` decorator that gives us easy access to the body. 
- `dto` stands for Data Transfer Object and it defines the format of the data sent in a request.
- It can be either an interface or a class

- Controllers's sole responsibility is to deal with http request/response, as for the `service`'s responsibility is to deal with business logic. You could also take it a step further and create `models` or `store` to deal with querying the database however if you are using a ORM you could probably ignore the `store` for the DB is agnostic
- SOILD principles with the goal that makes our software easier to understand/maintain/read
  - **S**`ingle responsibilty` principle: a class/module should obly be responsible for a single function
  - **O**`pen-closed` principle: software entities should be open for extension but closed for modification.
  - **L**`iskov substitution` principle: changing one area of our system does not break other parts. 
  - **I**`nterface segregation` principle: emphasis on creating smaller and more specific interfaces. No client should be forced to depend on methods it does not use. By putting too many properties in our interfaces, we risk breaking the above rule.
  - **D**`ependency inversion` principle: high-level modules should not depend on the low-level modules. Instead, both of them should depend on abstractions.
<!-- https://wanago.io/2020/02/03/applying-solid-principles-to-your-typescript-code/ -->


## Validator 
- Leveraging your DTO to do validation by adding some class-decorators. Info [here](https://www.npmjs.com/package/class-validator)
- **note**: you want to add it as a devDependency to keep the build version of the application at a minimum
  ```shell
  $ yarn add -D class-validator class-transformer
  ```

  ```ts
  import { IsNotEmpty, Length } from 'class-validator'

  export class CreateQuoteDto {
    @IsNotEmpty()    // validator
    @Length(3)      // validator
    quote: string

    @Length(3, 30) // validator
    author: string
  }
  ```
- now in the POST code should look like this:
  ```ts
    @Post()
    @UsePipes(ValidationPipe)       // we can add pipes to validate the defined DTO
    create(@Body() createQuoteDto: CreateQuoteDto) {
      return this.quotesService.create(createQuoteDto)
    }
  ```
- Now if you try to do a POST in the client and the body doesn't validate Nestjs will send a `400`


## Controller
- Remember that the Controller's job is to deal with http request/response and use the service methods to do all the business logic
- Also notice that with Nestjs we can leverage decorators for defining HTTP verbs and accessing the POST/PUT bodies

  ```ts
  import {
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    Delete,
    UsePipes,
    ValidationPipe, // Added this package to deal with validation of the DTO
  } from '@nestjs/common'

  import { CreateQuoteDto } from './dto/create-quote.dto'
  import { UpdateQuoteDto } from './dto/update-quote.dto'
  import { QuotesService } from './quotes.service'

  @Controller('quotes')
  export class QuotesController {
    constructor(private readonly quotesService: QuotesService) {}

    @Post()
    @UsePipes(ValidationPipe) // Validate the Data Transfer Object
    create(@Body() createQuoteDto: CreateQuoteDto) {
      return this.quotesService.create(createQuoteDto)
    }

    @Get()
    findAll() {
      return this.quotesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.quotesService.findOne(+id)
    }

    @Put(':id')
    @UsePipes(ValidationPipe) // Validate the Data Transfer Object
    update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
      return this.quotesService.update(+id, updateQuoteDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.quotesService.remove(+id)
    }
  }

  ```

## The Service file
- The job of a service is to separate the business logic from controllers, making it cleaner and more comfortable to test. 
- He's the default service created by the Nestjs command, with some in-memory object storage
  ```ts
  import { Injectable } from '@nestjs/common'

  import { CreateQuoteDto } from './dto/create-quote.dto'
  import { UpdateQuoteDto } from './dto/update-quote.dto'

  @Injectable()
  export class QuotesService {
    private lastQuotetId = 0
    private quotes = {}

    create(createQuoteDto: CreateQuoteDto) {
      const id = ++this.lastQuotetId
      const newItem = { id, ...createQuoteDto }
      this.quotes[id] = newItem
      return { data: newItem }
    }

    findAll() {
      const data = Object.entries(this.quotes).map((item) => this.quotes[item[0]])
      return { data }
    }

    findOne(id: number) {
      const item = this.quotes[id]
      return { data: item }
    }

    update(id: number, updateQuoteDto: UpdateQuoteDto) {
      this.quotes[id] = updateQuoteDto
      return { data: this.quotes[id] }
    }

    remove(id: number) {
      const deletedItem = this.quotes[id]
      delete this.quotes[id]
      return {
        message: 'Deleted',
        data: deletedItem,
      }
    }
  }
  ```

## Modules
- We use modules to organize our application, so this complete route will be packaged in a module:
  ```ts
  import { Module } from '@nestjs/common'

  import { QuotesController } from './quotes.controller'
  import { QuotesService } from './quotes.service'

  @Module({
    controllers: [QuotesController],
    providers: [QuotesService],
  })
  export class QuotesModule {}
  ```
- And the module will be added to the **root module***, `./src/app.module.ts`
  ```ts
  import { Module } from '@nestjs/common'

  import { QuotesModule } from './quotes/quotes.module'

  @Module({
    imports: [QuotesModule],
    controllers: [],
    providers: [],
  })
  export class AppModule {}
  ```


# Using `ConfigService` to deal with environment variables
- Docs [here](https://docs.nestjs.com/techniques/configuration)
- In Node.js applications, it's common to use .env files, holding key-value pairs where each key represents a particular value, to represent each environment. Running an app in different environments is then just a matter of swapping in the correct .env file.
- A good approach for using this technique in Nest is to create a `ConfigModule` that exposes a `ConfigService` which loads the appropriate .env file. While you may choose to write such a module yourself, for convenience Nest provides the `@nestjs/config` package out-of-the box. 
- The `@nestjs/config` package internally uses `dotenv`. 

  ```shell
  $ yarn add @nestjs/config
  ```
- `app.module.ts`
  ```ts
  import { Module } from '@nestjs/common';
  import { ConfigModule } from '@nestjs/config';

  @Module({
    imports: [ConfigModule.forRoot()],
  })
  export class AppModule {}
  ```
- You can specify which `.env` file to use in the `app.module.ts`
  ```ts
  import { Module } from '@nestjs/common'
  import { ConfigModule } from '@nestjs/config'

  import { QuotesModule } from './quotes/quotes.module'

  const EnvModule = ConfigModule.forRoot({
    envFilePath: ['.env.development', '.env'],
  })

  @Module({
    imports: [EnvModule, QuotesModule], // The order matters
    controllers: [],
    providers: [],
  })
  export class AppModule {}

  ```



# Add Swagger
- `OpenAPI` & `Swagger`, we can create a user interface that serves as interactive API documentation for our project. 
- The `OpenAPI` is a specification used to describe our API and gives us a way to provide the details of our endpoints.
- `Swagger` is a set of tools built around the `OpenAPI` specification. It allows us to render the OpenAPI specification we wrote in as the API documentation. The thing that makes it so valuable is that it is interactive. 
- Install some packages:
  ```shell
  $ yarn add @nestjs/swagger swagger-ui-express
  ```
- Create a `./src/utils/swagger.ts` file 
  ```ts
  import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

  export default function SetupSwagger(app) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('API with NestJS')
      .setDescription('API developed throughout the API with NestJS course')
      .setVersion('1.0')
      .build()

    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('docs', app, document)
  }
  ```
- Update your `./src/main.ts` file to include your Swagger addition
```ts
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import SetupSwagger from './utils/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  // Swagger
  SetupSwagger(app) // This line here to add swagger

  const PORT = configService.get('PORT') ?? 3000
  console.log(`⚡ The magic happens at: http://localhost:${PORT}`)
  await app.listen(PORT)
}
bootstrap()
```
- Unfortunately, the specification we’ve defined so far does not contain much detail. So update the `./nest-cli.json` so that the schema can show up in the Swagger doc, update the `compilerOptions.plugins` to include nestjs swagger
  ```json
  {
    "compilerOptions": {
      "plugins": ["@nestjs/swagger"]
    }
  }
  ```
- "@nestjs/swagger" leverage your DTO objects that you create
- You can also group your calls my using the `import { ApiTags } from '@nestjs/swagger';` in your controllers:
  ```ts
  import {
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common'
  import { ApiTags } from '@nestjs/swagger'  // Import this

  import { CreateQuoteDto } from './dto/create-quote.dto'
  import { UpdateQuoteDto } from './dto/update-quote.dto'
  import { QuotesService } from './quotes.service'

  @Controller('quotes')
  @ApiTags('Quotes')  // Add this 
  export class QuotesController {
    // ...
  }
  ```
- You can also describe your endpoints with more details. We can use decorators such as `@ApiParam()` and `@ApiResponse()` to provide more details about our endpoints.
  ```ts
  @Controller('quotes')
  @ApiTags('Quotes')
  export class QuotesController {
    constructor(private readonly quotesService: QuotesService) {}

    @Get(':id')
    @ApiParam({
      name: 'id',
      required: true,
      description: 'Should be an id of a quote that exists in the database',
      type: Number,
    })
    findOne(@Param('id') id: string) {
      return this.quotesService.findOne(+id)
    }
  }
  ```

# Add a database with Prisma
- With Prisma, we describe our data using a Prisma schema file. It uses its own data modeling language and acts as a single source of truth. This differs from traditional ORMs that provide an object-oriented way of working with the database.
- Every time we make changes to the schema file, we need to generate the Prisma client. In this process, Prisma parses our schema and creates a client along with all the TypeScript typings. This means that we no don't map SQL tables to model classes through the TypeScript code manually.
- Let's use Docker to deal with the database
  ```yml
  version: "3"
  services:
    postgres:
      container_name: nestjs-postgres
      image: postgres:latest
      ports:
        - "5432:5432"
      volumes:
        - ./volumes/postgres:/data/postgres
      env_file:
        - docker.env
      networks:
        - postgres

    pgadmin:
      links:
        - postgres:postgres
      container_name: nestjs-pgadmin
      image: dpage/pgadmin4
      ports:
        - "8080:80"
      volumes:
        - ./volumes/pgadmin:/root/.pgadmin
      env_file:
        - docker.env
      networks:
        - postgres

  networks:
    postgres:
      driver: bridge
  ```
- Create a `docker.env` file to deal with the postgres configs
  ```shell
  POSTGRES_USER=admin
  POSTGRES_PASSWORD=admin
  POSTGRES_DB=nestjs
  PGADMIN_DEFAULT_EMAIL=admin@admin.com
  PGADMIN_DEFAULT_PASSWORD=admin
  ```
- Install prisma
  ```shell
  $ yarn add prisma @prisma/client
  $ npx prisma init
  ```
- Prisma will create a `./prisma/schema.prisma` & add the database url to the `.env` file.
- Update the `.env` to use the database url we're gonna use with docker-compose postgres service
  ```shell
  DATABASE_URL="postgresql://admin:admin@localhost:5432/nestjs?schema=public"
  ```
- If the provider is not postgres update the `./prisma/schema.prisma` file with it
  ```js
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  
  generator client {
    provider = "prisma-client-js"
  }
  ```
- If you are using vscode, this might also be a good opportunity to install the `Prisma VS Code Extension`, extension id: `Prisma.prisma`
- Start the local database
  ```shell
  $ docker-compose up
  ```
- Create a Prisma Client `./src/utils/prisma/`

- Create `./src/utils/prisma/prisma.service.ts`
  ```ts
  import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
  import { PrismaClient } from '@prisma/client'

  @Injectable()
  export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
      await this.$connect()
    }

    async onModuleDestroy() {
      await this.$disconnect()
    }
  }
  ```
- Create `./src/utils/prisma/prisma.module.ts`
  ```ts
  import { Module } from '@nestjs/common'

  import { PrismaService } from './prisma.service'

  @Module({
    imports: [],
    controllers: [],
    providers: [PrismaService],
    exports: [PrismaService],
  })
  export class PrismaModule {}

  ```
- When we want to modify the structure of our database, we should create a migration. It consists of a SQL script that is supposed to make the necessary changes. Although we could write it by hand, Prisma can do it for us with the Prisma Migrate tool.
- Let's create a `./prisma/base.prisma` file to store the provider and datasource db  
  ```html
  // This is your Prisma schema file,
  // learn more about it in the docs: https://pris.ly/d/prisma-schema

  generator client {
    provider = "prisma-client-js"
  }

  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  ```
- Now, let’s define a simple Quote model in our schema that we can store in our `./src/quotes` path. Create `./src/quotes/schema.prisma`. (Note: make sure you define the model with lowercase characters, PG doesn't like uppercase for table names)
  ```html
  model quote {
    id        Int      @default(autoincrement()) @id
    quote     String
    author    String
  }
  ```
- We can use the [prisma data types](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#model-field-scalar-types) eventhough we've only used Int and String
- In our Quote model, we also use the @id attribute. Thanks to that, our id field becomes the primary key.
- Now we can update our `package.json` to contatenate all the primas schemas and update the `./prisma/schema.prisma` file with them all:
  ```json
  {
    "scripts": {
      "docker:db:up": "docker-compose up",
      "docker:db:down": "docker-compose down",
      "preprisma:snapshot": "cat prisma/base.prisma > prisma/schema.prisma && cat src/*/*.prisma >> prisma/schema.prisma",
      "prisma:snapshot": "npx prisma migrate dev --name migrate --preview-feature",
      "preprisma:push": "cat prisma/base.prisma > prisma/schema.prisma && cat src/*/*.prisma >> prisma/schema.prisma",
      "prisma:push": "prisma db push",
    },
  }
  ```
- Create your first migration
  ```shell
  $ yarn prisma:snapshot
  ```
- Update the database to have the new schema
  ```shell
  $ yarn prisma:push
  ```
- We can now go to PGAdmin to see our database, got to http://localhost:8080
  ![pgadmin-docker](/assets/blog/nestjs/pgadmin-docker.jpg)
  - Login with:
    ```json
    {
      name: container-postgresdb,
      host: host.docker.internal,
      database: postgres,
      user: postgres,
      password: admin
    }
    ```


# Logging
- NestJS is equipped with a logger ready to use out of the box.
- Default logging
- There are a few to choose from, sorted by <SEVERITY_TYPE>:
  - error
  - warn
  - log
  - verbose
  - debug

- Add a logger property to your service/controller e.g. `private readonly logger = new Logger(QuotesService.name)`
- Use the logger with this.logger.<SEVERITY_TYPE>('whatever message')
```ts
@Injectable()
export class QuotesService {
  private readonly logger = new Logger(QuotesService.name)

  async findOne(id: number) {
    this.logger.log('quote not found')
    this.logger.warn('[findOne]', ' not found')
  }
}
```

# Authentication
- You should really leverage (Passport)[https://www.passportjs.org/] & [bcrypt](https://www.npmjs.com/package/bcrypt)
- [NestJS documentation](https://docs.nestjs.com/techniques/authentication) suggests using the Passport library and provides us with the means to do so. Passport gives us an abstraction over the authentication, thus relieving us from some heavy lifting. Also, it is heavily tested in production by many developers.
- `Guard` is responsible for determining whether the route handler handles the request or not. We're going to use Passport Guards in our controller
- [implementing-passport-jwt](https://docs.nestjs.com/security/authentication#implementing-passport-jwt)


## Handling passwords
- We never want to store passwords in plain-text in the databse, we want to hash them with a one directional. 
- Hashing algorithm transforms one string into another string. 
- We can also use `salt` to prevent hashes with the same values to look the same, think about if multiple users have the same password they would look the same
- [bcrypt](https://www.npmjs.com/package/bcrypt) is a great hashing algorithm that takes care of hashing the strings, comparing plain strings with hashes, and appending salt. It also prevent against bruteforce because it limits the amount to attempt to compare strings
- **NOTE:** An important thing that we return the same error, whether the email or password is wrong. Doing so prevents some attacks that would aim to get a list of emails registered in our database.
- Note that both techniques achieve the same end-result.
  ```js
  // Technique 1 (generate a salt and hash on separate function calls):
  bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
          // Store hash in your password DB.
      });
  });

  // Technique 2 (auto-gen a salt and hash):
  bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
      // Store hash in your password DB.
  });
  ```











