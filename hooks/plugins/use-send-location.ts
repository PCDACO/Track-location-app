import * as SignalR from '@microsoft/signalr';
import * as Location from 'expo-location';
import { useEffect, useRef } from 'react';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useLiveLocation = (carId: string | null) => {
  const connectionRef = useRef<SignalR.HubConnection | null>(null);
  const locationSub = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    if (!carId) return;

    const init = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const connection = new SignalR.HubConnectionBuilder()
        .withUrl(`${API_URL}/location-hub`)
        .withAutomaticReconnect()
        .build();

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
            } catch (err) {
              console.error('Failed to send location:', err);
            }
          }
        );
      } catch (err) {
        console.error('SignalR init failed:', err);
      }
    };

    init();

    return () => {
      locationSub.current?.remove();
      connectionRef.current?.stop();
      console.log('Cleaned up live location tracking');
    };
  }, [carId]);
};
