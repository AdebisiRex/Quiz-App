const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const registerUser = (req, res) => {
  console.log("Got here");
  let { d_picture, firstname, lastname, username, email, password } = req.body;
  if (d_picture) {
    cloudinary.v2.uploader.upload(d_picture, (err, result) => {
      if (err) {
        res.send({
          status: false,
          message: "Picture too Large",
          err: err.message,
        });
      } else {
        let dp = result.secure_url;
        let userObj = {
          firstname,
          lastname,
          username,
          email,
          admin: false,
          highestScore: 0,
          password,
          displayPicture: dp,
        };
        // console.log(userObj)

        let form = new userModel(userObj);
        form.save((err) => {
          if (err) {
            res.send({
              status: false,
              message: "Account Creation Unsucessful",
              err: err.message,
            });
          } else {
            res.send({
              status: true,
              message: "Account Creation Successful",
            });
          }
        });
      }
    });
  } else {
    let userObj = {
      firstname,
      lastname,
      username,
      email,
      admin: false,
      highestScore: 0,
      password,
    };
    let form = new userModel(userObj);
    form.save((err) => {
      if (err) {
        res.send({
          status: false,
          message: "Account Creation Unsucessful",
          err: err.message,
        });
      } else {
        res.send({ status: true, message: "Account Creation Successful" });
      }
    });
  }
};

const signin = (req, res) => {
  console.log(req.body);
  let { em_username, password } = req.body;
  userModel.findOne(
    { $or: [{ email: em_username }, { username: em_username }] },
    (err, user) => {
      if (err) {
        res.send({
          status: false,
          message: "Internal Server Error, check internet",
        });
      } else {
        if (!user) {
          res.send({
            status: false,
            message: "You might be using the wrong credentials",
          });
        } else {
          user.validatePassword(password, (err, same) => {
            if (err) {
              res.send({
                status: false,
                message: "Validation Issues, contact developer",
              });
            } else {
              if (!same) {
                res.send({
                  message: "Check again, your password is wrong",
                  status: true,
                });
              } else {
                let secret = process.env.JWT_SECRET;
                let sessionToken = jwt.sign({ em_username }, secret);
                res.send({
                  message: "Sign in successful",
                  status: true,
                  sessionToken,
                  id: user._id,
                });
              }
            }
          });
        }
      }
    }
  );
};

const getDashboard = (req, res) => {
  let secret = process.env.JWT_SECRET;
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: false, message: "error" });
    } else {
      let { em_username } = result;
      userModel.findOne(
        { $or: [{ email: em_username }, { username: em_username }] },
        (err, userDetails) => {
          if (err) {
            res.send({
              status: false,
              message: "There has been an error please try logging in again",
            });
          } else {
            let {
              email,
              username,
              firstname,
              lastname,
              highestScore,
              displayPicture,
            } = userDetails;
            res.send({
              status: true,
              message: "user authenticated",
              email,
              username,
              firstname,
              lastname,
              highestScore,
              displayPicture,
            });
          }
        }
      );
    }
  });
};

module.exports = { registerUser, signin, getDashboard };
