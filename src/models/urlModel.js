const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({

    urlCode: {
        type: String,
        trim: true,
        unique:true,
        require:true
    },
    
    longUrl: {
        type: String,
        require:true
    },

    shortUrl: {
        type: String,
        trim: true,
        require: true,
        unique:true
    },

}, { timestamps: true })
module.exports = mongoose.model('Url', urlSchema)