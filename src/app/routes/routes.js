const express = require("express");
const taskRoutes = require("../modulers/task/task.routes");

const router = express.Router();

const modulesRoutes = [
    {
        path: "/task",
        route: taskRoutes
    }
];

modulesRoutes.forEach(route => router.use(route.path, route.route.router));

module.exports = router;
