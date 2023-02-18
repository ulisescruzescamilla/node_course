const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

app.use(express.json()); // middleware cast request to JSON

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});
