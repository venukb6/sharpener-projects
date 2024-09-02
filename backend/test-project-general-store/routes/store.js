const express = require('express');
const router = express.Router();

const storeController = require('../controllers/store');

router.post('/add-item', storeController.postAddItem);

router.get('/items', storeController.getAllItems);

router.delete('/delete-item/:id', storeController.deleteItem);

router.put('/update-quantity/:id', storeController.updateQuantity);

router.put('/edit-item/:id', storeController.editItem);


module.exports = router;