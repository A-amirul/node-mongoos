const express = require('express');
const { insertIntoDb, getAllStudent, deleteStudentIntoDb, updateStudentIntoDb } = require('./student.controller');
const router = express.Router();

router.post('/student-create', insertIntoDb);
router.get('/student-list', getAllStudent);
router.delete('/:id', deleteStudentIntoDb);
router.patch('/:id', updateStudentIntoDb);

const studentRoutes = {
    router
};

module.exports = studentRoutes;