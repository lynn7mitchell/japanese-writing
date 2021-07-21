const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  katakana: {
    multipleChoice: {
      current: {
        type: Number,
        default: 0,
      },
      highest: {
        type: Number,
        default: 0,
      },
    },
    fillInTheBlank:{
        current:{
            type: Number
        },
        highest:{
            type: Number
        }
    },
  },
  hiragana: {
    multipleChoice: {
      current: {
        type: Number,
        default: 0,
      },
      highest: {
        type: Number,
        default: 0,
      },
    },
    fillInTheBlank:{
        current:{
            type: Number
        },
        highest:{
            type: Number
        }
    },
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
