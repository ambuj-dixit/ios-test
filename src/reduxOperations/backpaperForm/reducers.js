import {handleActions} from 'redux-actions';

import types from './types';

const initialState = {
  backpaperExamName: [],
  backPaperSemesters: [],
  grades: [],
  backpaperSubjects: [],
  eachSubjectAmount: 0,
};

const admitCardReducer = handleActions(
  {
    [types.SET_BACK_PAPER_EXAM_NAME]: (state, {payload}) => ({
      ...state,
      backpaperExamName: payload,
    }),
    [types.SET_BACK_PAPER_SEMESTERS]: (state, {payload}) => ({
      ...state,
      backPaperSemesters: payload,
    }),
    [types.SET_BACK_PAPER_GRADES]: (state, {payload}) => ({
      ...state,
      grades: payload,
    }),
    [types.SET_BACK_PAPER_SUBJECTS]: (state, {payload}) => ({
      ...state,
      backpaperSubjects: payload,
    }),
    [types.SET_BACK_PAPER_AMOUNT]: (state, {payload}) => ({
      ...state,
      eachSubjectAmount: payload,
    }),
  },
  initialState,
);

export default admitCardReducer;
