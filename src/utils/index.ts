export const toDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      if (data === null || data instanceof ArrayBuffer) {
        reject();
      } else {
        resolve(data);
      }
    };
    reader.onerror = () => reject();
    reader.readAsDataURL(file);
  });
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
