const cloudinary = require("../../utils/cloudinary");

const { addToDb, getAllTask, getSingleTask, deleteSingleTask, updateSingleTask } = require("./task.service");

/*-----------------post a Task-------------*/
exports.insertIntoDb = async (req, res) => {
    try {
        const datas = req.body;
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }

        cloudinary.uploader.upload(req.file.path, async function (error, result) {
            if (error) {
                console.error(error.message);
                res.status(400).json({ success: false, error: 'Error uploading file' });
                return;
            }

            const taskData = {
                ...datas,
                image: result.secure_url
            };

            const savedTask = await addToDb(taskData);


            res.status(200).json({ success: true, message: "Task added successfully!", data: savedTask });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};




/*-----------------get all Task-------------*/
exports.getIntoDb = async (req, res) => {
    try {
        const tasks = await getAllTask();
        res.json({ success: true, message: "Task retrieve successfully!", data: tasks });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
}


/*-----------------get single Task-------------*/

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


/*-----------------Delete Task-------------*/

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



/*-----------------Update Task-------------*/
exports.updateTaskIntoDb = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const task = await updateSingleTask(id, data);

        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        res.json({ success: true, message: "TaskData Updata Successfully!", data: task });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: 'Error updating task' });
    }
}
