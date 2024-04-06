const express = require('express');
const { insertIntoDb, getAllStudent, deleteStudentIntoDb, updateStudentIntoDb } = require('./student.controller');
const upload = require('../../middleware/multer');
const router = express.Router();

router.post('/student-create', upload.single('student_image'), insertIntoDb);
router.get('/student-list', getAllStudent);
router.delete('/:id', deleteStudentIntoDb);
router.patch('/:id', updateStudentIntoDb);

const studentRoutes = {
    router
};

module.exports = studentRoutes;