const express = require('express');
const { insertIntoDb, getIntoDb, getSingleTaskIntoDb } = require('./task.controller');
const router = express.Router();

// Create a new task using the insertIntoDb function
router.get('/task-list', getIntoDb);
router.get('/:id', getSingleTaskIntoDb);
router.post('/create-task', insertIntoDb);

const taskRoutes = {
  router
};

module.exports = taskRoutes;
