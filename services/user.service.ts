import axiosInstance from '~/configs/axios.config';
import { UserResponse } from '~/constants/models/user.model';

export const UserService = {
  get: {
    current: async (): Promise<RootResponse<UserResponse>> => {
      try {
        const response = await axiosInstance.get('/api/users/current');
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },

    detail: async (id: string): Promise<RootResponse<UserResponse>> => {
      try {
        const response = await axiosInstance.get(`/api/users/${id}`);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
};
