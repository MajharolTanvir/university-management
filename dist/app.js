"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes/routes"));
const http_status_1 = __importDefault(require("http-status"));
// import { generateFacultyId, generateStudentId } from './app/modules/user/user.utils';
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parse
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Application route
app.use('/api/v1', routes_1.default);
//Global error handler
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not found',
        errorMessage: {
            path: req.originalUrl,
            message: 'API Not Found',
        },
    });
    next();
});
exports.default = app;
