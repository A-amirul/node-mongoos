const Student = require("./student.model")

exports.addStudent = async (data) => {
    const result = await Student.create(data);
    return result;
}

exports.getAllStudent = async () => {
    const result = await Student.find({});
    return result;
}

exports.deleteSingleStudent = async (id) => {
    const result = await Student.findByIdAndDelete(id);
    return result;

}