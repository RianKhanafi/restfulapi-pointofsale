
# About the POINT OF SALE EXPRESS
> the `restfulapi-pointofsale` is an Application for Point os Sale App

## Requirments
  - [Node js v12.10.0](https://nodejs.org/en/download/)
  - [Npm](https://www.npmjs.com/get-npm) / [Yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable) package
  - [Mysql](https://www.apachefriends.org/download.html) Database

## Instalation
  Clone
  ```
  $ git clone  https://github.com/RianKhanafi/restfulapi-pointofsale.git
  $ cd restfulapi-pointofsale
  $ npm start
  ```
## Setup .env
```
  SERVER_PORT = __YOUR PORT__ 
  DB_HOST= __YOUR DATABASE HOST NAME__
  DB_USER= __YOUR DATABASE USERNAME__
  DB_PASS= __YOUR DATABASE PASSWORD__
  DB_NAME= __YOUR SECRET KEY__
```

## features
- get all data products
- Cread products
- Read products
- Update products
- Delete products
- pagination
- Sort products by name, date and category
- search product by name
- Add/Reduce products
- Allow CORS
- login and register with jsonwebtoken(JWT)

## Route
- **Categories** 
  - **/categories** to get data category 
  - **/categories/:id**  to delete data category 
- **products** 
  - **/products**  to get data products as search paginate category 
  - **/products/paginate** to running pagination on products page
  - **/products/:id** to delete data products
  - **/products/reduce** to reduce products
  
## METHOD
 - **POST** post data
 - **GET** get data
 - **PUT** update data
  
  
