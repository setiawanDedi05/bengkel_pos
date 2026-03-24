// Placeholder for user service
const User = require('../models/User');

exports.getAllUsers = async () => {
  // This should fetch users from the database
  return await User.findAll();
};
