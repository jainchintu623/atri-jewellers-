const express = require("express")

const router = express.Router();
const cartItemControler = require('../Controler/cartItemControler')
const authenticate = require('../middleWere/middleWere');

router.put('/:id',authenticate,cartItemControler.updateCartItem)
router.delete('/:id',authenticate,cartItemControler.removeCartItem)

module.exports = router;