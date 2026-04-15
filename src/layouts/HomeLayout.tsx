import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { AuthProvider } from '../context/AuthContext';
import { SocketProvider } from '../context/SocketContext';

function HomeLayout() {
  return (
    <AuthProvider>
      <SocketProvider>
        <div className="flex min-h-screen bg-surface">
          <Sidebar />
          <div className="flex flex-col flex-1 min-w-0">
            <Header />
            <main className="flex-1 p-6 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SocketProvider>
    </AuthProvider>
  );
}

export default HomeLayout;
