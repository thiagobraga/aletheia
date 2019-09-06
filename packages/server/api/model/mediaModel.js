'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    originalName: {
        type: String,
        required: true
    },
    link: {
        type: String
    }
});

module.exports = mongoose.model('Media', mediaSchema);
