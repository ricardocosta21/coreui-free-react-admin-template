import React from 'react';
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));
const RestAPI = React.lazy(() => import('./views/restapi/RestAPI'));
const Stripe = React.lazy(() => import('./views/stripe/Stripe'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/restapi', name: 'RestAPI', component: RestAPI },
  { path: '/stripe', name: 'Stripe', component: Stripe },
];

export default routes;
