const e = require("express");
const questionModel = require("../models/question.model");
const scoreModel = require("../models/scores.model");

const publishQuestion = (req, res) => {
  form = new questionModel(req.boy);
  form.save((err) => {
    if (err) {
      res.send({
        message: "There was a problem with the server, please try again",
        status: false,
      });
    } else {
      res.send({ message: "Question Added Successfully", status: true });
    }
  });
};
const takeQuiz = (req, res) => {
  questionModel.find((err, result) => {
    if (err) {
      console.log(err.message);
      res.send({ status: false, message: "There was an error" + err.message });
    } else {
      res.send({ status: true, result, message: "Successful" });
    }
  });
};
const postScore = (req, res) => {
  let { score, prize, sessionID } = req.body;
  let trophy;
  if (score >= 12) {
    trophy = "Gold";
  } else if (score >= 7) {
    trophy = "Silver";
  } else {
    trophy = "Bronze";
  }
  let newScore = {score, trophy, uid:sessionID, prize}
  let form = new scoreModel(newScore);
  form.save((err)=>{
    if(err){
        console.log(err.message)
    }else{
        res.send({message: "Score saved", })
    }
  })
};
module.exports = { publishQuestion };
