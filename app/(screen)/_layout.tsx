import { Stack } from 'expo-router';
import React, { FunctionComponent } from 'react';

const ScreenLayout: FunctionComponent = () => {
  return (
    <Stack>
      <Stack.Screen
        name="car"
        options={{
          title: 'Chọn xe để gán thiết bị',
          headerTitleAlign: 'center',
          animation: 'ios_from_left',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
};

export default ScreenLayout;
