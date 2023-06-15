"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const student_constant_1 = require("../Student/student.constant");
const createStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                }),
                middleName: zod_1.z
                    .string({
                    required_error: 'Middle name is required',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required',
                }),
            }),
            gender: zod_1.z.enum([...student_constant_1.gender], {
                required_error: 'Gender is required',
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is required',
            })
                .email(),
            contactNo: zod_1.z.string({
                required_error: 'Contact no is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency number is required',
            }),
            bloodGroup: zod_1.z.enum([...student_constant_1.bloodGroup], {
                required_error: 'Blood group is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: 'Father name is required',
                }),
                fatherOccupation: zod_1.z.string({
                    required_error: 'Father occupation is required',
                }),
                fatherContactNo: zod_1.z.string({
                    required_error: 'Father contact no is required',
                }),
                motherName: zod_1.z.string({
                    required_error: 'Mother name is required',
                }),
                motherOccupation: zod_1.z.string({
                    required_error: 'Mother occupation is required',
                }),
                motherContactNo: zod_1.z.string({
                    required_error: 'Mother contact no is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Address is required',
                }),
            }),
            localGuardian: zod_1.z.object({
                name: zod_1.z.string({
                    required_error: 'Name is required',
                }),
                occupation: zod_1.z.string({
                    required_error: 'Occupation is required',
                }),
                contactNo: zod_1.z.string({
                    required_error: 'Contact is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Address is required',
                }),
            }),
            profile: zod_1.z
                .string({
                required_error: 'Profile is required',
            })
                .optional(),
            academicSemester: zod_1.z.string(),
            academicDepartment: zod_1.z.string(),
            academicFaculty: zod_1.z.string(),
        }),
    }),
});
const createFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        faculty: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                }),
                middleName: zod_1.z
                    .string({
                    required_error: 'Middle name is required',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required',
                }),
            }),
            gender: zod_1.z.enum([...student_constant_1.gender], {
                required_error: 'Gender is required',
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is required',
            })
                .email(),
            contactNo: zod_1.z.string({
                required_error: 'Contact no is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency number is required',
            }),
            bloodGroup: zod_1.z.enum([...student_constant_1.bloodGroup], {
                required_error: 'Blood group is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            designation: zod_1.z.string({
                required_error: 'Designation is required',
            }),
            profile: zod_1.z
                .string({
                required_error: 'Profile is required',
            })
                .optional(),
            academicDepartment: zod_1.z.string(),
            academicFaculty: zod_1.z.string(),
        }),
    }),
});
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        admin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                }),
                middleName: zod_1.z
                    .string({
                    required_error: 'Middle name is required',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required',
                }),
            }),
            gender: zod_1.z.enum([...student_constant_1.gender], {
                required_error: 'Gender is required',
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is required',
            })
                .email(),
            contactNo: zod_1.z.string({
                required_error: 'Contact no is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency number is required',
            }),
            bloodGroup: zod_1.z.enum([...student_constant_1.bloodGroup], {
                required_error: 'Blood group is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            managementDepartment: zod_1.z.string({
                required_error: 'Management department is required',
            }),
            designation: zod_1.z.string({
                required_error: 'Designation is required',
            }),
            profile: zod_1.z
                .string({
                required_error: 'Profile is required',
            })
                .optional(),
        }),
    }),
});
exports.UserValidation = {
    createStudentZodSchema,
    createFacultyZodSchema,
    createAdminZodSchema,
};
