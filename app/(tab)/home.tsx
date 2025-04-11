import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';
import CardBasic from '~/components/plugins/card-basic';
import Loading from '~/components/plugins/loading';
import { useGPSDeviceQuery } from '~/hooks/device/use-device';
import { useLiveLocation } from '~/hooks/plugins/use-send-location';
import { storage } from '~/lib/storage';

const HomeScreen = () => {
  const [carID, setCarID] = React.useState<string>();
  const [deviceID, setDeviceID] = React.useState<string>();
  const [isRefetch, setIsRefetch] = React.useState<boolean>(false);

  const { data: deviceData, isLoading, refetch } = useGPSDeviceQuery(deviceID as string);

  const handleRefresh = async () => {
    try {
      setIsRefetch(true);
      await refetch();
    } finally {
      setIsRefetch(false);
    }
  };

  React.useEffect(() => {
    const getCarID = async () => {
      const deviceID = await storage.getItem('device_id');
      const carID = await storage.getItem('car_id');

      if (deviceID && carID) {
        setDeviceID(deviceID);
        setCarID(carID);
      }
    };

    getCarID();
  }, []);

  useLiveLocation(carID ?? null);

  if (isLoading) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full flex-1 gap-2">
      <ScrollView
        className="h-full flex-1"
        refreshControl={<RefreshControl refreshing={isRefetch} onRefresh={handleRefresh} />}>
        {deviceData?.value && (
          <View className="gap-4 p-4">
            {/* Device Info */}
            <CardBasic>
              <Text className="text-lg font-bold">Thiết bị GPS</Text>
              <Text>ID: {deviceData?.value.id}</Text>
              <Text>Tên thiết bị: {deviceData?.value.name}</Text>
              <Text>OS Build ID: {deviceData?.value.osBuildId}</Text>
              <Text>Trạng thái: {deviceData?.value.status}</Text>
              <Text>Ngày tạo: {new Date(deviceData?.value.createdAt).toLocaleDateString()}</Text>
            </CardBasic>

            {/* Car Info */}
            <CardBasic>
              <Text className="text-lg font-bold">Thông tin xe</Text>
              <Text>Tên xe: {deviceData?.value.carDetail.modelName}</Text>
              <Text>Biển số: {deviceData?.value.carDetail.licensePlate}</Text>
              <Text>Màu sắc: {deviceData?.value.carDetail.color}</Text>
              <Text>Truyền động: {deviceData?.value.carDetail.transmissionType}</Text>
              <Text>Nhiên liệu: {deviceData?.value.carDetail.fuelType}</Text>
              <Text>Giá thuê: {deviceData?.value.carDetail.price.toLocaleString()}đ/ngày</Text>
            </CardBasic>

            {/* Owner Contact */}
            <CardBasic>
              <Text className="text-lg font-bold">Chủ xe</Text>
              <Text>Họ tên: {deviceData?.value.carDetail.owner.name}</Text>
              <Text>Email: {deviceData?.value.carDetail.owner.email}</Text>
              <Text>SĐT: {deviceData?.value.carDetail.owner.phone}</Text>
              <Text>Địa chỉ: {deviceData?.value.carDetail.owner.address}</Text>
            </CardBasic>
          </View>
        )}
        <View className="flex-1 items-center justify-center">
          <View className=" items-center justify-center gap-4">
            <View className=" items-center gap-2">
              <MaterialCommunityIcons name="car-settings" size={60} color="gray" />
              <Text className="text-muted">Chưa chọn xe để gắn thiết bị</Text>
            </View>
            <Button onPress={() => router.push('/(screen)/car')}>
              <TextUI>Vui lòng chọn xe để gắn thiết bị</TextUI>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
