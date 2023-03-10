const express = require("express");
const router = express.Router();
const ProductService = require('./../services/product.service');
const validationHandler = require('../middlewares/validations.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema
} = require('../schemas/product.schema');
const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/:id',
  validationHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch(e) {
      next(e);
    }
  }
);

router.post('/',
  validationHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const product = await service.create(body);

    res.status(201).json({
      message: 'created',
      data: product
    });
  }
);

router.patch('/:id',
  validationHandler(getProductSchema, 'params'),
  validationHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const body = req.body;

    const product = await service.update(id, body);

    res.json({
      message: 'updated',
      data: product
    });
  } catch (error) {
    next(error);
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
