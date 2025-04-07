import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';
import { useLiveLocation } from '~/hooks/plugins/use-send-location';
import { storage } from '~/lib/storage';

const HomeScreen = () => {
  const [carID, setCarID] = React.useState<string>();

  React.useEffect(() => {
    const getCarID = async () => {
      const carID = await storage.getItem('car_id');

      if (carID) {
        setCarID(carID);
      }
    };

    getCarID();
  }, []);

  useLiveLocation(carID ?? '');

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        {carID ? (
          <View className="items-center justify-center gap-4">
            <Text>Thiết bị đã được gắn vào xe</Text>
            <Button onPress={() => router.push('/(screen)/car')}>
              <TextUI>Thay đổi xe đang gắn thiết bị</TextUI>
            </Button>
          </View>
        ) : (
          <View className=" items-center justify-center gap-4">
            <View className=" items-center gap-2">
              <MaterialCommunityIcons name="car-settings" size={60} color="gray" />
              <Text className="text-muted">Chưa chọn xe để gắn thiết bị</Text>
            </View>
            <Button onPress={() => router.push('/(screen)/car')}>
              <TextUI>Vui lòng chọn xe để gắn thiết bị</TextUI>
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
