import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import QueryProvider from './providers/QueryProvider';
import MainPage from '../pages/Main';
import RootLayout from './ui/RootLayout';
import DetailPage from '../pages/Detail';
import FavoritesPage from '../pages/Favorites';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      { path: 'detail/:locationName', element: <DetailPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
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
