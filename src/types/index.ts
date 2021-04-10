export interface NoteImage {
  name: string;
  src: string;
}

export interface Note {
  _id: number;
  title: string;
  content: string;
  images: NoteImage[];
  date: Date;
}
