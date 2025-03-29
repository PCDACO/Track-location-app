import { View } from 'react-native';

import { ActivityIndicator } from '../nativewindui/ActivityIndicator';

const Loading = () => {
  return (
    <View className="h-full items-center justify-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Loading;
