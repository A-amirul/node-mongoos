const express = require("express");
const taskRoutes = require("../modulers/task/task.routes");
const studentRoutes = require("../modulers/students/student.routes");

const router = express.Router();

const modulesRoutes = [
    {
        path: "/task",
        route: taskRoutes
    },
    {
        path: "/student",
        route: studentRoutes
    }
];

modulesRoutes.forEach(route => router.use(route.path, route.route.router));

module.exports = router;
