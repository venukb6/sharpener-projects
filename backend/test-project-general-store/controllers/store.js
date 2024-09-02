const Store = require('../models/store');

exports.postAddItem = async (req, res) =>{
    console.log('entering the post add item controller')
    try {
        const {itemNameVal, descriptionVal, priceVal, quantityVal } = req.body;
        const ItemData = {
            itemName: itemNameVal,
            description: descriptionVal,
            price: priceVal,
            quantity: quantityVal
        }
        console.log('item data')

        const data = await Store.create(ItemData);
        console.log('sending response from postAddItem controller')
        res.status(200).json({data})
    } catch(error) {
        console.log('error', error)
        res.status(500).json({error: 'error occured while adding a new item '})
    }
}

exports.getAllItems = async (req, res) => {
    console.log('entering get all items controller')
    try {
        const items = await Store.findAll()
        console.log('sending response from get all items controller')
        res.status(200).json({items})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error while fetching all items'});
    }
}

exports.updateQuantity = async (req, res) => {
    console.log('entering update quantity controller')
    try {
        const { id } = req.params;
        const { quantityChange } = req.body;  //Positive for adding, Negative for buying
        const item = await Store.findByPk(id);

        if (!item) {
            res.status(404).json({error: 'Item not found'});
        }

        item.quantity += quantityChange;
        await item.save()
        console.log('item after saving:',item.dataValues)

        res.status(200).json({ data: item });
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error updating item quantity'});
    }
}

exports.editItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemNameVal, descriptionVal, priceVal, quantityVal } = req.body;

        const item = await Store.findByPk(id);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        item.itemName = itemNameVal;
        item.description = descriptionVal;
        item.price = priceVal;
        item.quantity = quantityVal;

        await item.save();

        res.status(200).json({ data: item });
    } catch (error) {
        res.status(500).json({ error: 'Error updating item' });
    }
};


exports.deleteItem = async (req, res) => {
    console.log('entering the delete item controller');
    try {
        const delId = req.params.id ;
        const item = await Store.findByPk(delId)
        console.log('the item is ', item)
        await item.destroy()
        console.log('item deleted successfully')
        res.status(200).json({message: 'user deleted successfully'})
    } catch (error) {
        console.log('error while deleting item')
        res.status(500).json({error: 'error while deleting item'})
    }
}