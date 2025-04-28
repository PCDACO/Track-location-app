import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CarCard from '~/components/card/car/car-card';
import FieldLayout from '~/components/layouts/field-layout';
import { Button } from '~/components/nativewindui/Button';
import Backdrop from '~/components/plugins/back-drop';
import Loading from '~/components/plugins/loading';
import { SearchInput } from '~/components/plugins/search-input';
import { useBottomSheet } from '~/components/plugins/use-bottom-sheet';
import CarParams from '~/components/screens/car-list/car-params';
import { useCarMutation, useCarStaffQuery } from '~/hooks/car/use-car';
import { storage } from '~/lib/storage';
import { translate } from '~/lib/translate';
import { useCarParamsStore } from '~/store/use-params';
import { useSearchStore } from '~/store/use-search';
import { COLORS } from '~/theme/colors';

const CarScreen = () => {
  const [location, setLocation] = React.useState<Location.LocationObject>();
  const [selectedCar, setSelectedCar] = React.useState<string>();
  const [isRefetch, setIsRefetch] = React.useState<boolean>(false);
  const snapPoints = ['1%', '30%'];

  const { isSheetOpen, handleSnapPress, handleClosePress, handleSheetChange, sheetRef } =
    useBottomSheet({ snapPoints });
  const { params } = useCarParamsStore();

  const { searchKeyword } = useSearchStore();
  const { data, isLoading, refetch } = useCarStaffQuery({
    params: {
      index: 1,
      size: 1000,
      keyword: searchKeyword,
      status: params.status,
      onlyNoGps: true,
      onlyHasInprogressInspectionSchedule: true,
    },
  });
  const { carAssignDeviceMutation } = useCarMutation();

  const carList = data?.value.items || [];

  const handleRefresh = async () => {
    try {
      setIsRefetch(true);
      await refetch();
    } finally {
      setIsRefetch(false);
    }
  };

  React.useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    getPermissions();
  }, []);

  const handleSelectCarCallBack = async (id: string) => {
    setSelectedCar(id);
  };

  const onSubmit = async () => {
    if (!location) {
      ToastAndroid.show('Vui lòng bật GPS', ToastAndroid.SHORT);
      return;
    }

    if (!Device.osBuildId || !Device.deviceName) {
      ToastAndroid.show('Thiết bị không hỗ trợ', ToastAndroid.SHORT);
      return;
    }

    if (!selectedCar) {
      ToastAndroid.show('Vui lòng chọn xe', ToastAndroid.SHORT);
      return;
    }

    carAssignDeviceMutation.mutate(
      {
        id: selectedCar,
        payload: {
          osBuildId: Device.osBuildId,
          deviceName: Device.deviceName,
          latitude: location.coords.latitude,
          longtitude: location.coords.longitude,
        },
      },
      {
        onSuccess: async (data) => {
          await storage.setItem('device_id', data.value.id);
          router.push('/(tab)/home');
          ToastAndroid.show(data.message || translate.car.success.message, ToastAndroid.SHORT);
        },
        onError: (error: any) => {
          ToastAndroid.show(
            error.response.data.message || translate.car.error.message,
            ToastAndroid.SHORT
          );
        },
      }
    );
  };

  return (
    <SafeAreaView className="relative flex-1">
      <View className="h-full w-full gap-2 px-4">
        <FieldLayout label="Tên xe">
          <View className="flex-row items-center gap-2">
            <SearchInput className="flex-1" />
            <TouchableOpacity
              className="items-center justify-center rounded-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-300"
              style={{
                padding: 11,
              }}
              onPress={() => {
                handleSnapPress(1);
              }}>
              <Ionicons name="options-outline" size={20} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </FieldLayout>

        {isLoading ? (
          <View className="h-full">
            <Loading />
          </View>
        ) : (
          <FlatList
            data={carList}
            keyExtractor={(item) => item.id}
            refreshing={isRefetch}
            onRefresh={handleRefresh}
            renderItem={({ item }) => (
              <CarCard
                car={item}
                onSelectCar={(id) => {
                  handleSelectCarCallBack(id || '');
                }}
                selectedCarId={selectedCar || ''}
              />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="h-2" />}
            ListEmptyComponent={
              <View className="h-40 items-center justify-center gap-4">
                <MaterialCommunityIcons name="car-settings" size={60} color="gray" />
                <Text className="text-center text-gray-300">Không có dữ liệu</Text>
              </View>
            }
          />
        )}
      </View>

      <View className="absolute bottom-0 w-full px-4 py-4">
        <Button onPress={onSubmit} disabled={carAssignDeviceMutation.isPending}>
          <Text className="text-white dark:text-black">
            {carAssignDeviceMutation.isPending ? 'Đang xử lý...' : 'Gán thiết bị'}
          </Text>
        </Button>
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        backdropComponent={
          isSheetOpen ? (props) => <Backdrop {...props} onPress={handleClosePress} /> : null
        }
        onChange={handleSheetChange}>
        <BottomSheetView className="relative flex-1 bg-white dark:bg-slate-300">
          <CarParams close={handleClosePress} />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default CarScreen;
