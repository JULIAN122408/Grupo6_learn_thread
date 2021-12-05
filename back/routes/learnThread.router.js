const express = require('express')
const router = express.Router();
const learnThreadsController = require('../controller/learnThread.controller')



//Rutas para usuarios

router.post("/", learnThreadsController.create);
router.get("/", learnThreadsController.find);
router.get("/:id", learnThreadsController.findOne);
router.put("/:id", learnThreadsController.update);
router.delete("/:id", learnThreadsController.remove);





module.exports = router;