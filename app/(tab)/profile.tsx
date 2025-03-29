import { useRouter } from 'expo-router';
import { FunctionComponent } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { useAuthStore } from '~/store/auth-store';

const ProfileScreen: FunctionComponent = () => {
  const router = useRouter();
  const { removeTokens } = useAuthStore();
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Button
        onPress={() => {
          removeTokens();
          router.push('/(auth)/login');
        }}>
        <Text>Đăng xuất</Text>
      </Button>
    </SafeAreaView>
  );
};

export default ProfileScreen;
