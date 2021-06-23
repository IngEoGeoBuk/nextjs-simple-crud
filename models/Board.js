const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    conetents: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.Board || mongoose.model('Board', BoardSchema);