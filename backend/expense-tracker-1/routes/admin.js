const express = require('express');

const router = express.Router();

const itemController = require('../controllers/items')



router.post('/post-item', itemController.postAddItem)

router.get('/get-items', itemController.getAllItems)

router.delete('/delete-item/:id', itemController.postDeleteItem)

router.put('/edit-item/:id', itemController.postEditItem)





module.exports = router;