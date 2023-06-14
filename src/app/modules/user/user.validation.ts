import { z } from 'zod';
import { bloodGroup, gender } from '../Student/student.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z
          .string({
            required_error: 'Middle name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact no is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency number is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood group is required',
      }),
      presentAddress: z.string({
        required_error: 'Date of birth is required',
      }),
      permanentAddress: z.string({
        required_error: 'Date of birth is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact no is required',
        }),
        motherName: z.string({
          required_error: 'Mother name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact no is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Name is required',
        }),
        occupation: z.string({
          required_error: 'Occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Contact is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
      profile: z
        .string({
          required_error: 'Profile is required',
        })
        .optional(),
      academicSemester: z.string(),
      academicDepartment: z.string(),
      academicFaculty: z.string(),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
