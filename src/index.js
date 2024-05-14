const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

require('dotenv').config();

const productRouter = require('../api/routes/products');
const orderRouter = require('../api/routes/order');

app.use(morgan('dev'));

app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
