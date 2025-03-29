import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import LoginForm from '~/components/form/auth/login-form';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { useAuthForm } from '~/hooks/auth/use-auth-form';

const LoginScreen: FunctionComponent = () => {
  const { form } = useAuthForm();
  return (
    <View>
      <LoginForm form={form} />
      <Button>
        <Text>Đăng nhập</Text>
      </Button>
    </View>
  );
};

export default LoginScreen;
