import * as SignalR from '@microsoft/signalr';
import * as Location from 'expo-location';
import { useEffect, useRef } from 'react';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useLiveLocation = (carId: string | null, hasDeviceData: boolean) => {
  const connectionRef = useRef<SignalR.HubConnection | null>(null);
  const locationSub = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    if (!carId || !hasDeviceData) {
      // Clean up if no carId or no device data
      console.log('No carId or no device data');

      connectionRef.current?.stop().catch(() => {});
      locationSub.current?.remove();
      return;
    }

    const init = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const connection = new SignalR.HubConnectionBuilder()
        .withUrl(`${API_URL}/location-hub`)
        .withAutomaticReconnect()
        .configureLogging(SignalR.LogLevel.None) // Disable all logging
        .build();

      // Override the error handler to prevent error logging
      connection.onclose(() => {
        // Silently handle connection close without error logging
      });

      try {
        await connection.start();
        console.log('SignalR connection started');
        connectionRef.current = connection;

        locationSub.current = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
          async (loc) => {
            try {
              await connection.invoke(
                'SendLocationUpdate',
                carId,
                loc.coords.latitude,
                loc.coords.longitude
              );
              console.log('Realtime location sent');
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
              // Stop connection on error
              await connection.stop();
              locationSub.current?.remove();
            }
          }
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // Silently handle initialization errors
      }
    };

    init();

    return () => {
      locationSub.current?.remove();
      connectionRef.current?.stop().catch(() => {
        // Silently handle stop errors
      });
      console.log('Cleaned up live location tracking');
    };
  }, [carId, hasDeviceData]);
};
