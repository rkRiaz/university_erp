const router = require("express").Router();

const {
  add,
  edit,
  deletenewRegisteredCourses,
  allRegisteredCourses,
  getRegisteredCoursesById,
  getRegisteredCoursesByStudentId,
  getRegisteredCoursesByStudentIdAndSemseter
} = require("../controllers/registeredCourses");

router.post("/add", add);
router.get("/get-registered-courses-by-id/:id", getRegisteredCoursesById); 
router.get("/get-registered-courses-by-student-id/:id", getRegisteredCoursesByStudentId); 
router.get("/get-registered-course-by-student-id-and-semester/:id/:semester", getRegisteredCoursesByStudentIdAndSemseter); 


router.get("/all", allRegisteredCourses);
router.put("/edit/:id", edit); //id=attendanceId
router.delete("/delete/:id", deletenewRegisteredCourses);//id=attendanceId

module.exports = router;
