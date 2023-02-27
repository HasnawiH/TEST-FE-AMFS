import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import PostPage from './pages/PostPage';
import UserPage from './pages/UserPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/user" />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'post', element: <PostPage /> },
        { path: 'albums', element: <PostPage /> },
      ],
    },
  ]);

  return routes;
}
