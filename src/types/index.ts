export interface Note {
  title: string;
  content: string;
  images: File[];
}

export interface ImageWithPreview {
  file: File;
  src: string;
}
