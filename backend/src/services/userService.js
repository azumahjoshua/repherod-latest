// userService.js
const { User, Role,Hospital } = require("../../models");
const { isEmail } = require("validator");
const { validatePassword, generateAccessToken } = require("../auth/utils/auth");
const bcrypt = require("bcrypt");

const register = async ({ firstName, lastName, contactInfo, email, password, roleName,hospitalName }) => {
    try {
        if (!isEmail(email)) {
            throw new Error({message:"Invalid Email format"});
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error({message:'User already exists'});
        }

        const role = await Role.findOne({ where: { roleName } });
        if (!role) {
            throw new Error({message:'Select a valid role'});
        }

        const hospital = await Hospital.findOne({ where: { hospitalName }})
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ firstName, lastName, contactInfo, email, password: hashedPassword, roleID: role.id, hospitalID:hospital.id });
        return newUser;
    } catch (error) {
        throw new Error({message:'Error registering user: ' + error.message});
    }
};

const login = async (email, password) => {
    try {
        const user = await User.scope('withPassword').findOne({ where: { email } });
        if (!user) {
            throw new Error({message:"Email or Password Incorrect"});
        }

        const isMatch = await validatePassword(password, user.password);
        if (!isMatch) {
            throw new Error({message:"Email or Password Incorrect"});
        }

        const token = generateAccessToken(user);
        return { user, token };
    } catch (error) {
        throw new Error({message: 'Error during login: ' + error.message});
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw new Error({message: 'Failed to get users: ' + error.message});
    }
};

module.exports = {
    register,
    login,
    getAllUsers
};
