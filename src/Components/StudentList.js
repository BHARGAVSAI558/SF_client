import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentList.css';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const saveStudent = async () => {
    try {
      const studentData = { name, age, grade };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, studentData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, studentData);
      }

      setName('');
      setAge('');
      setGrade('');
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  };

  return (
    <div className="student-container">
      <h2 className="student-title">Student List</h2>
      
      <div className="form-container">
        <div className="input-group">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <input
            placeholder="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input-field"
          />
          <input
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="input-field"
          />
        </div>

        <button
          onClick={saveStudent}
          className={editingId ? "update-button" : "add-button"}
        >
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </div>

      <ul className="student-list">
        {students.map(student => (
          <li key={student._id} className="student-item">
            <div className="student-info">
              <span className="student-name">{student.name}</span>
              <span className="student-age-grade">Age: {student.age}, Grade: {student.grade}</span>
            </div>
            <div className="student-actions">
              <button onClick={() => editStudent(student)} className="edit-button">Edit</button>
              <button onClick={() => deleteStudent(student._id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
