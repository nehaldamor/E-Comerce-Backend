const express = require('express');
const router = express.Router();
const authMiddleware=require("../middlewares/auth.middlewares")
const productController=require("../controllers/product.controller")
const { body, param } = require('express-validator');
router.post('/add',authMiddleware.authAdmin,[
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('stock').optional().isNumeric().withMessage('Stock must be a number')
],productController.addProduct);  


router.get('/list',productController.getProducts);


router.put('/update/:id',authMiddleware.authAdmin,[
        param('id').isMongoId().withMessage('Invalid product ID'),
        body('name').optional().notEmpty().withMessage('Product name is required'),
        body('price').optional().isNumeric().withMessage('Price must be a number'),
        body('category').optional().notEmpty().withMessage('Category is required'),
        body('stock').optional().isNumeric().withMessage('Stock must be a number')
],productController.updateProduct);


router.delete('/delete/:id',authMiddleware.authAdmin,[
    param('id').isMongoId().withMessage('Invalid product ID')
],productController.deleteProduct);


router.get('/:id',
    [
        param('id').isMongoId().withMessage('Invalid product ID')
    ],
   productController.getProductById  
);

module.exports = router;
