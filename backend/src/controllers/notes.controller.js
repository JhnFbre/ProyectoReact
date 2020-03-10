const Note = require('../models/Note')

const  noteControl = {}
    noteControl.getNotes = async (req, res) => {
        const allNotes= await Note.find()
        res.json(allNotes);
    };

    noteControl.getNote = async (req, res) => {        
        const uniqueNote= await Note.findById(req.params.id);
        res.json(uniqueNote);
    };

    noteControl.createNotes = async(req, res) => {
        const {titulo, descripcion, autor, date} = req.body;
        const nuevaNota= new Note({
            titulo,
            descripcion,
            autor,
            date
        });
        await nuevaNota.save();
        res.json({message:'Notas guardados'})
    };

    noteControl.updateNotes = async (req, res) => {
        const {titulo, descripcion, autor, date} = req.body
        await Note.findByIdAndUpdate(req.params.id, {
            titulo,
            descripcion,
            autor,
            date
        })
        res.json({message:'Nota Editada'});
    };
    
    noteControl.deleteNotes= async (req, res) => {
        await Note.findByIdAndDelete(req.params.id);
        res.json({message:'Nota Eliminada'});
    };
    noteControl.deleteNotesByUserID= async (req, res) => {
        console.log(req.params.id)
        await Note.deleteMany("autor",req.params.id);
        res.json({message:'Notas del ID eliminadas'});
    };

    module.exports = noteControl