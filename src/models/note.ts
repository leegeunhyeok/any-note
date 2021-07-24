import BoxDB, { BoxData } from 'bxd';
import { database } from '../database';

const noteSchema = {
  _id: {
    type: BoxDB.Types.NUMBER,
    key: true,
  },
  title: BoxDB.Types.STRING,
  content: BoxDB.Types.STRING,
  images: BoxDB.Types.ARRAY,
  date: BoxDB.Types.DATE,
} as const;

const Note = database.box('note', noteSchema);

export type NoteType = BoxData<typeof noteSchema>;
export default Note;
