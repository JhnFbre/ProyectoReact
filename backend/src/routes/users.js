const { Router } = require('express');
const router = Router();

const {getUser, getUsers, createUsers, updateUsers, deleteUsers} = require('../controllers/users.controller');

router.route('/')
    .get(getUsers)
    .post(createUsers)
    
router.route('/:id')
    .get(getUser)
    .put(updateUsers)
    .delete(deleteUsers)

module.exports = router