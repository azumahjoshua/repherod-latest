const { Op } = require('sequelize');
const {Hospital} = require("../../models");

const getAllHospitals = async () => {
    return Hospital.findAll();
}

const getHospitalById = async (id) => {
    return Hospital.findByPk(id);
}

const createHospital = async (hospitalData) => {
    return Hospital.create(hospitalData);
}

const searchHospitalByName = async (name) => {
    const hospitals = await Hospital.findAll({
        where: {
            hospitalName: {
                [Op.like]: `%${name}%`,
            },
        }
    });
    return hospitals;
}

const deleteHospital = async (id) => {
    const hospital = await getHospitalById(id);

    if (!hospital) {
        throw new Error('Hospital not found');
    }

    await hospital.destroy();
    return 'Hospital deleted successfully';
};

module.exports = {
    getAllHospitals,
    getHospitalById,
    deleteHospital,
    createHospital,
    searchHospitalByName
}

