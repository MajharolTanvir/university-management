import initAcademicDepartmentEvents from "../modules/AcademicDepartment/academicDepartment.events"
import initAcademicSemesterEvents from "../modules/AcademicSemester/academicSemester.event"

const subscribeToEvents = () => {
    initAcademicSemesterEvents()
    initAcademicDepartmentEvents()
} 

export default subscribeToEvents