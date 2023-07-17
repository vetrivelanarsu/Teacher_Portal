import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import './TeacherPortal.css'

import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

const defaultStyle={textDecoration:'none', color: 'red'}
const activeStyle={textDecoration:'none', color:'black'}


const TeacherPortal = () => {
    const [students, setStudents] = useState([]);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [formData, setFormData] = useState({});
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [netProfitLoss, setNetProfitLoss] = useState(0);
    console.log(students)

    useEffect(() => {
        const fetchStudents = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/students');
            setStudents(response.data);
           
          } catch (error) {
            console.error('Error fetching students:', error);
          }
        };
    
        fetchStudents();
      }, []);

        useEffect(() => {
    const calculateNetProfitLoss = () => {
      const totalExpenses = students.reduce((total, student) => {
        return total + student.weeks.reduce((sum, week) => sum + parseFloat(week.expenses || 0), 0);
      }, 0);
      const totalEarnings = students.reduce((total, student) => {
        return total + student.weeks.reduce((sum, week) => sum + parseFloat(week.earnings || 0), 0);
      }, 0);
      setNetProfitLoss(totalEarnings - totalExpenses);
    };

    calculateNetProfitLoss();
  }, [students]);
  
    const handleEditClick = (student, week) => {
        setSelectedStudent(student);
        setSelectedWeek(week);
        setFormData({
          expenses: week.expenses,
          itemsSold: week.itemsSold,
          earnings: week.earnings,
        });
        setEditFormVisible(true);
      };
      
  
      const handleInputChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
      };
      
  
   
      const handleSaveClick = async () => {
        try {
         
          await axios.put(`http://localhost:5000/api/students/${selectedStudent._id}/weeks/${selectedWeek.weekNumber}`, formData);
          
         
          const response = await axios.get(`http://localhost:5000/api/students/${selectedStudent._id}`);
          const updatedStudent = response.data;
      
         
          setStudents((prevStudents) =>
            prevStudents.map((student) =>
              student._id === selectedStudent._id ? updatedStudent : student
            )
          );
      
         
          setEditFormVisible(false);
          setSelectedStudent(null);
          setSelectedWeek(null);
          setFormData({});
        } catch (error) {
          console.error('Error creating week entry:', error);
        }
      };
      
    
      const handleCancelClick = () => {
        // Reset the form and selected values
        setEditFormVisible(false);
        setSelectedStudent(null);
        setSelectedWeek(null);
        setFormData({});
      };
  
  
    return (
      <Box>
       <TableContainer component={Paper}>
       {netProfitLoss > 0 ? (<h1 style={{paddingLeft:'30px'}}>Total Net Profit of the Class: {netProfitLoss}</h1> ): (<h1 style={{paddingLeft:'30px'}}>Total Net Loss of the Class: {netProfitLoss}</h1>)}
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Student Name</TableCell>
        {Array.from({ length: 8 }, (_, i) => i + 1).map((week) => (
          <TableCell key={week}>Week {week}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
  {students.map((student) => (
    <TableRow key={student._id}>
      <TableCell>
        <NavLink to={`/student/${student._id}`} key={student._id}
          style={({isActive})=>{
            return isActive ? activeStyle: defaultStyle;
          }}
        ><h3>{student.name}</h3></NavLink>
      </TableCell>
      {student.weeks.map((week) => (
        <TableCell key={week.weekNumber}>
          <Button variant="outlined" onClick={() => handleEditClick(student, week)}>
            Edit
          </Button>
        </TableCell>
      ))}
    </TableRow>
  ))}
</TableBody>

  </Table>
</TableContainer>

{isEditFormVisible && selectedStudent && selectedWeek && (
  <div className="overlay">
    <Box className="edit-form">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Money Spent</TableCell>
              <TableCell>Items Sold</TableCell>
              <TableCell>Money Earned</TableCell>
              <TableCell>Loss/Profit</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  name="expenses"
                  value={formData.expenses || ''}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="itemsSold"
                  value={formData.itemsSold || ''}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="earnings"
                  value={formData.earnings || ''}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>{/* Calculation for Loss/Profit */}</TableCell>
            
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2}>
        <Button variant="contained" onClick={handleSaveClick}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleCancelClick} sx={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Box>
    </Box>
  </div>
)}


      </Box>
    );
  };
  
  export default TeacherPortal;

  // {/* <TableCell>{/* Calculation for Loss/Profit */}</TableCell> */}
            




  

  // 