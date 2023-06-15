"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ManagementDepartment_controller_1 = require("./ManagementDepartment.controller");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const ManagementDepartment_validation_1 = require("./ManagementDepartment.validation");
const router = express_1.default.Router();
router.post('/create-management-department', (0, validationRequest_1.default)(ManagementDepartment_validation_1.ManagementDepartmentValidation.createManagementDepartmentZodSchema), ManagementDepartment_controller_1.ManagementDepartmentController.createManagementDepartment);
router.get('/', ManagementDepartment_controller_1.ManagementDepartmentController.getAllManagementDepartment);
router.get('/:id', ManagementDepartment_controller_1.ManagementDepartmentController.getSingleManagementDepartment);
router.delete('/:id', ManagementDepartment_controller_1.ManagementDepartmentController.deleteManagementDepartment);
router.patch('/:id', (0, validationRequest_1.default)(ManagementDepartment_validation_1.ManagementDepartmentValidation.updateManagementDepartmentZodSchema), ManagementDepartment_controller_1.ManagementDepartmentController.updateManagementDepartment);
exports.ManagementDepartmentRoutes = router;
