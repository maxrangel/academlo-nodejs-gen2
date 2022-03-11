const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { promisify } = require('util');

// Utils
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

dotenv.config({ path: './config.env' });

exports.validateSession = catchAsync(
  async (req, res, next) => {
    // Extract token from headers
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Bearer token123.split(' ') -> [Bearer, token123]
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError(400, 'Invalid session'));
    }

    // Verify that token is still valid
    const validToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    if (!validToken) {
      return next(new AppError(401, 'Invalid session'));
    }

    // Validate that the id the token contains belongs to a valid user

    // Grant access
    next();
  }
);
