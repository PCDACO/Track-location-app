import '../global.css';
import 'expo-dev-client';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <QueryClientProvider client={new QueryClient()}>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      {/* WRAP YOUR APP WITH ANY ADDITIONAL PROVIDERS HERE */}
      {/* <ExampleProvider> */}

      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ActionSheetProvider>
            <NavThemeProvider value={NAV_THEME[colorScheme]}>
              <Stack screenOptions={SCREEN_OPTIONS}>
                <Stack.Screen name="index" options={TAB_OPTIONS} />
                <Stack.Screen name="(auth)" options={TAB_OPTIONS} />
              </Stack>
            </NavThemeProvider>
          </ActionSheetProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>

      {/* </ExampleProvider> */}
    </QueryClientProvider>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios_from_right', // for android
} as const;

const TAB_OPTIONS = {
  animation: 'fade_from_bottom', // for android
  headerShown: false,
} as const;

// const INDEX_OPTIONS = {
//   headerLargeTitle: true,
//   title: 'NativeWindUI',
//   headerRight: () => <SettingsIcon />,
// } as const;

// function SettingsIcon() {
//   const { colors } = useColorScheme();
//   return (
//     <Link href="/modal" asChild>
//       <Pressable className="opacity-80">
//         {({ pressed }) => (
//           <View className={cn(pressed ? 'opacity-50' : 'opacity-90')}>
//             <Icon name="cog-outline" color={colors.foreground} />
//           </View>
//         )}
//       </Pressable>
//     </Link>
//   );
// }

// const MODAL_OPTIONS = {
//   presentation: 'modal',
//   animation: 'fade_from_bottom', // for android
//   title: 'Settings',
//   headerRight: () => <ThemeToggle />,
// } as const;
