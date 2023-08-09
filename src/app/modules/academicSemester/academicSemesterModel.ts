import { Schema, model } from 'mongoose';
import {
  IAcademicSemeter,
  AcademicSemesterModel,
} from './academicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterMonts,
  academicSemesterTitles,
} from './academicSemester.constant';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
const academicSemesterSchema = new Schema<IAcademicSemeter>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonts,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonts,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Semester is already exist!!',
    );
  }
  next();
});

export const AcademicSemester = model<IAcademicSemeter, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema,
);

//handling Same Year and same semester issue

//Data -> check -? same year -> same semester
