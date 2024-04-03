const { addUser, authenticateUser } = require('../users/user.service');

exports.insertIntoDb = async (req, res) => {
    console.log(req.body);
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ success: false, error: "Username or password is missing" });
        }

        const result = await addUser({ username, password });
        res.status(201).json({ success: true, message: "User Signup Successfully!", data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
}

exports.authenticateUserFromDb = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ success: false, error: "Username or password is missing" });
        }

        const result = await authenticateUser({ username, password });
        res.status(200).json({ success: true, message: "User Login Successfully!", data: result });
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, error: "Invalid username or password" });
    }
}
