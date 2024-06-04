const express = require("express")
const router = express.Router();
const hospitalController = require("../controllers/hospitalController")

router.get("/",hospitalController.getAllHospitals)

router.get("/:id",hospitalController.getHospitalById)

router.get("/search/:name",hospitalController.searchHospitalByName)

router.post("/",hospitalController.createHospital)

router.delete("/:id",hospitalController.deleteHospital)

module.exports = router