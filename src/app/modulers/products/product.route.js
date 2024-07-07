const express = require('express');
// const { insertIntoDb, getAllProduct, deleteProductIntoDb, updateProductIntoDb } = require('./product.controller');
const upload = require('../../middleware/multer');
const { getAllProduct, deleteProductIntoDb, updateProductIntoDb, insertIntoDb } = require('./product.controller');
const router = express.Router();

router.post('/create', upload.any(), insertIntoDb);
router.get('/list', getAllProduct);
router.delete('/:id', deleteProductIntoDb);
router.patch('/:id', updateProductIntoDb);

const productRoutes = {
    router
};

module.exports = productRoutes;