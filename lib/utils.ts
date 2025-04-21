import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
export const generateGuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const random = (Math.random() * 16) | 0;
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
};

export const generateGuidCrypto = async (): Promise<string> => {
  const bytes = await Crypto.getRandomBytesAsync(16);

  // Set version to 4 => xxxx-xxxx-4xxx
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  // Set variant to 10xxxxxx => xxxx-xxxx-xxxx-yxxx
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = bytes.map((b) => b.toString(16).padStart(2, '0') as any);

  return (
    hex.slice(0, 4).join('') +
    '-' +
    hex.slice(4, 6).join('') +
    '-' +
    hex.slice(6, 8).join('') +
    '-' +
    hex.slice(8, 10).join('') +
    '-' +
    hex.slice(10, 16).join('')
  );
};

export const saveIdToSecureStore = async (key: string, id: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, id);
  } catch (error) {
    console.error('Error saving ID to secure store:', error);
  }
};

export const switchIdToSecureStore = async (key: string, id: string): Promise<void> => {
  try {
    const currentId = await SecureStore.getItemAsync(key);
    if (currentId) {
      await SecureStore.deleteItemAsync(key);
    }
    await SecureStore.setItemAsync(key, id);
  } catch (error) {
    console.error('Error saving ID to secure store:', error);
  }
};

export const getIdFromSecureStore = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('Error getting ID from secure store:', error);
    return null;
  }
};

export const removeIdFromSecureStore = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Error removing ID from secure store:', error);
  }
};

export const formatNumber = (value: string | number): string => {
  const numericValue = value.toString().replace(/\D/g, '');
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const createFormData = (payload: Record<string, File[]>) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, files]) => {
    files.forEach((file) => formData.append(key, file));
  });
  return formData;
};

export const withNoCache = (url: string) => `${url}?ts=${Date.now()}`;
