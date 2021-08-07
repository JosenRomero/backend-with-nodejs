const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    uid: { 
        type: String 
    },
    username: { 
        type: String 
    }
});

module.exports = mongoose.model("User", UserSchema);