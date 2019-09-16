'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    originalname: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Media', mediaSchema);
