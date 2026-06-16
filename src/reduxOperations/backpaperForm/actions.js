import {createActions} from 'redux-actions';
import types from './types';

export const {
  setBackPaperExamName,
  setBackPaperSemesters,
  setBackPaperGrades,
  setBackPaperSubjects,
  setBackPaperAmount,
} = createActions(
  types.SET_BACK_PAPER_EXAM_NAME,
  types.SET_BACK_PAPER_SEMESTERS,
  types.SET_BACK_PAPER_GRADES,
  types.SET_BACK_PAPER_SUBJECTS,
  types.SET_BACK_PAPER_AMOUNT,
);
