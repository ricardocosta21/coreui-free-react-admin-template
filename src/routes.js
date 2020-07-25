import React from 'react';
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));
const RestAPI = React.lazy(() => import('./views/restapi/RestAPI'));
const Stripe = React.lazy(() => import('./views/stripe/Stripe'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
    
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/restapi', name: 'RestAPI', component: RestAPI },
  { path: '/stripe', name: 'Stripe', component: Stripe },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
];

export default routes;
