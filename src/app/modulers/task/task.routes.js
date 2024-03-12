const express = require('express');
const { insertIntoDb } = require('./task.controller');
const router = express.Router();

// Create a new task using the insertIntoDb function
router.post('/create-task', insertIntoDb);

const taskRoutes = {
  router
};

module.exports = taskRoutes;
