const mongoose = require('mongoose');
const Student = require('./models/Student');

mongoose.connect('mongodb://localhost:27017/tempo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Connected to MongoDB');

    // Clear existing data
    await Student.deleteMany();

    // Seed the initial data
    const students =[
        {
          sno: 1,
          name: 'Bala',
          gender : 'Male',
          age: 12,
          avatar: 'https://img.freepik.com/premium-vector/cute-boy-avatar-illustration_637684-31.jpg?w=2000',
          weeks: [
            { weekNumber: 1, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
            { weekNumber: 2, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
            { weekNumber: 3, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
            { weekNumber: 4, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
            { weekNumber: 5, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
            { weekNumber: 6, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
            { weekNumber: 7, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
            { weekNumber: 8, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
            // Add remaining weeks for each student
          ],
        },
        {
          sno: 2,
          name: 'Krishna',
          gender : 'Male',
          age: 12,
          avatar: 'https://img.freepik.com/premium-vector/cute-boy-avatar-illustration_637684-31.jpg?w=2000',
          weeks: [
            { weekNumber: 1, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
            { weekNumber: 2, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
            { weekNumber: 3, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
            { weekNumber: 4, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
            { weekNumber: 5, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
            { weekNumber: 6, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
            { weekNumber: 7, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
            { weekNumber: 8, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
            // Add remaining weeks for each student
          ],
        },
        {
            sno: 3,
            name: 'Rishi',
            gender : 'Male',
            age: 12,
            avatar: 'https://img.freepik.com/premium-vector/cute-boy-avatar-illustration_637684-31.jpg?w=2000',
            weeks: [
              { weekNumber: 1, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 2, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 3, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 4, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 5, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 6, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 7, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 8, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              // Add remaining weeks for each student
            ],
          },
          {
            sno: 4,
            name: 'Aaditya',
            gender : 'Male',
            age: 12,
            avatar: 'https://img.freepik.com/premium-vector/cute-boy-avatar-illustration_637684-31.jpg?w=2000',
            weeks: [
              { weekNumber: 1, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 2, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 3, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 4, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 5, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 6, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 7, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 8, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              // Add remaining weeks for each student
            ],
          },
          {
            sno: 5,
            name: 'Narayan',
            gender : 'Male',
            avatar: 'https://img.freepik.com/premium-vector/cute-boy-avatar-illustration_637684-31.jpg?w=2000',
            age: 12,
            weeks: [
              { weekNumber: 1, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 2, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 3, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 4, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 5, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 6, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 7, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 8, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              // Add remaining weeks for each student
            ],
          },
          {
            sno: 6,
            name: 'Shiva',
            gender : 'Male',
            age: 12,
            avatar: 'https://img.freepik.com/premium-vector/cute-boy-avatar-illustration_637684-31.jpg?w=2000',
            weeks: [
              { weekNumber: 1, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 2, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 3, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 4, expenses: 0, itemsSold: 0, earnings: 0,  profitLoss: 0  },
              { weekNumber: 5, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 6, expenses: 0, itemsSold: 0, earnings: 0,  profitLoss: 0  },
              { weekNumber: 7, expenses: 0, itemsSold: 0, earnings: 0,  profitLoss: 0 },
              { weekNumber: 8, expenses: 0, itemsSold: 0, earnings: 0,  profitLoss: 0  },
              // Add remaining weeks for each student
            ],
          },
          {
            sno: 7,
            name: 'Aruna',
            gender : 'Female',
            age: 12,
            avatar: 'https://img.freepik.com/premium-vector/girl-s-face-with-beautiful-smile-female-avatar-website-social-network_499739-527.jpg?w=2000',
            weeks: [
              { weekNumber: 1, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 2, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 3, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 4, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 5, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 6, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 7, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 8, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              // Add remaining weeks for each student
            ],
          },
          {
            sno: 8,
            name: 'Maya',
            gender : 'Female',
            age: 12,
            avatar: 'https://img.freepik.com/premium-vector/girl-s-face-with-beautiful-smile-female-avatar-website-social-network_499739-527.jpg?w=2000',
            weeks: [
              { weekNumber: 1, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 2, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 3, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 4, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 5, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 6, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 7, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 8, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              // Add remaining weeks for each student
            ],
          },
          {
            sno: 9,
            name: 'Karthi',
            gender : 'Male',
            age: 12,
            avatar: 'https://img.freepik.com/premium-vector/cute-boy-avatar-illustration_637684-31.jpg?w=2000',
            weeks: [
              { weekNumber: 1, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 2, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 3, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 4, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 5, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 6, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 7, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 8, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              // Add remaining weeks for each student
            ],
          },
          {
            sno: 10,
            name: 'Ashok',
            gender : 'Male',
            age: 12,
            avatar: 'https://img.freepik.com/premium-vector/cute-boy-avatar-illustration_637684-31.jpg?w=2000',
            weeks: [
              { weekNumber: 1, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 2, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 3, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 4, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 5, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 6, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0 },
              { weekNumber: 7, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
              { weekNumber: 8, expenses: 0, itemsSold: 0, earnings: 0, profitLoss: 0  },
             
            ],
          },
      
      ]

    await Student.insertMany(students);

    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
