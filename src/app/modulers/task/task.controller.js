const { addToDb } = require("./task.service");

exports.insertIntoDb = async (req, res) => {
    try {
        const result = await addToDb(req.body);
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: 'Error creating task' });
    }
};
