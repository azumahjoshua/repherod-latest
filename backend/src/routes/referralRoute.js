const express = require('express')
const referralController = require("../controllers/referralController.js")
const { upload } = require('../util/fileUpload');
const router = express.Router()
const authMiddleware  = require('../middlewares/authMiddleware.js')
router.post('/addreferral',upload.array('files'),authMiddleware,referralController.createReferral)

module.exports = router