const mongoose = require ('./db');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    facebookEntry: {
        type: String,
        allowNull: true,
    },
    twitterEntry: {
        type: String,
        allowNull: true,
    },
    instagramEntry: {
        type: String,
        allowNull: true,
    },
    snapchatEntry: {
        type: String,
        allowNull: true,
    },
    linkedinEntry: {
          type: String,
          allownull: true,
    },
    tumblrEntry: {
          type: String,
          allownull: true,
    }
     
});

module.exports = mongoose.model('User', userSchema);
