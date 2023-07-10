const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    highestScore: Number,
    displayPicture: String,
    username:{type: String, required:true, unique:true},
    email:{type: String, required:true, unique:true},
    password: {type:String, required: true},
    admin:{type:Boolean, required: true}
});

let saltround = 5;
userSchema.pre("save", function(next){
    // console.log(this.password)
    bcrypt.hash(this.password, saltround, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            this.password=result;
            next();
        }
    } )
})

userSchema.methods.validatePassword = function(password,callback){
    console.log(this, "What the fuck")
    console.log(password)
    bcrypt.compare(password,this.password, (err,same)=>{
        if(!err){
            console.log(err)
            callback(err,same)
        }else{
            console.log("Tire")
            next()
        }
    })
}



const userModel = mongoose.model("quiz_User", userSchema);
module.exports = userModel;