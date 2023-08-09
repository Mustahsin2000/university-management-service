import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemeter } from './academicSemester.interface';
import { AcademicSemester } from './academicSemesterModel';
import httpStatus from 'http-status';
const createSemester = async (
  payload: IAcademicSemeter,
): Promise<IAcademicSemeter> => {
  //Summer 02 !=== 03
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
