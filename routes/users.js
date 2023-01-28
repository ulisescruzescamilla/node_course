const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    id: 1,
    name: "Ulises",
    last_name: "Escamilla",
  })
});

module.exports = router;
