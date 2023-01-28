const express = require("express");
const router = express.Router();
const ProductService = require('./../services/product.service');
const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch(e) {
    res.status(404).json({
      message: e.message
    });
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const product = await service.create(body);

  res.status(201).json({
    message: 'created',
    data: product
  });
});

router.patch('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const body = req.body;

    const product = await service.update(id, body);

    res.json({
      message: 'updated',
      data: product
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }

});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const product = await service.delete(id);

  res.json({
    message: 'deleted',
    product
  });
});

module.exports = router;
