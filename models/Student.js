const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    student_id: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true 
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
