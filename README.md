# Users Web List Application

This is a Users Web List application implemented in Node.js using the Express framework.
The application interacts with an external API, [reqres.in](https://reqres.in/), to manage user data.
The project follows a Controller - Service - Repository architecture and includes the implementation of various API endpoints, user authentication using JSON Web Tokens (JWT), and data storage in MongoDB.

## Endpoints

1. **Reading all USERS from a specific page**

   - Route: `GET /getUsers/{page}`
   - Retrieves a json of users from a specific page.

2. **Read specific USER**

   - Route: `GET /getUser/{id}`
   - Retrieves json of information about a specific user based on the provided ID.

3. **Create a new USER**

   - Route: `POST /createUser`
   - Creates a new user based on the json provided with two fields, name and job.
   - Retrieves json of information about the created user.

4. **Update USER**

   - Route: `PUT /updateUser/{id}`
   - Updates information about a specific user based on the provided ID and json with two fields, name and job.
   - Retrieves json of information about the updated user.

5. **Delete USER**

   - Route: `DELETE /deleteUser/{id}`
   - Deletes a specific user based on the provided ID.

6. **Register**

   - Route: `POST /register`
   - Registers to the application and saving a JWT in cookies.

7. **Delete USER**
   - Route: `POST /login`
   - Login to the application and saving a JWT in cookies.

## Architecture

The project follows a Controller - Service - Repository architecture:

- **Controller:** Handles incoming requests, processes them, and returns the appropriate response.
  Located in the `src/controllers` directory.

- **Service:** Contains business logic and interacts with the repository to perform operations.
  Located in the `src/services` directory.

- **Repository:** Manages data storage and retrieval. In this project, MongoDB is used as the data store, and data is also fetched from reqres.in.
  Repository is responsible for handling data operations.
  Located in the `src/repositories` directory.

## Authentication

- JWT (JSON Web Tokens) that is stored in cookies is used for authentication.

## Consumable Origins

The application allows consumption only from the following origins:

- https://localhost
- www.google.com
- https://www.facebook.com

## Data Storage

- User data retrieved from the external API is stored in MongoDB.
- The choice of using MongoDB provides flexibility in managing and querying user data.

## Getting Started

1. Clone this repository.

   ```bash
   git clone https://github.com/DavidKras95/UsersWebListApplication.git
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a .env file and configure the following variables

   ```env
   TOKEN_SECRET = URL to db recived from David
   TOKEN_SECRET = Secret recived from David
   ```

4. Install dependencies.
   ```bash
   npm run
   ```

Please https://reqres.in/ to see how the API should work.

```

```
