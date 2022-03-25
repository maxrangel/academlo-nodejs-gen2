// Models
const { User } = require('../models/user.model');

// Utils
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

exports.userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id, status: 'active' }
  });

  if (!user) {
    return next(new AppError(404, 'User not found with given id'));
  }

  req.user = user;
  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req;

  if (currentUser.id !== +id) {
    return next(new AppError(403, `You can't update other users accounts`));
  }

  next();
});
