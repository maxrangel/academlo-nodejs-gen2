// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

exports.userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { status: 'active', id },
    attributes: { exclude: ['password'] }
  });

  if (!user) {
    return next(new AppError(404, 'User is no longer available'));
  }

  req.user = user;

  next();
});

exports.protectUserAccount = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req;

  if (+id !== currentUser.id) {
    return next(new AppError(403, 'You do not own this account'));
  }

  next();
});
