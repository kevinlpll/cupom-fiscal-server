const variables = {
  // AUTH
  AUTH_ALGORITHM: process.env.AUTH_ALGORITHM,
  AUTH_PRIVATE_KEY: process.env.AUTH_PRIVATE_KEY,
  AUTH_ACCESS_TOKEN_EXPIRATION: process.env.AUTH_ACCESS_TOKEN_EXPIRATION,
  AUTH_REFRESH_TOKEN_EXPIRATION: process.env.AUTH_REFRESH_TOKEN_EXPIRATION,
  AUTH_MASTER_PASSWORD: process.env.AUTH_MASTER_PASSWORD,
  
  DATABASE_NAME: process.env.DATABASE_NAME, // connection.js
  DATABASE_USERNAME: process.env.DATABASE_USERNAME, // connection.js
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD, // connection.js
  DATABASE_CUSTERNAME: process.env.DATABASE_CUSTERNAME, // conection.js

  NAME: process.env.NAME, // environment.js
  PORT: process.env.PORT, // environment.js

  QUERY_AUTHENTICATION: process.env.QUERY_AUTHENTICATION,

  TIMEOUT_TIME: process.env.TIMEOUT_TIME,
  EXPRESS_TIMEOUT: process.env.EXPRESS_TIMEOUT,
}

module.exports = process.env.NAME !== 'production' ? require('./_localVars') : variables