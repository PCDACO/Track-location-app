import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { FunctionComponent } from 'react';

const MainLayout: FunctionComponent = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" color={color} size={20} />,
          tabBarLabel: 'Home',
          animation: 'shift',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" color={color} size={20} />,
          tabBarLabel: 'Trang cá nhân',
          animation: 'shift',
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
