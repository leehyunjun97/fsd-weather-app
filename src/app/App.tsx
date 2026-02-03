import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import QueryProvider from './providers/QueryProvider';
import Header from '../widgets/Header';
import Main from '../pages/Main';

const Layout = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center'>
      <Header />
      <main className='layout-width flex-1 p-4 pb-20'>
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}
