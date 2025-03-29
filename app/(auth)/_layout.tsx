import { Stack } from 'expo-router';
import { FunctionComponent } from 'react';

const AuthLayout: FunctionComponent = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default AuthLayout;
