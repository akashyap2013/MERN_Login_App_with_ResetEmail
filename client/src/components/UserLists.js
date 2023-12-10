import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRemoveUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h2>User List</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%', margin: 'auto' }}>
        <thead>
          <tr style={{ border: '1px solid #000', padding: '8px', background: '#f2f2f2' }}>
            <th style={{ border: '1px solid #000', padding: '8px' }}>User ID</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Username</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Role</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} style={{ border: '1px solid #000', padding: '8px' }}>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{user._id}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{user.username}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{user.role}</td>
              <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>
                <button
                  style={{
                    backgroundColor: '#FF8958', // Light red color
                    color: '#000', // Text color
                    padding: '5px 10px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onClick={() => handleRemoveUser(user._id)}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#FF0000')} // Dark red on hover
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#FF8958')} // Light red on hover out
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
