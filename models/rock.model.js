const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rockSchema = new Schema({
    lastModifiedDate:{
        type: String,
        required: true
    },
    painterName: {
        type: String,
        required: true
    },
    canvasImgData: {
        type: String,
        required: true
    },
    isReported: {
        type: Boolean,
        required: true
    },
    numOfReports: {
        type: Number,
        required: true
    },
    paintedOverName: {
        type: String,
        required: true
    },
    paintedOverId: {
        type: String,
        required: true
    }
});

const Rock = mongoose.model('Rock', rockSchema);

module.exports = Rock;