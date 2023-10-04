import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import "../../Components/Header/Navbar.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [entries, setEntries] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState();
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedEntries = localStorage.getItem('userEmail');
    
    console.log("cdscd", storedEntries);
    const parsedEntries = JSON.parse(storedEntries);
    setEntries(parsedEntries);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  console.log("wwwwww", entries)

  const handleAdd = () => {
    setModalOpen(true);
  }
  const handleClose = () => {
    setModalOpen(false);
    setValues({});
    setEditIndex(null);
  }
 const handleAddData = () =>{
  const newData = { ...values };
  const updatedEntries = [...entries, newData];

    localStorage.setItem("userEmail", JSON.stringify(updatedEntries)); 
    setEntries(updatedEntries);
    setValues({phone:"",address:""});
    setModalOpen(false);
    toast.success('Data added successfully')
 };
 const handleEdit = (index) =>{
  setEditIndex(index);
  setValues(entries[index]);
  setModalOpen(true);
 };
 const handleDelete = (index) => {
  if (window.confirm('Are you sure you want to delete this entry?')) {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);

    localStorage.setItem('userEmail', JSON.stringify(updatedEntries));

    setEntries(updatedEntries);
    toast.success('Data delete successfully')
  }
};
const handleEditData = () => {
  if (editIndex !== null) {
    const updatedEntries = [...entries];
    updatedEntries[editIndex] = values;

    localStorage.setItem('userEmail', JSON.stringify(updatedEntries));
    setEntries(updatedEntries);

    setEditIndex(true);
    setValues({ phone: '', address: '' });
    setModalOpen(false);
    toast.success('Data edit successfully')
  }
};

  return (
    <>
    <ToastContainer/>
    <br></br>
      <h3>CRUD TABLE  <Button variant="primary" onClick={handleAdd}>ADD DATA</Button></h3>
      <br></br>
      {/* {
      modalOpen && <>
          wwwww
      </>
     } */}
      <Modal show={modalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "EDIT DATA" : "ADD DATA"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="number" placeholder="Enter phno"
              name='phone'
              onKeyDown={(e) => {
                if (e.key === "e" || e.key === "E" || e.key === "+") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                if (e.target.value.length <= 10) {
                  handleChange(e);
                }
              }}
              value={values?.phone} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter address"
              name='address'
              onChange={(e) => handleChange(e)}
              value={values?.address} />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          {/* <Button variant="primary" onClick={handleAddData}>Add</Button> */}
          <Button variant="primary" onClick={()=>{
              editIndex !== null ? handleEditData() :  handleAddData();
            }}>
            {editIndex !== null ? "EDIT" : "ADD"}
            </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>Index</th>
            <th>Phone No</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {entries?.length > 0 &&
            entries.map((entry, index) => (
              <tr key={index}>
              <td>{index+1}</td>
                <td>{entry.phone}</td>
                <td>{entry.address}</td>
                <td>
                  <Button variant='primary'style={{marginRight:"20px"}} onClick={()=>handleEdit(index)}>Edit</Button>
                  <Button variant='danger' onClick={()=>handleDelete(index)}>Delete</Button>
                </td>
              </tr>
            ))}

        </tbody>
      </Table>
    </>
  )
}

export default Profile
