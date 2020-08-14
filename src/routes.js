import React from 'react';
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));
const Admin = React.lazy(() => import('./views/admin/Admin'));
const Stripe = React.lazy(() => import('./views/stripe/Stripe'));
const Checkout = React.lazy(() => import('./views/stripe/Checkout'));
const PaymentSuccessful = React.lazy(() => import('./views/stripe/PaymentSuccessful'));

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/admin', name: 'Admin', component: Admin },
  { path: '/stripe', name: 'Stripe', component: Stripe },

  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/paymentsuccessful', name: 'PaymentSuccessful', component: PaymentSuccessful },
];

export default routes;
