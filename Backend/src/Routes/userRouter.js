const express = require("express")

const router = express.Router();


const userController = require('../Controler/userControler');

router.get('/profile',userController.getUserProfile);
router.get('/',userController.getAllUsers);


module.exports = router;