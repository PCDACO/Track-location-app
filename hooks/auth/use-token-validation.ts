import { useCallback, useState } from 'react';

import { useAuth } from './use-auth';

import { useAuthStore } from '~/store/auth-store';

export const useTokenValidation = () => {
  const { validateTokenMutation } = useAuth();
  const [isValidating, setIsValidating] = useState(false);
  const { accessToken, refreshToken } = useAuthStore();

  const validateToken = useCallback(() => {
    if (!accessToken || !refreshToken || isValidating) {
      return;
    }
    setIsValidating(true);
    validateTokenMutation.mutate(undefined, {
      onSuccess: () => {
        setIsValidating(true);
      },
      onError: () => {
        setIsValidating(false);
      },
    });
  }, [isValidating, refreshToken, accessToken, validateTokenMutation]);

  return {
    isValidating,
    validateToken,
  };
};
