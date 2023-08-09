import { Model } from 'mongoose';

export type IAcademicSemeterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';

export type IAcademicSemesterCodes = '01' | '02' | '03';

export type IAcademicSemeter = {
  title: IAcademicSemesterTitles;
  year: number;
  code: IAcademicSemesterCodes;
  startMonth: IAcademicSemeterMonths;
  endMonth: IAcademicSemeterMonths;
};

export type AcademicSemesterModel = Model<IAcademicSemeter>;
