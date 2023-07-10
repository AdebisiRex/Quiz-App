const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
    score: Number,
    uid: String,
    trophy: String,
    prize:String
})

const scoreModel = mongoose.model("quiz_score", scoreSchema)