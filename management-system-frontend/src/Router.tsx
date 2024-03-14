/* eslint-disable linebreak-style */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { Login } from './components/Auth/login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
