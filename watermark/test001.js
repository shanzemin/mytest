const watermark = require('jimp-watermark')
const path = require('path')

const ORIGINAL_IMAGE = path.resolve(__dirname, './images/original.jpg')
const LOGO = path.resolve(__dirname, './images/logo.png')

watermark.addWatermark(ORIGINAL_IMAGE, LOGO, {
  ratio: 0.6,
  opacity: 0.6,
  dstPath: path.resolve(__dirname, './images/test001.png')
})
