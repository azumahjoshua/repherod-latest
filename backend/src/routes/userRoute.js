const express = require("express")
const userController = require("../controllers/userController.js")

const router = express.Router()

router.get("/",userController.getAllUsers)
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
