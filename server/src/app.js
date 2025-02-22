const express = require('express');
const env = require("dotenv");
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const path = require('path');

env.config();

const app = express();
const server = require('http').createServer(app);

app.use(
     cors({
       origin: true,
       credentials: true,
     })
);

// CONFIG SWAGGER
const optionSwagger = require('./config/swagger.config')
const swaggerSpec = swaggerJsdoc(optionSwagger);
app.use('/swagger/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

// CONFIG STATIC FILE
app.use(express.static(path.join(__dirname, "public")));

// INIT MIDDLEWARE
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
     express.urlencoded({
     extended: true,
     })
);

// INIT ROUTES
const router = require("./routes");
app.use("/", router);

// // INIT DB
// const redis = require("./db/redis.config");
// redis.initRedis();

// HANDLE ERROR ENDPOINT
app.use((error, req, res, next) => {
     const statusCode = error.status || 500;
   
     return res.status(statusCode).json({
       status: "error",
       code: statusCode,
       message: error.message || "Internal Server Error",
     });
});

module.exports = server;