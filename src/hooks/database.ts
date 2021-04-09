import { useReducer } from 'react';
import { Note } from '../types';

const INIT = 'INIT' as const;
const ADD_NOTE = 'ADD_NOTE' as const;
const UPDATE_NOTE = 'UPDATE_NOTE' as const;
const DELETE_NOTE = 'DELETE_NOTE' as const;

interface NoteDBState {
  notes: Note[];
}

export const init = (notes: Note[]) => {
  return {
    type: INIT,
    payload: notes,
  };
};

export const addNote = (note: Note) => {
  return {
    type: ADD_NOTE,
    payload: note,
  };
};

export const updateNote = (note: Note) => {
  return {
    type: UPDATE_NOTE,
    payload: note,
  };
};

export const deleteNote = (key: number) => {
  return {
    type: DELETE_NOTE,
    payload: key,
  };
};

type NoteActions =
  | ReturnType<typeof init>
  | ReturnType<typeof addNote>
  | ReturnType<typeof updateNote>
  | ReturnType<typeof deleteNote>;

const reducer = (state: NoteDBState, action: NoteActions): NoteDBState => {
  switch (action.type) {
    case INIT:
      return { notes: action.payload };
    case ADD_NOTE:
      return { notes: [action.payload, ...state.notes] };
    case UPDATE_NOTE:
      return {
        notes: [
          action.payload,
          ...state.notes.filter((note) => note._id !== action.payload._id),
        ],
      };
    case DELETE_NOTE:
      return {
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    default:
      return state;
  }
};

export const useNoteDB = () => useReducer(reducer, { notes: [] });
