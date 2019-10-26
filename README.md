
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
  ```
## Setup .env
```
  SERVER_PORT = YOUR PORT
  DB_HOST= YOUR DATABASE HOST NAME
  DB_USER= YOUR DATABASE USERNAME
  DB_PASS= YOUR DATABASE PASSWORD
  DB_NAME= YOUR SECRET KEY
```
## Start Api
```
  $ npm start
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
  
## Method
 - **POST** post data
 - **GET** get data
 - **PUT** update data
  
  
