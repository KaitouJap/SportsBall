<p align="center">A backend service for managing sports events and teams</p></p>
<p align="center">
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
    <a href="LICENSE" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License" /></a>
</p>

## Table of Contents

- [Installation](#installation)
- [Swagger API Documentation](#swagger-api-documentation)
  - [Accessing Swagger UI](#accessing-swagger-ui)
- [License](#license)

## Installation

1. Edit .env.example:
    Change .env.example to .env and edit its content to match your chosen database manager's url

2. Clone the repository:
    ```sh
    git clone https://github.com/KaitouJap/SportsBall.git
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Push the Prisma schema to the database:
    ```sh
    npx prisma db push
    ```

5. Seed the database:
    ```sh
    npx prisma db seed
    ```

6. Start the development server:
    ```sh
    npm run start:dev
    ```

## Swagger API Documentation

The SportsBall API uses Swagger for API documentation. Once the development server is running, you can access the Swagger UI to explore and test the API endpoints.

### Accessing Swagger UI

1. Start the development server:
    ```sh
    npm run start:dev
    ```

2. Open your web browser and navigate to:
    ```
    http://localhost:3000/api
    ```


## License

MIT