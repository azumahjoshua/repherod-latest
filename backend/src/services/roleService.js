const { Role } = require("../../models");


const createRole = async (roleName) => {
    try {
        const existingRole = await Role.findOne({ where: { roleName } });
        if (existingRole) {
            throw new Error('Role already exists');
        }
        const newRole = await Role.create({ roleName });
        return newRole;
    } catch (error) {
        console.error('Error creating role:', error.message);
        throw new Error('Failed to create role');
    }
};

const getRoleById = async (id) => {
    try {
        const role = await Role.findByPk(id);
        return role;
    } catch (error) {
        console.error('Error getting role by ID:', error.message);
        throw new Error('Failed to get role by ID');
    }
};

const getAllRoles = async () => {
    try {
        const roles = await Role.findAll();
        return roles;
    } catch (error) {
        console.error('Error getting roles:', error.message);
        throw new Error('Failed to get roles');
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById
};
