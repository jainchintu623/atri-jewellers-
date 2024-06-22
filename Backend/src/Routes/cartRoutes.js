const express = require("express")

const router = express.Router();
const cartControler = require('../Controler/cartControler')
const authenticate = require('../middleWere/middleWere');


router.get('/',authenticate,cartControler.findUserCart);
router.put('/add',authenticate,cartControler.addItemToCart)

module.exports = router;