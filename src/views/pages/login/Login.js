import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'
import { fetchBlogger, fetchUser, setToken } from '../../../redux/slices/GetUser'

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const fetchUserData = async (token) => {
    if (!token) return;
    try {
      dispatch(
        fetchUser({ token, email: formData.email })
      );
      dispatch(
        fetchBlogger({ token, email: formData.email })
      );
    } catch (error) {
      console.error("Failed to fetch user:");
    }
  };
  const [loading, setLoading] = useState(false); // Add loading state

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('http://92.113.26.138:8081/api/signin', formData)
      .then((res) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        setLoading(false);
        Toast.fire({
          icon: "success",
          title: 'Login successfully'
        });
        const receivedToken = res.data.token;
        fetchUserData(receivedToken);
        dispatch(setToken(receivedToken));
        navigate('/')

      })
      .catch((err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: err.response.data.errorMessage
        });
        setLoading(false);
      });
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4 text-center">
                <CCardBody>
                  <CForm >
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" name="email" value={formData.email} onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                        <CButton color="primary" className="px-4 mx-auto" onClick={handleLogin}>
                          {loading ? 'loading...' : 'Log in'}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
