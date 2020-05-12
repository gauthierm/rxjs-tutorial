RxJs Tutorial
=============
Uses RxJs to make HTTP calls inside an React application using hooks.

Environment
-----------
Any stable version of Node JS.

Coding Standard
---------------
[ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) are used
for code.

Getting Started With the Express Backend (/api)
-----------------------------------------------
The application runs by default on `localhost:4000` and has the following
endpoints:

 - `http://localhost:4000/posts` - returns a JSON-encoded array of blog posts.
 - `http://localhost:4000/posts/:id` - returns a specific POST by id.

### Running the Express Application

```sh
cd api/
yarn install
yarn start
```

You can verify the API is working by visiting http://localhost:4000/posts in
your browser or another HTTP client.

Getting Started with the React Frontend (/web)
----------------------------------------------
The React frontend is a based on create-react-app.

### Running the React Application

```sh
cd web/
yarn install
yarn start
```
