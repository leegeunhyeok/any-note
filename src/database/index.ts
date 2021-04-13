import BoxDB, { BoxModel } from 'bxd';
import { Note } from '../types';

export const noteScheme = {
  _id: {
    type: BoxDB.Types.NUMBER,
    key: true,
  },
  title: BoxDB.Types.STRING,
  content: BoxDB.Types.STRING,
  images: BoxDB.Types.ARRAY,
  date: BoxDB.Types.DATE,
} as const;

export type NoteModel = BoxModel<typeof noteScheme>;

export default class DBManager {
  private static instance: DBManager;
  private box: BoxDB;
  private noteModel: NoteModel;

  /**
   * Returns instancew
   *
   * @returns DBManager instance
   */
  static getInstance() {
    if (!DBManager.instance) {
      DBManager.instance = new DBManager('daily-note', 1);
    }
    return DBManager.instance;
  }

  /**
   * Private constructor for singleton
   *
   * @param name Database name
   * @param version Target version
   */
  private constructor(name: string, version: number) {
    const box = new BoxDB(name, version);
    this.noteModel = box.model('note', noteScheme);
    this.box = box;
  }

  init() {
    return new Promise((resolve, reject) => {
      if (this.box.isReady()) {
        reject(new Error('Database already opened'));
      } else {
        resolve(this.box.open());
      }
    });
  }

  /**
   * Get all notes
   *
   * @returns Notes
   */
  async getNotes() {
    return await this.noteModel.find().get(BoxDB.Order.DESC);
  }

  /**
   * Update target note record
   */
  async putNote(note: Note) {
    await this.noteModel.put(note);
  }

  /**
   * Delete target note
   *
   * @param key Target key
   */
  async deleteNote(key: IDBValidKey) {
    await this.noteModel.delete(key);
  }
}
