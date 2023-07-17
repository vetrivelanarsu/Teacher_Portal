import logo from './logo.svg';
import './App.css';
import TeacherPortal from './TeacherPortal';
import StudentDetails from './StudentDetails';
import  { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
        
        <header className='navbar'>
          <div className='left'>
             Kovela's class
          </div>
          <div className='center'>
            SchoolX
          </div>
          <div className='right'>
             Class's capital: Rs 20000
          </div>

        </header>



       <Routes>
     
        <Route path="/" element={<TeacherPortal />} />
        <Route path="/student/:id" element={<StudentDetails />} />
    
       </Routes>
    </div>
  );
}

export default App;
