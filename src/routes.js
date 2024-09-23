import React from 'react'
import Compeleted from './views/campagin/compeleted/compeleted'
import Rejected from './views/campagin/rejected/Rejected'
import Pending from './views/campagin/Pending/Pending'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Base

// users 
const clients = React.lazy(() => import('./views/users/Clients/Clients'))
const bloggers = React.lazy(() => import('./views/users/Blogger/Blogger'))
const profile = React.lazy(() => import('./views/users/profile/Profile'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users/clients', name: 'clients', element: clients },
  { path: '/users/bloggers', name: 'bloggers', element: bloggers },
  { path: '/users/profile', name: 'profile', element: profile },
  { path: '/campagin/pending', name: 'pending', element: Pending },
  { path: '/campagin/compeleted', name: 'compeleted', element: Compeleted },
  { path: '/campagin/rejected', name: 'rejected', element: Rejected },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
