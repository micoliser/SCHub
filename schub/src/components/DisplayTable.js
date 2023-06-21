import { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import '../styles/table.css';

function DisplayTable({
  type,
  data,
  setData,
  allData,
  setAllData,
  handleUpdate,
}) {
  const [deleting, setDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  function handleDelete(e) {
    setDeleting(true);
    setDeleteId(e.target.name);
  }

  function doDelete(e) {
    const id = deleteId;
    setAllData(allData.filter((person) => person.id !== id));
    if (type === 'teacher') {
      setData(data.filter((person) => person.id !== id));
    }
    axios
      .delete(`http://localhost:5000/api/${type}s/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => console.log('Error:', err));
    backFromDelete();
  }

  function backFromDelete() {
    setDeleting(false);
    setDeleteId('');
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          {type === 'student' && <th>Matric No</th>}
          <th>Email</th>
          <th>Department</th>
          {type === 'student' && <th>Level</th>}
          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((person) => {
          return (
            <tr key={person.id}>
              <td>{person.first_name + ' ' + person.last_name}</td>
              {type === 'student' && <td>{person.matric_no}</td>}
              <td>{person.email}</td>
              <td>{person.department}</td>
              {type === 'student' && <td>{person.current_level + '00'}</td>}
              <td>
                <Button
                  name={person.id}
                  onClick={() =>
                    handleUpdate(
                      person.id,
                      `${person.first_name} ${person.last_name}`
                    )
                  }
                  className='update'
                >
                  Update
                </Button>
              </td>
              <td>
                {deleting && deleteId === person.id ? (
                  <div className='deleting'>
                    <p>Are you sure you want to delete {person.first_name}?</p>
                    <Button
                      name='back'
                      onClick={backFromDelete}
                      className='back'
                    >
                      No, Go Back
                    </Button>
                    <Button name='delete' onClick={doDelete} className='delete'>
                      Yes, Delete
                    </Button>
                  </div>
                ) : (
                  <Button
                    name={person.id}
                    onClick={handleDelete}
                    className='delete'
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DisplayTable;
