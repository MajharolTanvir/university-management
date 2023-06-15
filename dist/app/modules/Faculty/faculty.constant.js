"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultySearchableFields = exports.facultyFilterableFields = exports.bloodGroup = exports.gender = void 0;
exports.gender = ['male', 'female'];
exports.bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB=', 'AB-', 'O+', 'O-'];
exports.facultyFilterableFields = [
    'searchTerm',
    'id',
    'bloodGroups',
    'email',
    'contactNo',
    'emergencyContactNo',
];
exports.facultySearchableFields = [
    'id',
    'email',
    'contactNo',
    'name.firstName',
    'name.middleName',
    'name.lastName',
];
