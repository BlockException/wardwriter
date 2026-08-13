const sharp = require('sharp');
const path = require('path');

const inputPath = path.resolve(__dirname, '../logo.png');
const outputPath = path.resolve(__dirname, 'public/logo.webp');

sharp(inputPath)
  .resize({ width: 128 }) // Adjust width for navbar (128x128 is plenty)
  .webp({ quality: 80 })
  .toFile(outputPath)
  .then(info => {
    console.log('Logo converted successfully:', info);
  })
  .catch(err => {
    console.error('Error converting logo:', err);
  });
