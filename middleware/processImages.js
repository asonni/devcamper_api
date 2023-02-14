/* eslint-disable no-console */
const sharp = require('sharp');

const getMetadata = async () => {
  try {
    const metadata = await sharp('./sammy.png').metadata();
    console.log(metadata);
  } catch (error) {
    console.log(`An error occurred during processing: ${error}`);
  }
};

const resizeImage = async file => {
  try {
    await sharp(file.data)
      .resize({
        width: 150,
        height: 97
      })
      .toFormat('jpeg', { mozjpeg: true })
      .toFile(`${process.env.FILE_UPLOAD_PATH}/${file.name}`);
  } catch (error) {
    console.log(error);
  }
};

const cropImage = async () => {
  try {
    await sharp('./sammy.png')
      .extract({ width: 500, height: 330, left: 120, top: 70 })
      .toFile('sammy-cropped.png');
  } catch (error) {
    console.log(error);
  }
};

const rotateImage = async () => {
  try {
    await sharp('./sammy.png')
      .rotate(33, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile('sammy-rotated.png');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMetadata,
  resizeImage,
  cropImage,
  rotateImage
};
