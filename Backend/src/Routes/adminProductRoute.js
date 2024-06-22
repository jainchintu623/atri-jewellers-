const express = require("express")

const router = express.Router();
const productControler = require('../Controler/productControler')
const authenticate = require('../middleWere/middleWere');

router.post('/',authenticate,productControler.createProduct);
router.post('/creates',authenticate,productControler.createMultiPleProduct);
router.delete('/:id',authenticate,productControler.deleteProduct);
router.post('/:id',authenticate,productControler.updateProduct);


module.exports = router;