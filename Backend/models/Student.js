const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  avatar: { type: String },
  weeks: [
    {
      weekNumber: { type: Number, required: true },
      expenses: { type: Number, default: 0 },
      itemsSold: { type: Number, default: 0 },
      earnings: { type: Number, default: 0 },
      profitLoss: { type: Number, default: 0},
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
