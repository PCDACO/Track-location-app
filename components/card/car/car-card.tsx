import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { CarStaffResponseList } from '~/constants/models/car.model';

interface CarCardProps {
  car: CarStaffResponseList;
  selectedCarId: string | null;
  onSelectCar: (id: string | null) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, selectedCarId, onSelectCar }) => {
  const isSelected = selectedCarId === car.id;

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(isSelected ? 1.02 : 1, { duration: 200 });
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: isSelected ? '#D1FAE5' : 'white',
  }));

  const onDetail = () => {
    onSelectCar(isSelected ? null : car.id);
  };

  return (
    <Pressable onPress={onDetail} style={{ borderRadius: 8 }}>
      <Animated.View
        style={[animatedStyle]}
        className="rounded-lg border border-muted px-4 py-4 shadow-sm dark:bg-slate-300 dark:shadow-sm">
        {/* Header */}
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-base font-semibold text-black">
              {car.manufacturer.name} - {car.modelName} - {car.licensePlate}
            </Text>
            <Text className="mt-0.5 text-sm text-gray-500">{car.price.toLocaleString()} /ngày</Text>
          </View>
        </View>

        {/* Footer */}
        <View className="mt-2 flex-row items-center justify-between px-4">
          <View className="items-center gap-1">
            <FontAwesome5 name="user-friends" size={20} color="gray" />
            <Text className="text-xs text-gray-700">{car.seat} chỗ</Text>
          </View>
          <View className="items-center gap-1">
            <Feather name="settings" size={20} color="gray" />
            <Text className="text-xs text-gray-700">{car.transmissionType}</Text>
          </View>
          <View className="items-center gap-1">
            <MaterialCommunityIcons name="fuel" size={20} color="gray" />
            <Text className="text-xs text-gray-700">{car.fuelType}</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default CarCard;
