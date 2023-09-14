# DHP Message service

## Local setup

- Create a `.env` file containing the following

  ```
  PORT = 5000
  NODE_ENV = development
  DB_USER = username
  DB_PASSWORD = password
  DB_DATABASE = database_name
  DB_HOST = localhost
  DB_DIALECTS = mysql
  TOKEN_KEY = token
  ```

## Migrations and seeders

- ```
  npm run migrate
  ```
- ```
  npm run seed
  ```
