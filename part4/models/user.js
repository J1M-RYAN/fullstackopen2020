const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  blogList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  }],

});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.password;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);

module.exports = User;
