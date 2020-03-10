const { Router } = require('express');
const router = Router();
const {getNotes, createNotes, getNote, updateNotes, deleteNotes, deleteNotesByUserID} = require('../controllers/notes.controller');

router.route('/')
    .get(getNotes)
    .post(createNotes)
    
router.route('/:id')
    .get(getNote)
    .put(updateNotes)
    .delete(deleteNotes)
router.route('/deleteByUser/:id')
    .delete(deleteNotesByUserID);

module.exports = router