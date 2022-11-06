const router = require('express').Router()

const {add, edit, deleteCourse, allCourses, getCourse} = require('../controllers/course')

router.post('/add', add)
router.get('/get-course/:id', getCourse)
router.get('/all', allCourses)
router.put('/edit/:id', edit)
router.delete('/delete/:id', deleteCourse)

module.exports = router