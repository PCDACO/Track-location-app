import { Redirect } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';

import Loading from '../plugins/loading';

import { useTokenValidation } from '~/hooks/auth/use-token-validation';
import { useAuthStore } from '~/store/auth-store';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const { isValidating, validateToken } = useTokenValidation();
  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  React.useEffect(() => {
    validateToken();
  }, [validateToken]);

  React.useEffect(() => {
    if (!isAuthenticated && !isValidating) {
      setShouldRedirect(true);
    }
  }, [isAuthenticated, isValidating]);

  if (isValidating) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  if (shouldRedirect) {
    return <Redirect href="/(auth)/login" />;
  }

  return <>{children}</>;
};

export default AuthProvider;
