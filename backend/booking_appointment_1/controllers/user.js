const User = require('../models/user');

exports.postAddUser = async (req, res, next) => {
    console.log('inside controller route')
    try {
        const {usernameV, numberV, emailV} = req.body;

        const data = await User.create({
            name: usernameV,
            phoneNumber: numberV, 
            email: emailV
        })
        res.status(201).json({newUserData: data})

    } catch(err) {
        // console.log(err.errors)
        // console.log(err)
        res.status(500).json({error: 'error occured while updating the details of the user'})
    }   
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const data = await User.findAll()
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({error: 'Error occured while fetching details of all users'})
    }
}

exports.postDeleteUser = async (req, res, next) => {
    console.log('inside delete controller')
    const delId = req.params.id 
    try {
        const user = await User.findByPk(delId)
        await user.destroy()
        res.status(200).json({message: "user deleted successfully"})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Error occured while deleting the user'})
    }
}

exports.postEditUser = async (req, res, next) => {
    const delId = req.params.id 
    const {usernameV, numberV, emailV} = req.body;
    try{
        const user = await User.findByPk(delId)
        if (user){
            user.name= usernameV
            user.phoneNumber= numberV
            user.email= emailV
            await user.save()
            res.status(201).json({updatedUserData: user})
        }
        else{
            res.status(404).json({error: 'Error occured while Editing the user'})
        }
        
    } catch (err) {
        res.status(500).json({error: 'Error occured while Editing the user'})
    }
}