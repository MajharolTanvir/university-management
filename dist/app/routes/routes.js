"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const academicSemester_route_1 = require("../modules/AcademicSemester/academicSemester.route");
const academicFaculty_route_1 = require("../modules/AcademicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("../modules/AcademicDepartment/academicDepartment.route");
const student_route_1 = require("../modules/Student/student.route");
const faculty_route_1 = require("../modules/Faculty/faculty.route");
const ManagementDepartment_router_1 = require("../modules/ManagementDepartment/ManagementDepartment.router");
const admin_route_1 = require("../modules/Admin/admin.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_route_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculty',
        route: academicFaculty_route_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-department',
        route: academicDepartment_route_1.AcademicDepartmentRoutes,
    },
    {
        path: '/management-department',
        route: ManagementDepartment_router_1.ManagementDepartmentRoutes,
    },
    {
        path: '/students',
        route: student_route_1.StudentRoutes,
    },
    {
        path: '/faculty',
        route: faculty_route_1.FacultyRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
