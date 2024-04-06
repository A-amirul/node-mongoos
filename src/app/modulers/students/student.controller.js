
const cloudinary = require("../../utils/cloudinary");
const { addStudent, getAllStudent, deleteSingleStudent, updateSingleStudent } = require("./student.service");

/*-----------post student---------*/
exports.insertIntoDb = async (req, res) => {
    // console.log(req.body);
    try {
        const datas = req.body;
        if (!req.file) {
            res.status(400).send('No file uploaded');
            return;
        }
        cloudinary.uploader.upload(req.file.path, async function (error, result) {
            if (error) {
                console.error(error.message);
                res.status(400).json({ success: false, error: "Error uploading file" })
                return;
            }

            const studentData = {
                ...datas,
                student_image: result.secure_url
            }

            const savedStudent = await addStudent(studentData)
            res.status(201).json({ success: true, message: "Student Added Successfully!", data: savedStudent });
        })

    } catch (error) {
        console.error(error.message);
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


/*-----------------Update Task-------------*/
exports.updateStudentIntoDb = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const student = await updateSingleStudent(id, data);

        if (!student) {
            return res.status(404).json({ success: false, error: 'Student not found' });
        }

        res.json({ success: true, message: "Student Update Successfully!", data: student });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: 'Error updating student' });
    }
}
