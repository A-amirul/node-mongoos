const express = require('express');
const router = express.Router();
const { insertIntoDb, authenticateUserFromDb, getUserIntoDb } = require('../users/user.controler');

router.post('/signup', insertIntoDb);
router.post('/signin', authenticateUserFromDb);
router.get('/user-list',getUserIntoDb);

const userRoutes = {
    router
};

module.exports = userRoutes;