import React from 'react'

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
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
