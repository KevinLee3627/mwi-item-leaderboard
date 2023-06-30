import { Header } from '../components/Header';
import { Outlet } from 'react-router';

export function Home() {
  return (
    <div className='w-full h-full mx-auto'>
      <Header />
      <Outlet />
    </div>
  );
}
