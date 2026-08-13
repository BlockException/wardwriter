const sharp = require('sharp');
const path = require('path');

const inputPath = path.resolve(__dirname, '../logo.png');
const outputPath = path.resolve(__dirname, 'public/logo.webp');

sharp(inputPath)
  .resize({ width: 128 }) 
  .webp({ quality: 80 })
  .toFile(outputPath)
  .then(info => {
    console.log('Logo converted successfully:', info);
  })
  .catch(err => {
    console.error('Error converting logo:', err);
  });
