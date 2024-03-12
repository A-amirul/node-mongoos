const express = require('express');
const { insertIntoDb, getIntoDb, getSingleTaskIntoDb, deleteTaskIntoDb, updateTaskIntoDb } = require('./task.controller');
const router = express.Router();

// Create a new task using the insertIntoDb function
router.get('/task-list', getIntoDb);
router.get('/:id', getSingleTaskIntoDb);
router.delete('/:id', deleteTaskIntoDb);
router.patch('/:id', updateTaskIntoDb);
router.post('/create-task', insertIntoDb);

const taskRoutes = {
  router
};

module.exports = taskRoutes;
