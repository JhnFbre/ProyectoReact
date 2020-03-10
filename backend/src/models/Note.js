const {Schema, model} = require('mongoose');

const noteSchema = new Schema({
    titulo: {
        type:String,
        required: true
    },
    descripcion: String,
    autor: String,
    date: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true  //Cada que creemos un dato con este modelo se va a guardar la fecha de creacion y la fecha de la actualizacion
});

module.exports = model('Note',noteSchema)