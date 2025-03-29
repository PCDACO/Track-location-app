import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import LoginForm from '~/components/form/auth/login-form';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { useAuthForm } from '~/hooks/auth/use-auth-form';

const LoginScreen: FunctionComponent = () => {
  const { form, onSubmit, isLoading } = useAuthForm();
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="gap-10 px-4">
        <LoginForm form={form} />
        <Button onPress={onSubmit} disabled={isLoading}>
          <Text>Đăng nhập</Text>
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;
