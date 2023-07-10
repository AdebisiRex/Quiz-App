const express = require("express");
const router = express.Router();
const { registerUser, signin, getDashboard } = require("../controllers/user.controller");


router.get("/dashboard", getDashboard);


router.post("/register", registerUser);
router.post("/signin", signin);

module.exports = router;
