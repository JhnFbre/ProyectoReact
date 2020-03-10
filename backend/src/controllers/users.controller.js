const User = require('../models/User')

const  userControl = {}
    userControl.getUsers = async (req, res) => {
        const allUsers= await User.find()
        res.json(allUsers)
    };

    userControl.getUser = async (req, res) => {
        const uniqueUser = await User.findById(req.params.id);
        res.json(uniqueUser);
    };

    userControl.createUsers = async(req, res) => {
        const {username, rol} =  req.body
        const nuevoUser = new User({username, rol});
        await nuevoUser.save();
        res.json({message:'Usuario guardado'})
    };

    userControl.updateUsers =  async(req, res) => {
        const {username, rol} =  req.body
        await User.findByIdAndUpdate(req.params.id,{username, rol})
        res.json({message:'Usuario Editado'})
    };
    
    userControl.deleteUsers= async(req, res) => {
        await User.findByIdAndDelete(req.params.id);
        res.json({message:'Usuario Eliminado'})
    };
    module.exports = userControl