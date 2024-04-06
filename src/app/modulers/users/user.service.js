const bcrypt = require('bcryptjs');
const User = require('../users/user.model');

exports.addUser = async (data) => {
    try {
        const { username, email, password } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
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
            throw new Error('Invalid username or password');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid username or password');
        }

        return user; // Return the user object if authentication is successful

    } catch (error) {
        console.error(error);
        throw new Error('Invalid username or password');
    }
}


exports.getAllUser = async () => {
    const result = await User.find({});
    return result;
};
