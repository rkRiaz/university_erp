
const OfferedCourses = require('../models/OfferedCourses')

exports.allOfferedCourses = async (req, res, next) => {
    try {
        const response = await OfferedCourses.find().populate({path: "courses", model: "Course"})
        return res.status(200).json({
            message: 'Successfully fetched all data',
            result: response.reverse()
        })
    }
    catch(err) {
        next(err)
    }
}

exports.getOfferedCoursesById = async (req, res, next) => {
    const { id } = req.params
    try {
        const response = await OfferedCourses.find({_id: id}).populate({path: "courses", model: "Course"})
        return res.status(200).json({
            message: 'Successfully fetched all data',
            result: response
        })
    }
    catch(err) {
        next(err)
    }
}


exports.add = async (req, res, next) => {
   
    try{
        const response1 = await OfferedCourses.findOne({ semester: req.body.semester})
        if(response1) {
            return res.status(200).json({
                message: "Alredy Offered",
            })
        }
        const newOfferedCourses = new OfferedCourses(req.body)
        let response = await newOfferedCourses.save() 
        res.status(200).json({
            message: "Successfully added",
            result: response
        })
    } catch (e) {
        next(e)
    }
}

exports.edit = async (req, res, next) => {
    // let errors = validationResult(req).formatWith(errorFormatter)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json(errors.mapped())
    // }
    try {
        const { id } = req.params
        const updatedData = req.body;
        const response = await OfferedCourses.findOneAndUpdate({ _id: id }, { $set: updatedData } , {new: true})
        return res.status(200).json({
            message: 'Successfully Updated',
            result: response
        })
    }
    catch(err) {
        next(err)
    }
}

exports.deleteOfferedCourse = async (req, res, next) => {
    try {
        const { id } = req.params
        const response = await OfferedCourses.findOneAndDelete({_id: id})
        return res.status(200).json({
            message: 'Deleted',
            result: response
        })
    }
    catch(err) {
        next(err)
    }
}