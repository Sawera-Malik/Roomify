import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import DesignStudio from './pages/DesignStudio';
import Inspirations from './pages/Inspirations';
import SignIn from './pages/SignIn';
import Studio from './pages/DesignStudio/studio';
import Preview from './pages/DesignStudio/preview';
import { useAuth } from './hooks/useAuth';
import { clearSession } from './services/authService';
import AdminPanel from './pages/Admin';

function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

function BlockedScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5F0] dark:bg-[#1A1814] px-4">
      <div className="text-center max-w-md p-8 bg-white dark:bg-[#252220] rounded-3xl shadow-xl border border-red-200 dark:border-red-900">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Account Blocked</h1>
        <p className="text-[#777777] dark:text-[#999390] mb-6">
          Your account has been blocked by an administrator. You cannot access this application.
        </p>
        <button
          onClick={() => clearSession()}
          className="px-6 py-2 bg-[#252525] text-white dark:bg-[#F7F5F0] dark:text-[#252525] rounded-xl hover:bg-[#B08D57] transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

function AuthLoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5F0] dark:bg-[#1A1814] px-4">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#E0D9CE] border-t-[#B08D57]" />
        <p className="text-sm text-[#777777] dark:text-[#999390]">Opening Roomify...</p>
      </div>
    </div>
  );
}

function PrivateLayout() {
  const { user, loading, isBlocked } = useAuth();

  if (loading) return <Layout />;
  if (!user) return <Navigate replace to="/signin" />;
  if (isBlocked) return <BlockedScreen />;
  
  return <Layout />;
}

function AdminOnly() {
  const { loading, isAdmin } = useAuth();

  if (loading) return <AuthLoadingScreen />;
  return isAdmin ? <AdminPanel /> : <Navigate replace to="/home" />;
}

function PublicOnly() {
  const { user, loading } = useAuth();

  if (loading) return <AuthLoadingScreen />;
  return user ? <Navigate replace to="/home" /> : <SignIn />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<PublicOnly />} />
        <Route element={<PrivateLayout />}>
          <Route index element={<Navigate replace to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="design-studio" element={<DesignStudio />} />
          <Route path="inspirations" element={<Inspirations />} />
          <Route path="admin" element={<AdminOnly />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
