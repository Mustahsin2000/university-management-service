import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonts,
  academicSemesterTitles,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    startMonth: z.enum([...academicSemesterMonts] as [string, ...string[]], {
      required_error: 'start Month is needed',
    }),
    endMonth: z.enum([...academicSemesterMonts] as [string, ...string[]], {
      required_error: 'end Month is needed',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};

//   await createUserZodSchema.parseAsync(req)
//req-validation
//body --> object
//data --> object
