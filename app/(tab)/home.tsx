import * as Device from 'expo-device';
import * as Location from 'expo-location';
import React from 'react';
import { FlatList, Text, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CarCard from '~/components/card/car/car-card';
import FieldLayout from '~/components/layouts/field-layout';
import { Button } from '~/components/nativewindui/Button';
import Loading from '~/components/plugins/loading';
import { SearchInput } from '~/components/plugins/search-input';
import { CarStatusNumber } from '~/constants/enums';
import { useCarMutation, useCarStaffQuery } from '~/hooks/car/use-car';
import { translate } from '~/lib/translate';
import { useSearchStore } from '~/store/use-search';

const HomeScreen = () => {
  const [location, setLocation] = React.useState<Location.LocationObject>();
  const [selectedCar, setSelectedCar] = React.useState<string>();

  const { searchKeyword } = useSearchStore();

  const { data, isLoading } = useCarStaffQuery({
    params: {
      index: 1,
      size: 10,
      status: CarStatusNumber.Pending,
      keyword: searchKeyword,
    },
  });
  const { carAssignDeviceMutation } = useCarMutation();

  const carList = data?.value.items || [];

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

  const handleSelectCarCallBack = (id: string) => {
    setSelectedCar(id);
  };

  const onSubmit = () => {
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
        onSuccess: (data) => {
          ToastAndroid.show(data.message || translate.car.success.message, ToastAndroid.SHORT);
        },
        onError: (error: any) => {
          ToastAndroid.show(error.message || translate.car.error.message, ToastAndroid.SHORT);
        },
      }
    );
  };

  return (
    <SafeAreaView className="relative flex-1">
      <View className="h-full w-full gap-2 px-4">
        <FieldLayout label="Tên xe">
          <SearchInput />
        </FieldLayout>

        {isLoading ? (
          <View className="h-full">
            <Loading />
          </View>
        ) : (
          <FlatList
            data={carList}
            keyExtractor={(item) => item.id}
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
              <View className="h-40 items-center justify-center bg-blue-300">
                <Text className="text-muted">Không có dữ liệu</Text>
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
    </SafeAreaView>
  );
};

export default HomeScreen;
