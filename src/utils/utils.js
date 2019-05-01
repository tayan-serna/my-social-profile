export const getCroppedImg = (image, crop) => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );

  return canvas.toDataURL('image/jpg');
};

export const validatePhone = (phone, blur) => {
  const numRegex = blur ? /^(\+\d{1,3})?\s?\d{10}$/g : /^(\+\d{1,3})?\s?\d{1,10}$/g;
  return numRegex.test(phone);
};
