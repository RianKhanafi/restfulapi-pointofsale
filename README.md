
# About the POINT OF SALE EXPRESS
> the `restfulapi-pointofsale` is an Application for Point os Sale APp

# How to use it
- clone or download this repository
- import database sql
  open your console and write 
  
$ npm start 

# Requirments
  - Node js v12.10.0
  - Npm package / Yarn package
  - Mysql Database

# Instalation
  Clone
  ```
  $ git clone  https://github.com/RianKhanafi/restfulapi-pointofsale.git
  $ cd restfulapi-pointofsale
  $ npm start
  ```

# features
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

# Route
- **Categories** 
  - **/categories** to get data category 
  - **/categories/:id**  to delete data category 
- **products** 
  - **/products**  to get data products as search paginate category 
  - **/products/paginate** to running pagination on products page
  - **/products/:id** to delete data products
  - **/products/reduce** to reduce products
  
# METHOD
 - **POST** post data
 - **GET** get data
 - **PUT** update data
  
  
