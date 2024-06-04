const hospitalService = require("../services/hospitalService")

const getAllHospitals = async (req, res) => {
    try {
        const hospitals = await hospitalService.getAllHospitals();
        res.json(hospitals)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getHospitalById = async (req, res) => {
    try {
        const hospital = await hospitalService.getHospitalById(req.params.id);
        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }
        res.json(hospital);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const searchHospitalByName = async (req, res) => {
    try {
        const { name } = req.params;
        const hospitals = await hospitalService.searchHospitalByName(name);
        res.status(200).json(hospitals);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createHospital = async (req, res) => {
    try {
        const createdHospital = await hospitalService.createHospital(req.body);
        res.json(createdHospital);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteHospital = async (req, res) => {
    try {
        const deletedHospital = await hospitalService.deleteHospital(req.params.id);
        res.json(deletedHospital);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllHospitals,
    getHospitalById,
    searchHospitalByName,
    createHospital,
    deleteHospital
}
