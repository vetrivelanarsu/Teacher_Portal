import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Button } from '@mui/material';
import  './StudentDetails.css';
import { NavLink } from 'react-router-dom';

const defaultStyle={textDecoration:'none', color: 'black'}
const activeStyle={textDecoration:'none', color:'red'}

const StudentDetails = () => {
  const { id } = useParams();
  const [studentDetails, setStudentDetails] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [total, setTotal] = useState(2000);
  const [netProfitLoss, setNetProfitLoss] = useState(0);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/${id}`);
        setStudentDetails(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, [id]);

  useEffect(() => {
    if (studentDetails && studentDetails.weeks) {
      const totalExpenses = studentDetails.weeks.reduce((sum, week) => sum + week.expenses, 0);
      setTotal(2000 - totalExpenses);
      if (totalExpenses > 2000) {
        alert('Total expenses exceed the available capital!');
      }

      const totalProfitLoss = studentDetails.weeks.reduce(
        (sum, week) => sum + (parseFloat(week.earnings) || 0) - (parseFloat(week.expenses) || 0),
        0
      );
      setNetProfitLoss(totalProfitLoss);
    }
  }, [studentDetails]);

  const handleEditClick = (week) => {
    setSelectedWeek(week);
    setFormData({
      expenses: week.expenses,
      itemsSold: week.itemsSold,
      earnings: week.earnings,
    });
  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      await axios.put(`http://localhost:5000/api/students/${id}/weeks/${selectedWeek.weekNumber}`, formData);
      setSelectedWeek(null);
      setFormData({});
      // Refresh the student details after the update
      const response = await axios.get(`http://localhost:5000/api/students/${id}`);
      setStudentDetails(response.data);
    } catch (error) {
      console.error('Error updating week details:', error);
    }
  };

  const handleDeleteClick = async (weekNumber) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}/weeks/${weekNumber}`);
      // Refresh the student details after the deletion
      const response = await axios.get(`http://localhost:5000/api/students/${id}`);
      setStudentDetails(response.data);
    } catch (error) {
      console.error('Error deleting week details:', error);
    }
  };

  return (
    <div className="student-details">
        <NavLink to={`/`} 
        style={({isActive})=>{
            return isActive ? activeStyle: defaultStyle;
        }}
      >HOME</NavLink>
      <Typography variant="h2" style={{textAlign:'center'}}>Student Details</Typography>
      

      {studentDetails ? (
        <div style={{textAlign:'center',marginBottom:'60px'}}>
          <img src={studentDetails.avatar} alt="Avatar" className="avatar" />
          <Typography variant="h4">Name: {studentDetails.name}</Typography>
          <Typography variant="body1">Age: {studentDetails.age}</Typography>
          <Typography variant="body1">Gender: {studentDetails.gender}</Typography>
        </div>
      ) : (
        <Typography variant="body1">Loading student details...</Typography>
      )}

      <Typography variant="h5">Total Capital: {total}</Typography>
      <Typography variant="h5">Net Profit/Loss: {netProfitLoss}</Typography>
      {studentDetails && studentDetails.weeks && studentDetails.weeks.length > 0 && (
        <Paper className="weeks-data-table">
          <Typography variant="h3">Weeks Data</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Week Number</TableCell>
                  <TableCell>Expenses</TableCell>
                  <TableCell>Items Sold</TableCell>
                  <TableCell>Earnings</TableCell>
                  <TableCell>Profit/Loss</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentDetails.weeks.map((week) => (
                  <TableRow key={week.weekNumber}>
                    <TableCell>{week.weekNumber}</TableCell>
                    <TableCell>{week.expenses}</TableCell>
                    <TableCell>{week.itemsSold}</TableCell>
                    <TableCell>{week.earnings}</TableCell>
                    <TableCell>{(parseFloat(week.earnings) || 0) - (parseFloat(week.expenses) || 0)}</TableCell>
                    <TableCell>
                      {selectedWeek && selectedWeek.weekNumber === week.weekNumber ? (
                        <div className="overlayy">
                          <div className="edit-formm">
                            <Typography variant="h4">Edit Week Details</Typography>
                            <TextField
                              type="text"
                              name="expenses"
                              value={formData.expenses || ''}
                              onChange={handleInputChange}
                              label="Money Spent"
                            />
                            <TextField
                              type="text"
                              name="itemsSold"
                              value={formData.itemsSold || ''}
                              onChange={handleInputChange}
                              label="Items Sold"
                            />
                            <TextField
                              type="text"
                              name="earnings"
                              value={formData.earnings || ''}
                              onChange={handleInputChange}
                              label="Money Earned"
                            />
                            {/* Calculation for Loss/Profit */}
                            <TextField
                              type="text"
                              value={(formData.earnings || 0) - (formData.expenses || 0)}
                              disabled
                              label="Loss/Profit"
                            />
                            {/* Calculation for Net Loss/Profit at Class Level */}
                            <TextField
                              type="text"
                              value={studentDetails.weeks.reduce(
                                (total, currWeek) =>
                                  total + (parseFloat(currWeek.earnings) || 0) - (parseFloat(currWeek.expenses) || 0),
                                0
                              )}
                              disabled
                              label="Net Loss/Profit at Class Level"
                            />
                            <Button variant="contained" onClick={handleUpdateClick}>
                              Update
                            </Button>
                            <Button variant="outlined" onClick={() => setSelectedWeek(null)} className="cancel">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Button variant="outlined" onClick={() => handleEditClick(week)}>
                            Edit
                          </Button>
                          <Button variant="outlined" onClick={() => handleDeleteClick(week.weekNumber)}>
                            Delete
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
};

export default StudentDetails;
