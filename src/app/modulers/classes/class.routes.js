const express = require('express');
const { insertClassIntoDb, deleteClassIntoDb, getAllClass, updateClassIntoDb } = require('./class.controller');
const router = express.Router();

router.post('/class-create', insertClassIntoDb);
router.get('/class-list', getAllClass);
router.delete('/:id', deleteClassIntoDb);
router.patch('/:id', updateClassIntoDb);

const classRoutes = {
    router
};

module.exports = classRoutes;