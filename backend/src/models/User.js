const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {
        type:String,
        required: true,
        trim: true,
        unique: true
    },
    rol: String
},{
    timestamps: true  //Cada que creemos un dato con este modelo se va a guardar la fecha de creacion y la fecha de la actualizacion
});

module.exports = model('User',userSchema)