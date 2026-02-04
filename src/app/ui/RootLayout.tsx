import { Outlet } from 'react-router-dom';
import Header from '../../widgets/Header';

export default function RootLayout() {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center'>
      <Header />
      <main className='layout-width flex-1 p-4 pb-20'>
        <Outlet />
      </main>
    </div>
  );
}
