// userController.js
const userService = require('../services/userService');

const register = async (req, res) => {
    try {
        const newUser = await userService.register(req.body);
        
        res.status(201).json({message:"User Registration Successfull",newUser});
    } catch (error) {
        res.status(400).json({message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await userService.login(email, password);
        res.status(200).json({ message: 'Password matched. User authenticated.', user, access_token:token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    getAllUsers,
};
