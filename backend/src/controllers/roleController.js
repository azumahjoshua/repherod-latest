const roleService = require("../services/roleService")

const getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        res.json(roles);
    } catch (error) {
        console.error('Error getting roles:', error.message);
        res.status(500).json({ error: 'Failed to get roles' });
    }
};

const createRole = async (req, res) => {
    try {
        const { roleName } = req.body;
        const createdRole = await roleService.createRole(roleName);
        res.json(createdRole);
    } catch (error) {
        console.error('Error creating role:', error.message);
        res.status(500).json({ error: 'Failed to create role' });
    }
};

const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await roleService.getRoleById(id);
        if (!role) {
            return res.status(404).json({ error: 'Role Not Found' });
        }
        res.json(role.roleName);
    } catch (error) {
        console.error('Error getting role by ID:', error.message);
        res.status(500).json({ error: 'Failed to get role by ID' });
    }
};

module.exports = {
    getAllRoles,
    createRole,
    getRoleById
};