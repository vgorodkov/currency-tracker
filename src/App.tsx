import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';

export function App() {
  return (
    <>
      <Header />
      <Outlet />
      <h1>Footer</h1>
    </>
  );
}
