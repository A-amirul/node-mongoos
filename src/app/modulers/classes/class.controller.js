const { getAllClass, deleteSingleClass, addClass, updateSingleClass } = require("./class.services");


/*-----------post class---------*/
exports.insertClassIntoDb = async (req, res) => {

    console.log(req.body);
    try {
        const result = await addClass(req.body);
        res.status(201).json({ success: true, message: "Class Added Successfully!", data: result });
    } catch (error) {
        res.status(400).json({ success: false, error: "Server Error" });
    }
}


/*---------------get all class------------*/
exports.getAllClass = async (req, res) => {
    try {
        const classes = await getAllClass();
        res.json({ success: true, message: "Class Retrive Successfully", data: classes });

    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }

}

/*---------------delete single class------------*/
exports.deleteClassIntoDb = async (req, res) => {
    try {
        const singleClass = await deleteSingleClass(req.params.id);
        if (!singleClass) {
            return res.status(404).json({ success: false, error: "Class Not Found" })
        }
        res.json({ success: true, message: "Class Deleted Successfully!", data: singleClass })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "server error" });
    }

}


/*-----------------Update Task-------------*/
exports.updateClassIntoDb = async (req, res) => {
    try {
        const id = req.params.id;
        const data=req.body;
        const singleClass = await updateSingleClass(id,data);

        if (!singleClass) {
            return res.status(404).json({ success: false, error: 'Class not found' });
        }

        res.json({ success: true, message: "Class Update Successfully!", data: singleClass });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: 'Error updating singleClass' });
    }
}
