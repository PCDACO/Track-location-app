export const generateGuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const random = (Math.random() * 16) | 0;
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
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
