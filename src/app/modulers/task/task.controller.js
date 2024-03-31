const { FileUploadHelper } = require("../../../helper/image.upload");
const Task = require("./task.model");
const { addToDb, getAllTask, getSingleTask, deleteSingleTask, updateSingleTask } = require("./task.service");


/*-----------------post a Task-------------*/
// exports.insertIntoDb = async (req, res) => {
//     try {
//         console.log(req.file);
//         if (!req.file) {
//             res.status(400).send('No file uploaded.');
//             return;
//         }
//         const result = await addToDb(req.body);
//         res.status(201).json({ success: true, message: "Task added successfully!", data: result });
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).json({ success: false, error: 'Error creating task' });
//     }
// };

// post a task image
exports.insertIntoDb = async (req, res) => {
    try {
        const datas = req.body;
        if (req.files && 'image' in req.files) {
            const image = req.files['image'][0];
            const image_upload = await FileUploadHelper.uploadToCloudinary(image);
            image = image_upload?.secure_url;
            const data = { ...datas, image };
            const result = await addToDb(data);
            console.log(result);


        }

    } catch (error) {
        console.error(error);
    }
}


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
