import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibCampaignMonitor,
  cilSpeedometer,
  cilStar,
  cilUser
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'users',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'clients',
        to: '/users/clients',
      },
      {
        component: CNavItem,
        name: 'bloggers',
        to: '/users/bloggers',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'campagin',
    to: '/campagin',
    icon: <CIcon icon={cibCampaignMonitor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'pending',
        to: '/campagin/pending',
      },
      {
        component: CNavItem,
        name: 'accepted',
        to: '/campagin/accepted',
      },
      {
        component: CNavItem,
        name: 'rejected',
        to: '/campagin/rejected',
      },
      {
        component: CNavItem,
        name: 'compeleted',
        to: '/campagin/compeleted',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'categries',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'categries',
        to: '/categries/categries',
      },
    ],
  },
]

export default _nav
