const Expense = require('../models/expense');

exports.postAddItem = async (req, res, next) => {
    console.log('inside add item route')

    try {
        const {amtV, desV, catV} = req.body
        const data = await Expense.create({
            amount: amtV,
            description: desV,
            category: catV
        })
        res.status(201).json(data)
    } catch(err){
        console.log(err)
        res.status(500).json({error: 'Error occured while adding item'})
    }
}

exports.getAllItems = async (req, res, next) => {
    console.log('inside get all items route')

    try {
        const data = await Expense.findAll()
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Error occured while getting all items'})
    }
}

exports.postDeleteItem = async (req, res, next) => {
    const delId = req.params.id 
    console.log(`delId is ${delId}`)

    try {
        const item = await Expense.findByPk(delId)
        item.destroy()
        res.status(200).json({message: 'Item deleted successfully'})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Error occured while deleting item'})
    }
}

exports.postEditItem = async (req, res, next) => {
    const delId = req.params.id

    try {
        const {amount, description, category} = req.body
        const item = await Expense.findByPk(delId)
        if(item) {
            item.amount = amount
            item.description = description
            item.category = category
            await item.save()
            res.status(200).json(item)
        } else{
            res.status(404).json({message: 'Item not found'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Error occured while editing the item'})
    }
}