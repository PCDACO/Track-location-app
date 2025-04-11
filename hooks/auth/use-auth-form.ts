import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useAuth } from './use-auth';

import { Role } from '~/constants/enums';
import { AuthPayloads, loginSchema } from '~/constants/schemas/auth.schema';
import { UserService } from '~/services/user.service';
import { useAuthStore } from '~/store/auth-store';

export const useAuthForm = () => {
  const { loginMutation } = useAuth();
  const { setTokens, setIsAuthenticated, removeTokens } = useAuthStore();

  const form = useForm<AuthPayloads>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: async (data) => {
        setTokens(data.value.accessToken, data.value.refreshToken);

        const token = jwtDecode(data.value.accessToken);
        if (token.sub && token.sub !== undefined) {
          await UserService.get
            .detail(token.sub)
            .then((response) => {
              if (response?.value.role === Role.Technician) {
                ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
                setTokens(data.value.accessToken, data.value.refreshToken);

                setIsAuthenticated(true);
                router.push({
                  pathname: '/',
                });
                form.reset();
              } else {
                ToastAndroid.show(
                  'Đây không là tài khoản chuyên viên kỹ thuật',
                  ToastAndroid.SHORT
                );
                setIsAuthenticated(false);
                removeTokens();
              }
            })
            .catch(() => {
              ToastAndroid.show('Đây không là chuyên viên kỹ thuật', ToastAndroid.SHORT);
              removeTokens();
              setIsAuthenticated(false);
            });
        }
      },
      onError: (error: any) => {
        ToastAndroid.show(error, ToastAndroid.BOTTOM);
      },
    });
  });

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
};
