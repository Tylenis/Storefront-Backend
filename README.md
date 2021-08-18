# Storefront Backend

Storefront Backend is a simple JavaScript API which allows to create user accounts, products and orders. Made as a project for the Udacity Full Stack JavaScript Developer Nanodegree Program.

## Prerequisites

This project uses [PostgreSQL](https://www.postgresql.org/) database.

## Installation

1. Use the node package manager [npm](https://nodejs.org/en/) to install project.

```
npm install
```
2. In a terminal, create and run the database:
* Start psql

Linux users:

```bash
sudo -i -u postgres
```
```bash
psql
```

Windows users:

```bash
psql postgres postgres
```
* Create user and test user

```bash
CREATE USER full_stack_user WITH PASSWORD 'psw123';
```

```bash
CREATE USER full_stack_user_test WITH PASSWORD 'test123';
```

* Create database and test database

```bash
CREATE DATABASE storefront_db;
```

```bash
CREATE DATABASE storefront_db_test;
```


* Grant user privileges

```bash
GRANT ALL PRIVILEGES ON DATABASE storefront_db TO full_stack_user;
```

```bash
GRANT ALL PRIVILEGES ON DATABASE storefront_db_test TO full_stack_user_test;
```

3. Create .env file in the project root directory. This file must contain variables: 
* POSTGRES_HOST = 127.0.0.1
* SERVER_PORT = 3000
* POSTGRES_DB = storefront_db
* POSTGRES_USER = full_stack_user
* POSTGRES_PSW = psw123
* POSTGRES_TEST_DB = storefront_db_test
* POSTGRES_TEST_USER = full_stack_user_test
* POSTGRES_TEST_PSW = test123
* ENV = dev
* BCRYPT_PSW = longandveryhardtoquesstring
* SALT_ROUNDS = 10
* TOKEN_SECRET = somestring

**Note.** The idea of .env file is to keep variables secret. You can use these values to run project as demo. Keep in mind PSQL database by default runs on port 5432, when setting server port.

4. Create database tables with db-migrate:

```bash
db-migrate  up
```

5. Start server:

```bash
npm run start
```

## Tests

Linux users, run:

```
npm run test
```

Windows users, run:

```
npm run testW
```

## Endpoints

### User

* **Get all users** (index)

```
[GET] http://localhost:3000/user/all
```

Endpoint expect request with Authorization header and JSON Web Token:

```
Authorization: Bearer yourjsonwebtoken
```

Endpoint responds with JSON:

```
[
    {
        "id": number,
        "firstname": string,
        "lastname": string,
        "username": string,
        "password": string
    }
]

```

----

* **Get user** (show)

```
[GET] http://localhost:3000/user/id/{id}
```

Endpoint expect request with Authorization header and JSON Web Token:

```
Authorization: Bearer yourjsonwebtoken
```

Endpoint responds with JSON:

```
{
    "id": number,
    "firstname": string,
    "lastname": string,
    "username": string,
    "password": string
}

```

----


* **Create user**
```
[POST] http://localhost:3000/user
```
Endpoint expect body data in JSON. Data structure:
```
{
    "firstname": string,
    "lastname": string,
    "username": string,
    "password": string
}
```

Endpoint responds with JSON Web Token.

----

* **Login**

```
[POST] http://localhost:3000/user/login
```

Endpoint expect body data in JSON. Data structure:
```
{
    "username": string,
    "password": string
}
```

Endpoint responds with JSON Web Token.

----

* **Delete user**

```
[DELETE] http://localhost:3000/user/id/{id}
```

Endpoint expect request with Authorization header and JSON Web Token:

```
Authorization: Bearer yourjsonwebtoken
```

Endpoint responds JSON:

```
{
    "success": boolean,
    "msg": string
}

```

----

### Product

* **Get all products**

```
[GET] http://localhost:3000/product/all
```

Endpoint responds with JSON:

```
[
    {
        "id": number,
        "name": string,
        "price": number,
        "stock": number,
        "category": string
    }
]

```

----

* **Get product**

```
[GET] http://localhost:3000/product/id/{id}
```

Endpoint responds with JSON:

```
{
    "id": number,
    "name": string,
    "price": number,
    "stock": number,
    "category": string
}

```

----

* **Get products by category**

```
[GET] http://localhost:3000/product/category/{categoryName}
```

Endpoint responds with JSON:

```
[
    {
        "id": number,
        "name": string,
        "price": number,
        "stock": number,
        "category": string
    }
]

```

----

* **Get most  popular products**

```
[GET] http://localhost:3000/product/top/{quantity}
```

Endpoint responds with JSON:

```
[
    {
        "id": number,
        "name": string,
        "category": string,
        "times_sold": number
    }
]

```

----

* **Get most  popular products by ordered units**

```
[GET] http://localhost:3000/product/top/byvolume/{quantity}
```

Endpoint responds with JSON:

```
[
    {
        "id": number,
        "name": string,
        "category": string,
        "volume": number
    }
]

```

----

* **Create product**

```
[POST] http://localhost:3000/product
```

Endpoint expect body data in JSON. Data structure:

```
{
    "name": string,
    "price": number,
    "stock": number,
    "category": string
}
```

Request must have Authorization header with JSON Web Token:

```
Authorization: Bearer yourjsonwebtoken
```

Endpoint responds with JSON:

```
{
    "id": number,
    "name": string,
    "price": number,
    "stock": number,
    "category": string
}

```

----

* **Edit product**

```
[PUT] http://localhost:3000/product/id/{id}
```

Endpoint expect body data in JSON. Data structure:

```
{
    "name": string,
    "price": number,
    "stock": number,
    "category": string
}
```

Request must have Authorization header with JSON Web Token:

```
Authorization: Bearer yourjsonwebtoken
```

Endpoint responds with JSON:

```
{
    "id": number,
    "name": string,
    "price": number,
    "stock": number,
    "category": string
}

```

----

* **Delete product**

```
[DELETE] http://localhost:3000/product/id/{id}
```

Endpoint expect request with Authorization header and JSON Web Token:

```
Authorization: Bearer yourjsonwebtoken
```

Endpoint responds with JSON:

```
{
    "success": boolean,
    "msg": string
}

```

----

### Order

* **Get all orders by user**

```
[GET] http://localhost:3000/order/userid/{user id}/all
```

Endpoint expect request with Authorization header and JSON Web Token:

```
Authorization: Bearer yourjsonwebtoken
```

Endpoint responds with JSON:

```
[
    {
        "id": number,
        "userId": number,
        "status": string,
        "products": [
            {
                "id": number,
                "name": string,
                "price": number,
                "quantity": number,
                "category": string
            }
        ]
    }
]
```

----

* **Get active order by user**

```
[GET] http://localhost:3000/order/userid/{user id}/active
```

Endpoint expect request with Authorization header and JSON Web Token:

```
Authorization: Bearer yourjsonwebtoken
```

Endpoint responds with JSON:

```
[
    {
        "id": number,
        "userId": number,
        "status": string,
        "products": [
            {
                "id": number,
                "name": string,
                "price": number,
                "quantity": number,
                "category": string
            }
        ]
    }
]
```

----

* **Get completed orders by user**

```
[GET] http://localhost:3000/order/userid/{user id}/completed
```

Endpoint expect request with Authorization header and JSON Web Token:

```
Authorization: Bearer yourjsonwebtoken
```

Endpoint responds with JSON:

```
[
    {
        "id": number,
        "userId": number,
        "status": string,
        "products": [
            {
                "id": number,
                "name": string,
                "price": number,
                "quantity": number,
                "category": string
            }
        ]
    }
]
```

----

* **Create order**

```
[POST] http://localhost:3000/order/userid/{user id}
```

Endpoint expect body data in JSON. Data structure:

```
{
    "userId": number,
    "status": string
}
```

Request must have Authorization header with JSON Web Token:

```
Authorization: Bearer yourjsonwebtoken
```

Endpoint responds with JSON:

```
{
    "id": number
    "userId": number,
    "status": string
}

```

----

* **Add product to order**

```
[POST] http://localhost:3000/order/userid/{user id}/orderid/{order id}/productid/{product id}/qty/{quantity}
```

Endpoint expect request with Authorization header and JSON Web Token:

```
Authorization: Bearer yourjsonwebtoken
```

Endpoint responds with JSON:

```
{
    "id": number,
    "orderId": number,
    "productId": number,
    "quantity": number
}
```

----

* **Change order status**

```
[PUT] http://localhost:3000/order/userid/{user id}/orderid/{order id}
```

Endpoint expect body data in JSON. Data structure:

```
{
    "status": string
}
```

Request must have Authorization header with JSON Web Token:

```
Authorization: Bearer yourjsonwebtoken
```

Endpoint responds with JSON:

```
{
    "id": number,
    "userId": number,
    "status": string
}
```

----

* **Remove product from order**

```
[DELETE] http://localhost:3000/order/userid/{user id}/orderid/{order id}/productid/{product id}
```

Endpoint expect request with Authorization header and JSON Web Token:

```
Authorization: Bearer yourjsonwebtoken
```

Endpoint responds with JSON:

```
{
    "success": boolean,
    "msg": string,
}
```

----

* **Delete order**

```
[DELETE] http://localhost:3000/order/userid/{user id}/orderid/{order id}
```

Endpoint expect request with Authorization header and JSON Web Token:

```
Authorization: Bearer yourjsonwebtoken
```

Endpoint responds with JSON:

```
{
    "success": boolean,
    "msg": string,
}
```