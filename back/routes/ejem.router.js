const express = require('express')
const router = express.Router();
const helloController = require('../controller/ejem.controller')



//Rutas para usuarios
router.get("/", helloController.hello);





module.exports = router;