import axiosInstance from '~/configs/axios.config';
import {
  CarAssignDevicePayload,
  CarParams,
  CarStaffResponseList,
  CarSwitchDevicePayload,
  CarSwitchDeviceReponse,
} from '~/constants/models/car.model';

export const CarService = {
  get: {
    staff_car: async (
      params?: Partial<CarParams>
    ): Promise<RootResponse<Pagination<CarStaffResponseList>>> => {
      try {
        const response = await axiosInstance.get('/api/staff/cars', { params });
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },

  post: {
    assign_device: async (
      id: string,
      payload: CarAssignDevicePayload
    ): Promise<RootResponse<{ id: string }>> => {
      const response = await axiosInstance.post(`/api/cars/${id}/assign-device`, payload);
      return response.data;
    },

    tracking_car: async (id: string, payload: Location): Promise<RootResponse<null>> => {
      const response = await axiosInstance.post(`/api/cars/${id}/tracking`, payload);
      return response.data;
    },

    switch_device: async (
      id: string,
      payload: CarSwitchDevicePayload
    ): Promise<RootResponse<CarSwitchDeviceReponse>> => {
      const response = await axiosInstance.post(`/api/cars/${id}/switch-gps-device`, payload);
      return response.data;
    },
  },

  delete: {
    unassign_device: async (id: string): Promise<RootResponse<null>> => {
      const response = await axiosInstance.delete(`/api/cars/devices/${id}/unassign-gps-device`);
      return response.data;
    },
  },
};
