/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { subscribeToAuthState, syncUserToFirestore } from '../../services/authService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isBlocked: boolean;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isBlocked: false,
  isAdmin: false,
});

const ADMIN_EMAILS = [import.meta.env.VITE_ADMIN_EMAIL, 'admin@roomify.com'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState(async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        setIsAdmin(Boolean(currentUser.email && ADMIN_EMAILS.includes(currentUser.email.toLowerCase())));
        
        try {
          await syncUserToFirestore(currentUser);
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists() && userDoc.data().isBlocked) {
            setIsBlocked(true);
          } else {
            setIsBlocked(false);
          }
        } catch (err) {
          if (import.meta.env.DEV) {
            console.error('Error synchronizing user or checking blocked status', err);
          }

          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            setIsBlocked(userDoc.exists() && userDoc.data().isBlocked === true);
          } catch (statusError) {
            if (import.meta.env.DEV) {
              console.error('Error checking blocked status after synchronization failure', statusError);
            }
            setIsBlocked(false);
          }
        }
      } else {
        setIsBlocked(false);
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isBlocked, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
