This project is a Node.js application that uses Express.js for routing and Mongoose for interacting with a MongoDB database. Below are the details for the routes and models directories.

All Routes  
The routes directory contains the route definitions for the application. Each file in this directory corresponds to a specific set of routes for different entities in the application.


Admin Routes

admin.routes.js
POST /admins/register: Registers a new admin.
POST /admins/login: Logs in an admin.

categoryRoutes

category.routes.js
POST /category/add: Adds a new category (Admin only).
GET /category/list: Lists all categories.
PUT /category/update/:id: Updates a category by ID (Admin only).
DELETE /category/delete/:id: Deletes a category by ID (Admin only).

orderRoutes

order.routes.js
POST /orders/place: Places a new order (Authenticated users only).
GET /orders/: Gets orders for the authenticated user.

productRoutes

products.rourtes.js
POST /products/add: Adds a new product (Admin only).
GET /products/list: Lists all products.
PUT /products/update/:id: Updates a product by ID (Admin only).
DELETE /products/delete/:id: Deletes a product by ID (Admin only).
GET /products/:id: Gets a product by ID.

userRoutes

user.routes.js
POST /users/register: Registers a new user.
POST /users/login: Logs in a user.


Models of project

The models directory contains the Mongoose schemas and models for the application. Each file in this directory corresponds to a specific entity in the application.


admin.model.js
Defines the schema for the Admin entity, including fields for fullname, email, and phone. It also includes methods for generating authentication tokens.
{
    fullname: {
        firstname: String,
        lastname: String
    },
    email: String,
    phone: String
}
one AdminSecreteKey for Register And Login

category.model.js
Defines the schema for the Category entity, including fields for name and description.

{
    name: String,
    description: String
}

order.model.js
Defines the schema for the Order entity, including fields for user, products, totalAmount, orderStatus, and createdAt.

{
    user: String,
    products: Array,
    totalAmount: Number,
    orderStatus: String,
    createdAt: Date
}

product.model.js
Defines the schema for the Product entity, including fields for name, description, price, category, stock, and createdAt.

{
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    createdAt: Date
}

user.model.js
Defines the schema for the User entity, including fields for fullname, email, password, address, and phone. It also includes methods for generating authentication tokens and comparing passwords.

{
    fullname: {
        firstname: String,
        lastname: String
    },
    email: String,
    password: String,
    address: String,
    phone: String
}

Environment Variables
The application uses the following environment variables, defined in the .env file:

PORT: The port on which the server runs.
JWT_SECRET: The secret key for JWT authentication.
DB_CONNECT: The MongoDB connection string.
ADMIN_SECRET_KEY: The secret key for admin registration.


Setup

Clone the repository.
Install dependencies using npm install.
Create a .env file with the required environment variables.
Start the server using node server.js.
Dependencies
bcrypt: For hashing passwords.
cookie-parser: For parsing cookies.
cors: For enabling Cross-Origin Resource Sharing.
dotenv: For loading environment variables.
express: For building the server.
express-validator: For validating request data.
jsonwebtoken: For generating and verifying JWT tokens.
mongoose: For interacting with MongoDB.