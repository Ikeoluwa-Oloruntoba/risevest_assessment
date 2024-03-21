
# Rise Vest Assessment

## Description

This repository contains the code for a RESTful API built with NestJS, TypeScript, and PostgreSQL, as part of an assessment. The API includes endpoints for user authentication, user management, posting, and commenting functionalities. Additionally, it features database schema design, query optimization, and error handling mechanisms.

## Features

- **Authentication**: Token-based authentication mechanism for user login and logout.
- **User Management**: CRUD operations for user management, including creation, retrieval, updating, and deletion.
- **Posting**: Endpoints to create and retrieve posts for users.
- **Commenting**: Functionality to add comments to posts.
- **Performance Challenge**: Fetching top users with the most posts and their latest comments, efficiently.
- **Query Optimization**: Optimization of SQL queries related to the database schema.
- **Middleware & Error Handling**: Implementation of token-based authentication middleware, input data validation, and error handling for API routes.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **PostgreSQL**: A powerful, open-source relational database system.
- **TypeScript**: A strongly typed superset of JavaScript that compiles to plain JavaScript.
- **Swagger**: Integration for API documentation using Swagger UI.
- **Jest**: Testing framework for unit testing NestJS applications.

## Installation and Usage

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Ikeoluwa-Oloruntoba/risevest_assessment.git
   ```

2. Install dependencies:

   ```bash
   cd rise-blog-api
   npm install
   npx primsa migrte dev --name init
   docker-compose -up -d
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Define environment variables such as database connection details, JWT secret, etc.

4. Run the application:

   ```bash
   npm run start:dev
   ```

5. Access the API endpoints using a tool like Postman or curl.

## API Documentation

The API documentation can be accessed at `https://documenter.getpostman.com/view/11823852/2sA35A64kq` endpoint when the application is running locally. This provides detailed information about available endpoints, request and response formats, and authentication requirements.

## Testing

The application includes unit tests for services and controllers. To run the tests, use the following command:

```bash
npm test
```

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.
