import { Schema, model } from 'mongoose'
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface'

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, required: true, enum: ['Autumn', 'Summer', 'Fall'] },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: ['01', '02', '03'] },
    startMonth: {
      type: String,
      required: true,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
    endMonth: {
      type: String,
      required: true,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
  },
  {
    timestamps: true,
  }
)

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
)
