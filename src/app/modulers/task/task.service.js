const Task = require("./task.model");

exports.addToDb = async (data) => {
    const result = await Task.create(data);
    return result;
};


exports.getAllTask = async () => {
    const result = await Task.find({});
    return result;
};

exports.getSingleTask = async (id) => {
    const result = await Task.findById(id);
    return result;
};
