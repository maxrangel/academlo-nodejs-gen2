// Models
const { User } = require('../models/user.model');
const { Post } = require('../models/post.model');
const { Comment } = require('../models/comment.model');

// Utils
const { filterObj } = require('../util/filterObj');

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  // Nested includes
  const users = await User.findAll({
    where: { status: 'active' },
    include: [
      {
        model: Post,
        include: [
          {
            model: Comment,
            include: [{ model: User }]
          }
        ]
      },
      { model: Comment, include: [{ model: Post }] }
    ]
  });

  res.status(200).json({
    status: 'success',
    data: { users }
  });
});

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    console.log(error);
  }
};

// Save new user
exports.createNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        status: 'error',
        message: 'Must provide a valid name, email and password'
      });
      return;
    }

    // MUST ENCRYPT PASSWORD
    const newUser = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      status: 'success',
      data: { newUser }
    });
  } catch (error) {
    console.log(error);
  }
};

// Update user (patch)
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const data = filterObj(req.body, 'name', 'age');

  // const userIndex = users.findIndex(user => user.id === +id);

  // if (userIndex === -1) {
  // 	res.status(404).json({
  // 		status: 'error',
  // 		message: 'Cant update user, not a valid ID',
  // 	});
  // 	return;
  // }

  // let updatedUser = users[userIndex];

  // updatedUser = { ...updatedUser, ...data };

  // users[userIndex] = updatedUser;

  res.status(204).json({ status: 'success' });
};

// Delete user
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  // const userIndex = users.findIndex(user => user.id === +id);

  // if (userIndex === -1) {
  // 	res.status(404).json({
  // 		status: 'error',
  // 		message: 'Cant delete user, invalid ID',
  // 	});
  // 	return;
  // }

  // users.splice(userIndex, 1);

  res.status(204).json({ status: 'success' });
};
