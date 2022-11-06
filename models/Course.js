const { Schema, model } = require('mongoose')

const courseSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});


const Course = model('Course', courseSchema);
module.exports = Course;