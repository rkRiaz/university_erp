const { Schema, model } = require('mongoose')

const registeredCoursesSchema = new Schema({
    courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course",
    }],
    semester: {
        type: String,
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
    },
    approved: {
        type: Boolean,
        required: true
    },
    result: [{}]
}, {
    timestamps: true
})

const RegisteredCourses = model('RegisteredCourses', registeredCoursesSchema);
module.exports = RegisteredCourses;