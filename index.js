const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const app = express();
const port = 3000;

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

app.use(express.json()); // middleware cast request to JSON
const whitelist = ['http://localhost'];
const options = (req, callback) => {
  let corsOptions = {origin: false};
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {origin: true};
  }
  return callback(null, corsOptions)
}
app.use(cors(options));
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});
