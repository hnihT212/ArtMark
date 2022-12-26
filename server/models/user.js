const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");


const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  orders: [
    {
      type:Schema.Types.ObjectId,
      ref: "Order"
    }
  ],
});

userSchema.pre('save', async function(next){
  if(this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const user = mongoose.model('User', userSchema);

module.exports = user;



