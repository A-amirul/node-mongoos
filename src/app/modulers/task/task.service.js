const Task = require("./task.model");

exports.addToDb = async (data) => {
    const result = await Task.create(data);
    return result;
};
