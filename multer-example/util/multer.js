const multer = require('multer');
const path = require('path');

// Utils
const { AppError } = require('./appError');

multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, '..', 'imgs');

    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
      // Return an error
      cb(new AppError(400, 'Must provide an image as a file'));
    }

    // originalname = example2.jpg
    const [name, extension] = file.originalname.split('.');

    const fileName = `${name}-${Date.now()}.${extension}`;

    cb(null, fileName);
  }
});
