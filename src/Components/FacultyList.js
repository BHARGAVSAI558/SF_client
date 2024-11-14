import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FacultyList.css';

function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://localhost:5000/api/faculty';

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(API_URL);
      setFaculty(response.data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

  const saveFaculty = async () => {
    try {
      const facultyData = { name, department, position };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, facultyData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, facultyData);
      }

      setName('');
      setDepartment('');
      setPosition('');
      fetchFaculty();
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const editFaculty = (facultyMember) => {
    setEditingId(facultyMember._id);
    setName(facultyMember.name);
    setDepartment(facultyMember.department);
    setPosition(facultyMember.position);
  };

  return (
    <div className="faculty-container">
      <h2 className="faculty-title">Faculty List</h2>
      
      <div className="form-container">
        <div className="input-group">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <input
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="input-field"
          />
          <input
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="input-field"
          />
        </div>

        <button
          onClick={saveFaculty}
          className={editingId ? "update-button" : "add-button"}
        >
          {editingId ? "Update Faculty" : "Add Faculty"}
        </button>
      </div>

      <ul className="faculty-list">
        {faculty.map(member => (
          <li key={member._id} className="faculty-item">
            <div className="faculty-info">
              <span className="faculty-name">{member.name}</span>
              <span className="faculty-department-position">Department: {member.department}, Position: {member.position}</span>
            </div>
            <div className="faculty-actions">
              <button onClick={() => editFaculty(member)} className="edit-button">Edit</button>
              <button onClick={() => deleteFaculty(member._id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacultyList;
