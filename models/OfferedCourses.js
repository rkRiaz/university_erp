const { Schema, model } = require('mongoose')

const offeredCoursesSchema = new Schema({
    courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course",
    }],
    semester: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const OfferedCourses = model('OfferedCourses', offeredCoursesSchema);
module.exports = OfferedCourses;