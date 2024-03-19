const express = require('express');
const { insertIntoDb, getAllStudent, deleteStudentIntoDb } = require('./student.controller');
const router = express.Router();

router.post('/student-create',insertIntoDb);
router.get('/student-list',getAllStudent);
router.delete('/:id',deleteStudentIntoDb);

const studentRoutes = {
    router
  };
  
  module.exports = studentRoutes;