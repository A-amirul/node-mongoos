const { addUser, authenticateUser } = require('../users/user.service');
const jwt = require('jsonwebtoken');
const secret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hem11bEBnbWFpbC5jb20iLCJpYXQiOjE2OTQ0MzExOTF9.xtLPsJrvJ0Gtr4rsnHh1kok51_pU10_hYLilZyBiRAM";

exports.insertIntoDb = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, error: "Username or email, or password is missing" });
        }

        const result = await addUser({ username, email, password });
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

        const user = await authenticateUser({ username, password });
        const token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '1h' });
        res.status(200).json({ success: true, message: "User Login Successfully!", token });
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, error: "Invalid username or password" });
    }
}
