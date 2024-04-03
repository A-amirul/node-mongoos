const express = require('express');
const router = express.Router();
const { insertIntoDb, authenticateUserFromDb } = require('../users/user.controler');

router.post('/signup', insertIntoDb);
router.post('/signin', authenticateUserFromDb);

const userRoutes = {
    router
};

module.exports = userRoutes;