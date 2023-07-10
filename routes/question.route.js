const express = require("express")
const router = express.Router()
const { publishQuestion }=require('../controllers/question.controller')

router.post("/publish", publishQuestion)

module.exports=router