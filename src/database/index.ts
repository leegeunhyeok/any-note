import BoxDB, { BoxModel } from 'bxd';

const noteScheme = {
  _id: {
    type: BoxDB.Types.NUMBER,
    key: true,
  },
  title: BoxDB.Types.STRING,
  content: BoxDB.Types.STRING,
  images: BoxDB.Types.ARRAY,
  date: BoxDB.Types.DATE,
};

export default class DBManager {
  private static instance: DBManager;
  private box: BoxDB;
  private noteModel: BoxModel<typeof noteScheme>;

  /**
   * Returns instance
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
    if (this.box.isReady()) {
      throw new Error('Database already opened');
    }
    return this.box.open();
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
   * Save note data
   *
   * @param title Note title
   * @param content Note content
   * @param images Attached images
   */
  async addNote(title: string, content: string, images: File[]) {
    const currentDatetime = new Date();
    await this.noteModel.add({
      _id: +currentDatetime,
      title,
      content,
      images,
      date: currentDatetime,
    });
  }

  /**
   * Update target note record
   *
   * @param key Target note key
   * @param title Note title
   * @param content Note content
   * @param images Attached images
   */
  async updateNote(
    key: IDBValidKey,
    title: string,
    content: string,
    images: File[],
  ) {
    await this.noteModel.put({
      _id: key,
      title,
      content,
      images,
      date: new Date(),
    });
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
