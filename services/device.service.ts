import axiosInstance from '~/configs/axios.config';
import { DeviceResponse } from '~/constants/models/device.model';

export const deviceService = {
  get: {
    detail: async (id: string): Promise<RootResponse<DeviceResponse>> => {
      const response = await axiosInstance.get(`/api/gps-devices/${id}`);
      return response.data;
    },
  },
};
