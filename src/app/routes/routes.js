const express = require("express");
const taskRoutes = require("../modulers/task/task.routes");
const studentRoutes = require("../modulers/students/student.routes");
const classRoutes = require("../modulers/classes/class.routes");
const userRoutes = require("../modulers/users/user.routes");
const productRoutes = require("../modulers/products/product.route");

const router = express.Router();

const modulesRoutes = [
    {
        path: "/product",
        route: productRoutes
    },
    {
        path: "/task",
        route: taskRoutes
    },
    {
        path: "/student",
        route: studentRoutes
    },
    {
        path: "/class",
        route: classRoutes
    },
    {
        path: "/user",
        route: userRoutes
    }
];

modulesRoutes.forEach(route => router.use(route.path, route.route.router));

module.exports = router;
