const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    facebookEntry: {
        type: String,
        required: true,
    },
    twitterEntry: {
        type: String,
        required: true,
    },
    instagramEntry: {
        type: String,
        required: true,
    },
    snapchatEntry: {
        type: String,
        required: true,
    },
    linkedinEntry: {
        type: String,
        required: true,
    },
    tumblrEntry: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('User', userSchema);
