# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### UPDATED ENDPOINTS
- [GET] http://localhost:3000/product/all (index)
- [GET] http://localhost:3000/product/id/{id} (show)
- [GET] http://localhost:3000/product/category/{categoryName} (optional, products by category)
- [GET] http://localhost:3000/product/top/{quantity} (optional, most popular products)
- [GET] http://localhost:3000/product/top/byvolume/{quantity} (optional, most popular products by ordered units)
- [POST] http://localhost:3000/product (create, token required)
- [PUT] http://localhost:3000/product/id/{id} (update, token required)
- [DELETE] http://localhost:3000/product/id/{id} (delete, token required)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### UPDATED ENDPOINTS
- [GET] http://localhost:3000/user/all (index, token required)
- [GET] http://localhost:3000/user/id/{id} (show, token required)
- [POST] http://localhost:3000/user (create)
- [POST] http://localhost:3000/user/login (authenticate)
- [DELETE] http://localhost:3000/user/id/{id} (delete, token required)

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

#### UPDATED ENDPOINTS
- [GET] http://localhost:3000/order/userid/{user id}/all (index, all orders by user, token required)
- [GET] http://localhost:3000/order/userid/{user id}/active (active order by user, token required)
- [GET] http://localhost:3000/order/userid/{user id}/completed (completed orders by user, token required)
- [POST] http://localhost:3000/order/userid/{user id} (create, token required)
- [POST] http://localhost:3000/order/userid/{user id}/orderid/{order id}/productid/{product id}/qty/{quantity} (add product to order, token required)
- [PUT] http://localhost:3000/order/userid/{user id}/orderid/{order id} (update order status, token required)
- [DELETE] http://localhost:3000/order/userid/{user id}/orderid/{order id}/productid/{product id} (delete product from order, token required)
- [DELETE] http://localhost:3000/order/userid/{user id}/orderid/{order id} (delete order, token required)


## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

#### Orders_Products
- id
- order id
- product id
- product quantity

### DATABASE SCHEMA
- TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password text
)

- TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock integer,
    category VARCHAR(150) NOT NULL
)

- TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL
)

-TABLE orders_products (
    id SERIAL PRIMARY KEY,
    order_id bigint REFERENCES orders(id) ON DELETE CASCADE,
    product_id bigint REFERENCES products(id),
    quantity integer NOT NULL
)

