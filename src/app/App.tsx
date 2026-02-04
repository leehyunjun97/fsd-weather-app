import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import QueryProvider from './providers/QueryProvider';
import Main from '../pages/Main';
import RootLayout from './ui/RootLayout';
import DetailPage from '../pages/Detail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      { path: 'detail/:locationName', element: <DetailPage /> },
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
