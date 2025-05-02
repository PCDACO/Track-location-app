import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { RefreshControl, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';
import CardBasic from '~/components/plugins/card-basic';
import Loading from '~/components/plugins/loading';
import { useCarMutation } from '~/hooks/car/use-car';
import { useGPSDeviceQuery } from '~/hooks/device/use-device';
import { useLiveLocation } from '~/hooks/plugins/use-send-location';
import { storage } from '~/lib/storage';

const HomeScreen = () => {
  const [deviceID, setDeviceID] = React.useState<string>();
  const [isRefetch, setIsRefetch] = React.useState<boolean>(false);

  const { data: deviceData, isLoading, refetch } = useGPSDeviceQuery(deviceID as string);
  const { unassignDeviceMutation } = useCarMutation();

  const handleRefresh = async () => {
    try {
      setIsRefetch(true);
      await refetch();
    } finally {
      setIsRefetch(false);
    }
  };

  const handleUnassignDevice = () => {
    unassignDeviceMutation.mutate(deviceID as string, {
      onSuccess: (response) => {
        ToastAndroid.show(response.message || 'Lỗi ngỡ thiết bị', ToastAndroid.SHORT);
        refetch();
      },
      onError: (error: any) => {
        ToastAndroid.show(error.response.data.message || 'Lỗi ngỡ thiết bị', ToastAndroid.SHORT);
      },
    });
  };

  React.useEffect(() => {
    const getCarID = async () => {
      const deviceID = await storage.getItem('device_id');

      if (deviceID) {
        setDeviceID(deviceID);
      }
    };

    getCarID();
  }, []);

  useLiveLocation(deviceData?.value.carDetail?.id ?? null, !!deviceData?.value);

  if (isLoading) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Loading />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full flex-1 gap-2">
      <ScrollView
        className="h-full flex-1"
        refreshControl={<RefreshControl refreshing={isRefetch} onRefresh={handleRefresh} />}>
        <View className="h-screen flex-1 items-center justify-center gap-4">
          {deviceData?.value && (
            <View className="gap-4 p-4">
              <CardBasic>
                <Text className="text-lg font-bold">Thiết bị GPS</Text>
                <Text>Tên thiết bị: {deviceData?.value.name || 'Không có tên thiết bị'}</Text>
                <Text>OS Build ID: {deviceData?.value.osBuildId || 'Không có OS Build ID'}</Text>
                <Text>Trạng thái: {deviceData?.value.status || 'Không có trạng thái'}</Text>
                <Text>
                  Ngày tạo:{' '}
                  {new Date(deviceData?.value.createdAt).toLocaleDateString() ||
                    'Không có ngày tạo'}
                </Text>
              </CardBasic>

              <CardBasic>
                <Text className="text-lg font-bold">Thông tin xe</Text>
                <Text>Tên xe: {deviceData?.value.carDetail?.modelName || 'Không có tên xe'}</Text>
                <Text>
                  Biển số: {deviceData?.value.carDetail?.licensePlate || 'Không có biển số'}
                </Text>
                <Text>Màu sắc: {deviceData?.value.carDetail?.color || 'Không có màu sắc'}</Text>
                <Text>
                  Truyền động:{' '}
                  {deviceData?.value.carDetail?.transmissionType || 'Không có truyền động'}
                </Text>
                <Text>
                  Nhiên liệu: {deviceData?.value.carDetail?.fuelType || 'Không có nhiên liệu'}
                </Text>
              </CardBasic>

              <CardBasic>
                <Text className="text-lg font-bold">Chủ xe</Text>
                <Text>Họ tên: {deviceData?.value.carDetail?.owner.name || 'Không có họ tên'}</Text>
                <Text>Email: {deviceData?.value.carDetail?.owner.email || 'Không có email'}</Text>
                <Text>SĐT: {deviceData?.value.carDetail?.owner.phone || 'Không có SĐT'}</Text>
                <Text>
                  Địa chỉ: {deviceData?.value.carDetail?.owner.address || 'Không có địa chỉ'}
                </Text>
              </CardBasic>
            </View>
          )}

          {deviceData?.value ? (
            <View className="flex-1 items-center justify-center">
              <View className=" items-center justify-center gap-4">
                <View className=" items-center gap-2">
                  <MaterialCommunityIcons name="car-settings" size={60} color="gray" />
                  <Text className="text-muted">Đã kết nối với thiết bị</Text>
                </View>
                {!deviceData.value.carDetail && (
                  <Button onPress={() => router.push('/(screen)/car')}>
                    <TextUI>Đổi xe gắn thiết bị</TextUI>
                  </Button>
                )}
                <Button onPress={handleUnassignDevice}>
                  <TextUI>Gỡ bỏ thiết bị</TextUI>
                </Button>
              </View>
            </View>
          ) : (
            <View className="flex-1 items-center justify-center">
              <View className=" items-center justify-center gap-4">
                <View className=" items-center gap-2">
                  <MaterialCommunityIcons name="car-settings" size={60} color="gray" />
                  <Text className="text-muted">Chưa chọn xe để gắn thiết bị</Text>
                </View>
                <Button
                  onPress={() =>
                    router.push({
                      pathname: '/(screen)/car',
                    })
                  }>
                  <TextUI>Vui lòng chọn xe để gắn thiết bị</TextUI>
                </Button>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
