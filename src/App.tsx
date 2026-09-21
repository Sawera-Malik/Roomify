import AppRoutes from './AppRoutes';
import { AuthProvider } from './constants/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
