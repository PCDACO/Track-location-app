import React, { FunctionComponent, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

const HomeScreen: FunctionComponent = () => {
  const [location, setLocation] = useState<Location.LocationObject>();

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      console.log('Location: ', location);
    };

    getPermissions();
  }, []);
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-4xl font-semibold text-muted">Check location</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
