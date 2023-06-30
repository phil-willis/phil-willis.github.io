---
title: 'graphql'
excerpt: ''
coverImage: '/assets/covers/graphql.jpg'
ogImage:
  url: '/assets/covers/graphql.jpg'
---


# What is GraphQL


## GraphQL data types
- GraphQL comes with a set of default scalar types out of the box:
  - `Int`: A signed 32‐bit integer.
  - `Float`: A signed double-precision floating-point value.
  - `String`: A UTF‐8 character sequence.
  - `Boolean`: true or false.
  - `ID`: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.















# Hello World for GraphQL client/server

## Setup JS server code
- Initialize an app
  ```shell
  $ npm init -y
  $ npm i --save-dev ts-node ts-node-dev typescript
  ```
- You clean this `tsconfig.json` file to something like this
  ```json
  {
    "compilerOptions": {
      "target": "es6",
      "module": "commonjs",
      "declaration": true,
      "sourceMap": true,
      "outDir": "dist",
      "rootDir": "./src",
      "strict": true,
      "esModuleInterop": true
    }
  }
  ```
- Create a ts file
  ```shell
  $ mkdir src
  $ echo "console.log('Hello typescript !')" > src/index.ts
  ```
- Update your `package.json` file
  ```json
  {
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "scripts": {
      "start": "node dist/index.js",
      "dev": "ts-node-dev --respawn -- src/index.ts",
      "build": "tsc"
    }
  }
  ```




## GraphQL
1. Type Def
  - Types: data types
  - Queries: read data
  - Mutations: update data
2. Resolver
  - Resolvers are the functions that 

## Express + apollo-server-express
- `apollo-server-express` is a middleware to your express application
- Start developing
  ```shell
  $ yarn run dev
  $ yarn add apollo-server-express express graphql
  ```
- Update `src/index.ts`
  ```ts
  import express, { Request, Response } from "express";
  import { ApolloServer } from "apollo-server-express";

  import typeDefs from "./schemas/type-defs";
  import resolvers from "./schemas/resolvers";

  const PORT = 3000;
  const app = express();

  // You can also do all REST API stuff with express!
  app.get("/", (req: Request, res: Response) => {
    res.send({ hello: "rest example too!!" });
  });

  const graphqlServer = new ApolloServer({ typeDefs, resolvers });
  graphqlServer.start().then((res) => {
    graphqlServer.applyMiddleware({ app });
    app.listen({ port: 3000 }, () => console.log(`Now browse to http://localhost:${PORT}${graphqlServer.graphqlPath}`));
  });
  ```

- Make some mock data with [mockaroo](https://www.mockaroo.com/) into `src/data/users.ts`. You could also make an example querying a database but will keep this example simple for now
  ```ts
  export type User = {
    id: string;
    name: string;
    email: string;
    age: number;
    gender: string;
    married: boolean;
  };

  export const users: User[] = [
    {
      id: "00001",
      name: "Max Powers",
      email: "max@compuglobalhypermeganet.com",
      age: 40,
      gender: "male",
      married: true,
    },
    // ...
  ];
  ```
- Create `src/schemas/type-defs.ts`
  - Here you will define your data types, queries, & mutations
  ```ts
  import { gql } from 'apollo-server-express'

  export default gql`
    type User {
      id: ID!
      name: String!
      email: String!
      age: Int!
      gender: String!
      married: Boolean!
    }

    # Queries
    type Query {
      getAllUsers: [User!]!
    }

    # Mutations
  `;
  ```

- Create `src/schemas/resolvers.ts`
  - Resolvers are the contract of what the Queries/Mutations in the type-def file 
  ```ts
  import {users} from "../data/users"

  export default {
    Query:{
      getAllUsers(){
        return users
      }
    }, 
    // Mutations:{}
  }
  ```
- Run the server and go to http://localhost:3000/graphql
  ```graphql
  query  {
    getAllUsers {
      id
      name
      age
      gender
      married
    }
  }
  ```
- Update `src/schemas/type-defs.ts` to add the mutation
  ```ts
  import { gql } from 'apollo-server-express'

  export default gql`
    type User {
      id: ID!
      name: String!
      email: String!
      age: Int!
      gender: String!
      married: Boolean!
    }

    # Queries
    type Query {
      getAllUsers: [User!]!
    }

    # Mutations
    type Mutation {
      createUser( 
        id: ID!
        name: String!
        email: String!
        age: Int!
        gender: String!
        married: Boolean!
      ): User!
    }
  `;
  ```
- Update `src/schemas/resolvers.ts`
  ```ts
  import {users, User} from "../data/users"

  export default {
    Query:{
      getAllUsers(){
        return users
      }
    }, 
    Mutation:{
      createUser(parent:any, args:User){
        const newUser = args
        users.push(newUser)
        return newUser
      }
    }
  }
  ```
- Now call a mutation to the graphql server
  ```graphql
  mutation  {
    createUser(
      id: "6", 
      name: "Heeel Wolrd", 
      email: "hell@off.com", 
      age: 44, 
      gender: "male", 
      married: true
    ) 
    {
      name
      gender
    }
  }
  ```


# Client
- Setup the clientside application. **Note:** *make sure you run the serverside code so the application can hit it!*
  ```shell
  $ npm init vite
  $ yarn add @apollo/client graphql react-hook-form
  $ mkdir src/graphql
  $ touch src/graphql/queries.ts src/graphql/mutations.ts
  $ mkdir src/components
  $ touch src/components/UsersList.tsx src/components/Form.tsx 
  ```
- Add to `src/graphql/queries.ts`
  ```ts
  import { gql } from "@apollo/client";

  export const LOAD_USERS = gql`
    query {
      getAllUsers {
        id
        name
        email
        age
        gender
        married
      }
    }
  `;
  ```
- Add to `src/graphql/mutations.ts`
  ```ts
  import { gql } from "@apollo/client";

  export const CREATE_USER_MUTATION = gql`
    mutation createUser(
      $id: ID! 
      $name: String!
      $email: String!
      $age: Int!
      $gender: String!
      $married: Boolean!
    ) {
      createUser(
        id: $id
        name: $name
        email: $email
        age: $age
        gender: $gender
        married: $married
      ) {
        id
        name
      }
    }
  `;
  ```
- Create a simple component to fetch data from GraphQL, `src/components/UsersList.tsx`
  ```ts
  import { useEffect, useState } from "react";
  import { useQuery } from "@apollo/client";

  import { User } from "../types/users"
  import { LOAD_USERS } from "../graphql/queries";

  import styles from './UsersList.module.css'

  export default function UsersList() {
    const { error, loading, data } = useQuery(LOAD_USERS);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      if (data) setUsers(data.getAllUsers);
    }, [data]);

    if (error) return <div>error loading users</div>
    if (loading) return <div>...loading</div>

    return (
      <div className={styles.wrapper}>
        <h1>Users</h1>
        {users.map((val: User) => {
          return <p key={val.id}> {val.name}</p>;
        })}
      </div>
    )
  }
  ```

- Create a simple form element to create a new user in GraphQL with a mutation, `src/components/Form.tsx`
  ```ts
  import { useForm } from 'react-hook-form';
  import { CREATE_USER_MUTATION } from "../graphql/mutations";
  import { useMutation } from "@apollo/client";

  import { User } from '../types/users'
  import styles from './Form.module.css'

  export default function Form() {
    const [createUser, { data, loading, error }] = useMutation(CREATE_USER_MUTATION);
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm<User>();

    const onSubmit = (formData: User) => {
      // Form Errors
      if (errors) console.log('[form errors]', errors)

      // Type cast
      formData.married = !!formData.married // make into boolean
      formData.age = Number(formData.age) // make into number
      
      // Post to the GraphQL server
      createUser({variables: {...formData}});

      // GraphQL Errors
      if (error) console.log(error);

      // Reset the form
      reset()
    }

    return <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <input placeholder="id" type="string" {...register('id', { required: true })}/>
          {errors.id && <p>id is required.</p>}
        </>
        <>
          <input placeholder="name" type="text" {...register('name', { required: true })}/>
          {errors.name && <p>name is required.</p>}
        </>
        <>
          <input placeholder="email" type="text" {...register('email', { required: true })}/>
          {errors.email && <p>email is required.</p>}
        </>
        <>
          <input type="number" {...register('age', { required: true })}/>
          {errors.age && <p>age is required.</p>}
        </>
        <select {...register('gender', { required: true })}>
          <option value="">--Gender--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p>gender is required.</p>}

        <select {...register('married', { required: true })}>
          <option value="">--Married-</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        {errors.married && <p>married is required.</p>}

        <input type="submit" />
      </form>

      {loading && <div>...loading</div>}
      <div></div>
    </div>
  }
  ```
- Now wire up GraphQL for you application, update the `src/App.tsx`
  ```ts
  import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
  } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";

  import UsersList from "./components/UsersList";
  import Form from "./components/Form";
  import './App.css'

  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`Graphql error ${message}`);
      });
    }
  });

  const link = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:3000/graphql" }),
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });

  export default function App() {
    return (
      <ApolloProvider client={client}>
        <UsersList />
        <Form />
      </ApolloProvider>
    )
  }
  ```

# AWS Lamdba



```shell
$ npm install -g serverless

$ yarn init -y
$ yarn add -D ts-node ts-node-dev typescript  
$ touch tsconfig.json  
$ mkdir src  
$ touch src/index.ts 
$ echo "console.log('Hello typescript, graphql, apollo, & Lambda!')" > src/index.ts
$ yarn add apollo-server-lambda graphql
```

- Set up the schema's type definitions and resolvers, and pass them to the ApolloServer constructor like normal.