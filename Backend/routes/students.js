const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving students' });
  }
});

// Get a specific student by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving student' });
  }
});

// Update weekly data for a specific student
router.put('/:id/weeks/:weekNumber', async (req, res) => {
  const { id, weekNumber } = req.params;
  const { expenses, itemsSold, earnings } = req.body;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const weekIndex = student.weeks.findIndex((week) => week.weekNumber === +weekNumber);
    if (weekIndex === -1) {
      return res.status(404).json({ error: 'Week not found for the student' });
    }

    const updatedExpenses = +expenses;
    const updatedEarnings = +earnings;
    const profitLoss = updatedEarnings - updatedExpenses;

    student.weeks[weekIndex].expenses = updatedExpenses;
    student.weeks[weekIndex].itemsSold = +itemsSold;
    student.weeks[weekIndex].earnings = updatedEarnings;
    student.weeks[weekIndex].profitLoss = profitLoss;

    await student.save();

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error updating student week data' });
  }
});





// Delete a student
router.delete('/:id/weeks/:weekNumber', async (req, res) => {
  const { id, weekNumber } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const weekIndex = student.weeks.findIndex((week) => week.weekNumber === +weekNumber);
    if (weekIndex === -1) {
      return res.status(404).json({ error: 'Week not found for the student' });
    }

    // Update the week entry fields to zero
    student.weeks[weekIndex].expenses = 0;
    student.weeks[weekIndex].itemsSold = 0;
    student.weeks[weekIndex].earnings = 0;
    student.weeks[weekIndex].profitLoss = 0;

    await student.save();

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error updating week entry' });
  }
});



module.exports = router;
