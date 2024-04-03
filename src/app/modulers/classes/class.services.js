const Class = require("./class.model");
exports.addClass = async (data) => {
    const result = await Class.create(data);
    return result;
}

exports.getAllClass = async () => {
    const result = await Class.find({});
    return result;
}

exports.deleteSingleClass = async (id) => {
    const result = await Class.findByIdAndDelete(id);
    return result;

}

exports.updateSingleClass = async (id, data) => {
    const result = await Class.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return result;
};