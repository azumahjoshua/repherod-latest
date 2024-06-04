const express = require ("express")
const roleController = require('../controllers/roleController.js')
const router = express.Router()

router.get("/",roleController.getAllRoles)

router.post("/",roleController.createRole)

router.get("/:id", roleController.getRoleById);

module.exports = router