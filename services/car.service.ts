import axiosInstance from '~/configs/axios.config';
import {
  CarAssignDevicePayload,
  CarParams,
  CarStaffResponseList,
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
    ): Promise<RootResponse<null>> => {
      try {
        const response = await axiosInstance.post(`/api/cars/${id}/assign-device`, payload);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
};
