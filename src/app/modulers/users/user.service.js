const bcrypt = require('bcryptjs');
const User = require('../users/user.model');

exports.addUser = async (data) => {
    console.log(data);
    try {
        const { username, password } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        const result = await user.save();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Server Error');
    }
}

exports.authenticateUser = async (data) => {
    try {
        const { username, password } = data;
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

    } catch (error) {
        console.error(error);
        throw new Error('Invalid username or password');
    }
}
