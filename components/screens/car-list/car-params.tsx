import { MaterialIcons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';

import FieldLayout from '~/components/layouts/field-layout';
import { CarStatusNumber } from '~/constants/enums';
import { useCarParamsStore } from '~/store/use-params';
import { COLORS } from '~/theme/colors';

interface CarParamsProps {
  close: () => void;
}

interface FilterItemProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const FilterItem: FunctionComponent<FilterItemProps> = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    className={`flex-1 items-center justify-center rounded-lg border py-2
      ${isActive ? 'border-primary bg-primary' : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-300'}
    `}
    onPress={onPress}>
    <Text className={`${isActive ? 'font-bold text-white dark:text-black' : 'text-black'}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

const CarParams: FunctionComponent<CarParamsProps> = ({ close }) => {
  const { params, setParams, resetParams } = useCarParamsStore();

  const statusList = [
    { label: 'Chờ kiểm duyệt ', value: CarStatusNumber.Pending },
    { label: 'Bảo trì', value: CarStatusNumber.Maintain },
  ];
  // Xác nhận & lưu filter
  const handleConfirm = () => {
    close();
  };

  const handleClear = () => {
    resetParams();
    close();
  };

  return (
    <>
      <View className="px-4">
        {/* Chọn nhiên liệu */}

        {/* Chọn hộp số */}
        <FieldLayout label="Hộp số" className="mt-4">
          <FlatList
            data={statusList}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <FilterItem
                label={item.label}
                isActive={params.status === item.value}
                onPress={() => setParams({ status: item.value })}
              />
            )}
            numColumns={2}
            columnWrapperStyle={{ gap: 8, marginBottom: 8 }}
            contentContainerStyle={{ gap: 8 }}
          />
        </FieldLayout>
      </View>

      {/* Button xác nhận */}
      <View className="absolute bottom-4 left-0 right-0 flex-row gap-2 px-4">
        <TouchableOpacity
          className="flex-1 items-center justify-center rounded-full bg-primary p-3"
          onPress={handleConfirm}>
          <Text className="font-semibold text-white dark:text-black">Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center justify-center rounded-full border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-slate-300"
          onPress={handleClear}>
          <MaterialIcons name="cleaning-services" color={COLORS.light.grey4} size={20} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CarParams;
