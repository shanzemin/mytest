const Jimp = require('jimp');
const path = require('path')

const ORIGINAL_IMAGE = path.resolve(__dirname, './images/original.jpg')
const LOGO = path.resolve(__dirname, './images/logo.png')

const LOGO_MARGIN_PERCENTAGE = 1

const FILENAME = path.resolve(__dirname, './images/test.png')

const main = async () => {
  const [image, logo] = await Promise.all([
    Jimp.read(ORIGINAL_IMAGE),
    Jimp.read(LOGO)
  ]);
  console.log('---image---', image.bitmap.width, image.bitmap.height);
  console.log('---logo---', logo.bitmap.width, logo.bitmap.height);

  logo.resize(image.bitmap.width / 10, Jimp.AUTO);

  const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
  const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
  console.log('---margin---', xMargin, yMargin);

  const X = image.bitmap.width - logo.bitmap.width - xMargin;
  const Y = image.bitmap.height - logo.bitmap.height - yMargin;
  console.log('---x, y---', X, Y);

  return image.composite(logo, X, Y, [
    {
      mode: Jimp.BLEND_SCREEN,
      opacitySource: 0.1,
      opacityDest: 1
    }
  ]);
};

main()
  .then(image => image.write(FILENAME));