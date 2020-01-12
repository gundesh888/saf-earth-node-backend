const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api/index');

const app = express();
app.use(express.json())
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Connection is ready: API running in port 5000'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
