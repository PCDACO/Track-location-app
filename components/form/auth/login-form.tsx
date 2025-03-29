import Icon from '@expo/vector-icons/Feather';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import FieldLayout from '~/components/layouts/field-layout';
import { Input } from '~/components/layouts/input-with-icon';
import { Text as TextUI } from '~/components/nativewindui/Text';
import { useAuthForm } from '~/hooks/auth/use-auth-form';

interface LoginFormProps {
  form: ReturnType<typeof useAuthForm>['form'];
}

const LoginForm: FunctionComponent<LoginFormProps> = ({ form }) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  return (
    <View className="gap-4">
      <FieldLayout label="Email">
        <Controller
          control={form.control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Nhập email"
              leftIcon={<Icon name="mail" size={20} color="gray" />}
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={field.onChange}
            />
          )}
        />
        {form.formState.errors.email && (
          <TextUI className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </TextUI>
        )}
      </FieldLayout>

      <FieldLayout label="Mật khẩu">
        <Controller
          control={form.control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Nhập mật khẩu"
              leftIcon={<Icon name="lock" size={20} color="gray" />}
              rightIcon={
                <Icon
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="gray"
                  onPress={() => setShowPassword((prev) => !prev)}
                />
              }
              secureTextEntry={!showPassword}
              onChangeText={field.onChange}
            />
          )}
        />
        {form.formState.errors.password && (
          <TextUI className="text-sm text-destructive">
            {form.formState.errors.password.message}
          </TextUI>
        )}
      </FieldLayout>
    </View>
  );
};

export default LoginForm;
