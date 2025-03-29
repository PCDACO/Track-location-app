import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  setItem: async (key: string, value: any): Promise<void> => {
    try {
      if (value === undefined || value === null) {
        await AsyncStorage.removeItem(key); // Nếu value undefined/null, xóa key khỏi storage
        return;
      }
      await AsyncStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in AsyncStorage', error);
    }
  },

  getItem: async (key: string): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (typeof value === 'string') {
        return value;
      } else {
        return value != null ? JSON.parse(value) : null;
      }
    } catch (error) {
      console.error('Error getting item from AsyncStorage', error);
      return null;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from AsyncStorage', error);
    }
  },
};

export const checkAsyncStorageAvailable = async () => {
  try {
    await AsyncStorage.setItem('@test_key', 'test_value');
    const value = await AsyncStorage.getItem('@test_key');
    console.log('AsyncStorage is available:', value);
    await AsyncStorage.removeItem('@test_key');
  } catch (error) {
    console.error('AsyncStorage is not available:', error);
  }
};
