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

module.exports = mongoose.models.Note || mongoose.model('Board', BoardSchema);