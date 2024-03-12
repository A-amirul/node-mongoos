const Task = require("./task.model");
const { addToDb, getAllTask, getSingleTask } = require("./task.service");

exports.insertIntoDb = async (req, res) => {
    try {
        const result = await addToDb(req.body);
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: 'Error creating task' });
    }
};

exports.getIntoDb = async (req, res) => {
    try {
        const tasks = await getAllTask();
        res.json({ success: true, data: tasks });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
}

exports.getSingleTaskIntoDb = async (req, res) => {
    try {
        const task = await getSingleTask(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.json({ success: true, data: task });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
}
