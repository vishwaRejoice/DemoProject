import React, { useState } from 'react'
import { NavLink, Navigate, Route, useNavigate } from 'react-router-dom'
import "./Navbar.scss"
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Modal } from 'react-bootstrap';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../../Assets/Images/logo.png"
import logoimg from "../../../Assets/Images/logoimg.png"
import 'react-toastify/dist/ReactToastify.css';



const Navbar = () => {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading,setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });
  console.log("loggedIn", loggedIn)
  const LoginData = JSON.parse(localStorage?.getItem("login"));
  console.log("sfy", LoginData)
  const handleShow = () => {
    setShow(true);
    setShowLoginModal(false);
  };
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setValues({});
    setShowLoginModal(false);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleLoginShow = () => {
    setShow(true);
    setShowLoginModal(true);
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
    setValues({});
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setValues({ ...values, [name]: newValue });
    setErrors({ ...errors, [name]: "" });
  };
  const staticData = [
    {
      email: "aaa@gmail.com",
      password: "111"
    },
    {
      email: "bbb@gmail.com",
      password: "222"
    }
  ]
  const [staticLoginData, setStaticLoginData] = useState({ staticData })
  console.log("aaa", staticLoginData)

  const aff = JSON.parse(localStorage.getItem("userEmail"));
  const validation = () => {
    let isFormValid = true;
    let errors = {};

    if (!values?.email && values?.email === "") {
      isFormValid = false;
      errors["email"] = "Please enter email!";
    }
    if (!values?.name && values?.name === "") {
      isFormValid = false;
      errors["name"] = "Please enter name!";
    }
    if (!values?.password && values?.password === "") {
      isFormValid = false;
      errors["password"] = "Please enter password!";
    }
    if (values?.phone !== values?.phone) {
      isFormValid = false;
      errors["phone"] = "Please enter phone!";
    }
    if (!values?.confirmPassword && values?.confirmPassword === "") {
      isFormValid = false;
      errors["confirmPassword"] = "Please enter confirmPassword!";
    }
    if (values?.password !== values?.confirmPassword) {
      isFormValid = false;
      errors["password"] = "Please enter password!";
    }
    if (!values?.agreed) {
      isFormValid = false;
      errors["agreed"] = "Please agree to the terms and conditions."
    }

    setErrors(errors);
    return isFormValid;
  }
  console.log("ssss", values)

  const validationForm = () => {
    let isFormValid = false;
    let errors = {};

    if (!values?.email && values?.email === "") {
      errors["email"] = "Please enter email!";
    }
    if (!values?.password && values?.password === "") {
      errors["password"] = "Please enter password!";
    }
    if (values.password == aff?.[0]?.password && values.email == aff?.[0]?.email) {
      isFormValid = true;
    }
    const userExits = staticLoginData?.staticData?.find((item) => item?.email === values?.email && item?.password === values?.password)
    if (userExits) {
      isFormValid = true;
    }
    setErrors(errors);
    return isFormValid;
  };
  console.log("111111", staticLoginData)

  const handleSubmit = (e) => {
    if (validation()) {
      setLoading(true);
      toast.success("User signup successfully")
      const storedData = JSON.parse(localStorage.getItem('userEmail')) || [];
      storedData.push(values);
      localStorage.setItem('userEmail', JSON.stringify(storedData));
      setValues({ email: "", password: "" });
      setShowLoginModal(true);
    }else{
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (validationForm()) {
      setLoading(true);
      toast.success("User logged in successfully")
      localStorage.setItem("login", JSON.stringify(values));
      setShow(false);
      setShowLoginModal(false);
      setStaticLoginData();
      setLoggedIn(true);
      setValues({});
      setErrors({});
      navigate("/");
    } else {
      toast.error('User not found')
      setLoading(false)
    }


  };

  const handleLogout = () => {
    toast.success("User logged out")

    const dataToRemove = {};
    const storedData = JSON.parse(localStorage.getItem('userEmail')) || [];
    const updatedData = storedData.filter(item => {
      return item.email !== dataToRemove.email;
    });
    localStorage.setItem('userEmail', JSON.stringify(updatedData));
    localStorage.removeItem('userEmail');
    localStorage.removeItem('login');
    navigate('/');
    setLoggedIn(false);
  };


  return (
    <>
    <ToastContainer autoClose={500} />
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logoimg} alt="logo" />
        <img src={logo} alt="logo" />
      </div>
      <ul className="navbar-menu">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        {loggedIn || LoginData ? (
          <Button className="loginbtn btn" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button className="loginbtn btn" onClick={handleLoginShow}
            >
              Login
            </Button>
            <Button className="loginbtn" onClick={handleShow}>
              Sign Up
            </Button>
          </>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-danger">{
              showLoginModal ? "LOGIN" : "SIGN UP"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {!showLoginModal && (
                <Form.Group controlId="formBasicUsername" style={{marginTop:"20px"}}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" name='name' onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                    }
                  }} onChange={handleChange} value={values?.name} />
                </Form.Group>
              )}
              <span
                style={{
                  fontSize: "13px",
                  color: "red",
                }}
              >
                {errors?.name}
              </span>
  
              <Form.Group controlId="formBasicEmail" style={{marginTop:"20px"}}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onKeyDown={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }} name='email' onChange={handleChange} value={values?.email} />
              </Form.Group>
              <span
                style={{
                  fontSize: "13px",
                  color: "red",
                }}
              >
                {errors?.email}
              </span>
              {!showLoginModal && (
                <Form.Group controlId="formBasicEmail" style={{marginTop:"20px"}}>
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
              )}
              <span
                style={{
                  fontSize: "13px",
                  color: "red",
                }}
              >
                {errors?.phone}
              </span>

              <Form.Group controlId="formBasicPassword" style={{marginTop:"20px"}}>
                <Form.Label>Password</Form.Label>

                <Form.Control
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                    }
                  }}
                  name='password'
                  onChange={handleChange}
                  value={values?.password} />
                <div className='eye-icon'>
                  {passwordVisible ? (
                    <FaEye
                      className="password-toggle-icon"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEyeSlash
                      className="password-toggle-icon"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>

              </Form.Group>
              <span
                style={{
                  fontSize: "13px",
                  color: "red",
                }}
              >
                {errors?.password}
              </span>
             
              {!showLoginModal && (
                <Form.Group controlId="formBasicPassword" style={{ marginTop: "-30px" }}>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type={confirmPasswordVisible ? 'text' : 'password'} placeholder="Password" onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                    }
                  }} name='confirmPassword' onChange={handleChange}
                    value={values?.confirmPassword} />
                  <div className='eye-icon'>
                    {confirmPasswordVisible ? (
                      <FaEye
                        className="password-toggle-icon"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    ) : (
                      <FaEyeSlash
                        className="password-toggle-icon"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    )}
                  </div>
                </Form.Group>
              )}
              <span
                style={{
                  fontSize: "13px",
                  color: "red",
                }}
              >
                {errors?.confirmPassword}
              </span>
              
              {!showLoginModal && (
                <MDBCheckbox name='agreed' type='checkbox' id='flexCheckDefault' label='I agree to the terms and conditions' onChange={handleChange} checked={values?.agreed} />
              )}
              <span
                style={{
                  fontSize: "13px",
                  color: "red",
                }}
              >
                {errors?.agreed}
              </span>
            </Form>
          </Modal.Body>
          <Modal.Footer>

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {
              showLoginModal ? handleLogin() : handleSubmit();
            }}>
              {showLoginModal ? "LOGIN" : "SIGNUP"}
            </Button>

          </Modal.Footer>
          {showLoginModal ? <p className='footer'>Don't Have An Account? <span onClick={handleShow} style={{ cursor: "pointer" }}>SignUp</span> </p> :
            <p className='footer1'>Already SignUp?<span onClick={handleLoginShow} style={{ cursor: "pointer" }}>Login</span> </p>}
        </Modal>
      </ul>




    </nav>
    </>

  )
}

export default Navbar
