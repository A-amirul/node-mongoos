const express = require('express');
const { insertIntoDb, getIntoDb, getSingleTaskIntoDb, deleteTaskIntoDb, updateTaskIntoDb } = require('./task.controller');
const { upload } = require('../../../utils/file');
const { FileUploadHelper } = require('../../../helper/image.upload');
const router = express.Router();

// Create a new task using the insertIntoDb function
router.get('/task-list', getIntoDb);
router.get('/:id', getSingleTaskIntoDb);
router.delete('/:id', deleteTaskIntoDb);
router.patch('/:id', updateTaskIntoDb);
// router.post('/create-task', upload.single('file'), insertIntoDb);
router.post('/create-task', FileUploadHelper.ImageUpload.fields([{name:"image",maxCount:1}]), insertIntoDb);

const taskRoutes = {
  router
};

module.exports = taskRoutes;
