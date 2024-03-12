const Task = require("./task.model");
const { addToDb, getAllTask, getSingleTask, deleteSingleTask, updateSingleTask } = require("./task.service");


exports.insertIntoDb = async (req, res) => {
    try {
        const result = await addToDb(req.body);
        res.status(201).json({ success: true, message: "Task added successfully!", data: result });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: 'Error creating task' });
    }
};


exports.getIntoDb = async (req, res) => {
    try {
        const tasks = await getAllTask();
        res.json({ success: true, message: "Task retrieve successfully!", data: tasks });
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
        res.json({ success: true, message: "Single Task Retrive Successfully!", data: task });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
}

exports.deleteTaskIntoDb = async (req, res) => {
    try {
        const task = await deleteSingleTask(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        res.json({ success: true, message: "Task Deleted Successfully!", data: task });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
}


exports.updateTaskIntoDb = async (req, res) => {



    try {
        const id = req.params.id;
        const data=req.body;
        const task = await updateSingleTask(id,data);

        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        res.json({ success: true, message: "TaskData Updata Successfully!", data: task });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: 'Error updating task' });
    }
}
