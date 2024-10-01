import React from 'react'
import Live from './views/campagin/Live/Live'
import Paid from './views/campagin/Paid/Paid'
import Compeleted from './views/campagin/Compeleted/Compeleted'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const clients = React.lazy(() => import('./views/users/Clients/Clients'))
const bloggers = React.lazy(() => import('./views/users/Blogger/Blogger'))
const profile = React.lazy(() => import('./views/users/profile/Profile'))
const Accepted = React.lazy(() => import('./views/campagin/Accepted/Accepted'))
const Rejected = React.lazy(() => import('./views/campagin/Refused/Refused'))
const Pending = React.lazy(() => import('./views/campagin/Pending/Pending'))
const Done = React.lazy(() => import('./views/campagin/Done/Done'))
const Categries = React.lazy(() => import('./views/Categries/Categries'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users/clients', name: 'clients', element: clients },
  { path: '/users/bloggers', name: 'bloggers', element: bloggers },
  { path: '/users/profile', name: 'profile', element: profile },
  { path: '/campagin/pending', name: 'pending', element: Pending },
  { path: '/campagin/accepted', name: 'accepted', element: Accepted },
  { path: '/campagin/rejected', name: 'rejected', element: Rejected },
  { path: '/campagin/compeleted', name: 'compeleted', element: Compeleted },
  { path: '/campagin/live', name: 'live', element: Live },
  { path: '/campagin/paid', name: 'paid', element: Paid },
  { path: '/campagin/done', name: 'done', element: Done },
  { path: '/categries/categries', name: 'categries', element: Categries },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
