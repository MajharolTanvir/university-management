"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSearchableFields = exports.adminFilterableFields = exports.bloodGroup = exports.gender = void 0;
exports.gender = ['male', 'female'];
exports.bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB=', 'AB-', 'O+', 'O-'];
exports.adminFilterableFields = [
    'searchTerm',
    'id',
    'bloodGroups',
    'email',
    'contactNo',
    'designation',
    'managementDepartment',
    'emergencyContactNo',
];
exports.adminSearchableFields = [
    'id',
    'email',
    'contactNo',
    'name.firstName',
    'name.middleName',
    'name.lastName',
];
