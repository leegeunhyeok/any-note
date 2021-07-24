import BoxDB from 'bxd';

export const DATABASE_NAME = 'note';
export const VERSION = 1;

export const database = new BoxDB(DATABASE_NAME, VERSION);
