const express = require('express')
const referralController = require("../controllers/referralController.js")
const { upload } = require('../util/fileUpload');
const router = express.Router()
const authMiddleware  = require('../middlewares/authMiddleware.js')
router.post('/addreferral',upload.array('files'),authMiddleware,referralController.createReferral)
router.get('/user/:userId',authMiddleware,referralController.getReferralsByUser)
router.get('/other/:userId',authMiddleware,referralController.getReferralsByOther)
router.get('/status/:status',authMiddleware,referralController.getReferralsByStatus)


module.exports = router