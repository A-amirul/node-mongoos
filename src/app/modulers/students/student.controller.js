const { param } = require("../../routes/routes");
const { addStudent, getAllStudent, deleteSingleStudent } = require("./student.service");


/*-----------post student---------*/
exports.insertIntoDb = async (req, res) => {
    try {
        const result = await addStudent(req.body);
        res.status(201).json({ success: true, message: "Student Added Successfully!", data: result });
    } catch (error) {
        res.status(400).json({ success: false, error: "Server Error" });
    }
}


/*---------------get all Student------------*/
exports.getAllStudent = async (req, res) => {
    try {
        const students = await getAllStudent();
        res.json({ success: true, message: "Student Retrive Successfully", data: students });

    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }

}

/*---------------delete single Student------------*/
exports.deleteStudentIntoDb = async (req, res) => {
    try {
        const student = await deleteSingleStudent(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, error: "Student Not Found" })
        }
        res.json({ success: true, message: "Student Deleted Successfully!", data: student })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "server error" });
    }

}