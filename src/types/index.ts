export interface Note {
  _id: number;
  title: string;
  content: string;
  images: File[];
  date: Date;
}

export interface ImageWithPreview {
  file: File;
  src: string;
}
