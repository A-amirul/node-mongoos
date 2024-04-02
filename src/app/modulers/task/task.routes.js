const express = require('express');
const { insertIntoDb, getIntoDb, getSingleTaskIntoDb, deleteTaskIntoDb, updateTaskIntoDb } = require('./task.controller');
const upload = require('../../middleware/multer');
const router = express.Router();

// Create a new task using the insertIntoDb function
router.get('/task-list', getIntoDb);
router.get('/:id', getSingleTaskIntoDb);
router.delete('/:id', deleteTaskIntoDb);
router.patch('/:id', updateTaskIntoDb);
router.post('/create-task', upload.single('image'), insertIntoDb);
// router.post('/create-task', FileUploadHelper.ImageUpload.fields([{ name: "image", maxCount: 1 }]), insertIntoDb);

const taskRoutes = {
  router
};

module.exports = taskRoutes;
