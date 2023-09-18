import initAcademicDepartmentEvents from '../modules/AcademicDepartment/academicDepartment.events';
import initAcademicFacultyEvents from '../modules/AcademicFaculty/academicFaculty.event';
import initAcademicSemesterEvents from '../modules/AcademicSemester/academicSemester.event';

const subscribeToEvents = () => {
  initAcademicSemesterEvents();
  initAcademicDepartmentEvents();
  initAcademicFacultyEvents();
};

export default subscribeToEvents;
