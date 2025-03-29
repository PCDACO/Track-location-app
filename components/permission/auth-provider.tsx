import { Redirect } from 'expo-router';
import * as React from 'react';

import { useAuthStore } from '~/store/auth-store';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isAuthenticated, validateToken } = useAuthStore();

  React.useEffect(() => {
    validateToken();
  }, []);

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
};

export default AuthProvider;
