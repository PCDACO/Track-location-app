import * as SignalR from '@microsoft/signalr';
import * as Location from 'expo-location';
import { useEffect } from 'react';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useSendLocation = (carId: string) => {
  useEffect(() => {
    const connection = new SignalR.HubConnectionBuilder()
      .withUrl(`${API_URL}/location-hub`)
      .withAutomaticReconnect()
      .build();

    let subscriber: Location.LocationSubscription;

    const startTracking = async () => {
      await connection.start();

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 2,
        },
        (loc) => {
          connection.invoke('SendLocation', carId, loc.coords.latitude, loc.coords.longitude);
        }
      );
    };

    startTracking();

    return () => {
      subscriber?.remove();
      connection.stop();
    };
  }, []);
};
