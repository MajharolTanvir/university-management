"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const student_validattion_1 = require("./student.validattion");
const router = express_1.default.Router();
router.get('/', student_controller_1.StudentsController.getAllStudents);
router.get('/:id', student_controller_1.StudentsController.getSingleStudent);
router.delete('/:id', student_controller_1.StudentsController.deleteStudent);
router.patch('/:id', (0, validationRequest_1.default)(student_validattion_1.StudentValidation.updateStudentZodSchema), student_controller_1.StudentsController.updateStudent);
exports.StudentRoutes = router;
