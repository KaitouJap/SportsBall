# SportsBall

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

## License

MIT