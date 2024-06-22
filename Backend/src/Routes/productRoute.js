const express = require("express")

const router = express.Router();
const productControler = require('../Controler/productControler')

const authenticate = require("../middleWere/middleWere");

router.get('/',authenticate,productControler.getAllProducts);
router.get('/id/:id',authenticate,productControler.findProductById)


module.exports = router;