import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import StudentList from './Components/StudentList';
import FacultyList from './Components/FacultyList';
import DataUpload from './Components/DataUpload';

function App() {
  return (
    <Router>
      <div>
        <h1 align="center">Student Management System</h1>
        <NavBar />
        <Routes>
          <Route path="/student" element={<StudentList />} />
          <Route path="/faculty" element={<FacultyList />} />
          <Route path="/upload" element={<DataUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
