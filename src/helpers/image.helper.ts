// verifica se uma imagem é base64
export const isBase64 = (image: string): boolean => {
  const regex = /^data:image\/[a-z]+;base64,/;
  return regex.test(image);
};
