import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/2.jpg'
import { cilAccountLogout } from '@coreui/icons'
import { getAdminLoged, logoutUser } from '../../redux/slices/GetUser'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const TheToken = useSelector(getAdminLoged);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login#/login')
  }

  return (
    <div className='d-flex align-items-center justify-content-center '>
      {TheToken ?
        <CDropdownItem onClick={handleLogout} style={{ cursor: "pointer" }}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
        :
        <CDropdownItem href="/login#/login">
          <CIcon icon={cilAccountLogout} className="me-2" />
          login
        </CDropdownItem>
      }
    </div>
  )
}

export default AppHeaderDropdown
