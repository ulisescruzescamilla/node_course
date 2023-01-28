const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

app.use(express.json()); // middleware cast request to JSON

routerApi(app);

app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});
