const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    katakana:{
        multipleChoice:{
            highest:{
                type: Number
            }
        },
        fillInTheBlank:{
            highest:{
                type: Number
            }
        },
        unlocked:{
            type: Boolean
        }
    },
    hirigana:{
        multipleChoice:{
            highest:{
                type: Number
            }
        },
        fillInTheBlank:{
            highest:{
                type: Number
            }
        },
        unlocked:{
            type: Boolean
        }
    },
    kanji:{
        multipleChoice:{
            highest:{
                type: Number
            }
        },
        fillInTheBlank:{
            highest:{
                type: Number
            }
        },
        unlocked:{
            type: Boolean
        }
    }
    // image:{

    // }


})

const User = mongoose.model("User", UserSchema);

module.exports = User;
