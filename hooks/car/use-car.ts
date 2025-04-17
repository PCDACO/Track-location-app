import { useMutation, useQuery } from '@tanstack/react-query';

import {
  CarAssignDevicePayload,
  CarParams,
  CarSwitchDevicePayload,
} from '~/constants/models/car.model';
import { QueryKey } from '~/lib/query-key';
import { CarService } from '~/services/car.service';

interface useCarStaffQueryProps {
  params?: Partial<CarParams>;
}

export const useCarStaffQuery = ({ params }: useCarStaffQueryProps) => {
  const carStaffQuery = useQuery({
    queryKey: [QueryKey.Car.GetList, params],
    queryFn: async () => await CarService.get.staff_car(params),
    enabled: !!params,
    retry: 1,
  });

  return carStaffQuery;
};

export const useCarMutation = () => {
  const carAssignDeviceMutation = useMutation({
    mutationKey: [QueryKey.Car.AssignDevice],
    mutationFn: async ({ id, payload }: { id: string; payload: CarAssignDevicePayload }) =>
      await CarService.post.assign_device(id, payload),
  });

  const switchDeviceMutation = useMutation({
    mutationKey: [QueryKey.Car.SwitchDevice],
    mutationFn: async ({ id, payload }: { id: string; payload: CarSwitchDevicePayload }) =>
      await CarService.post.switch_device(id, payload),
  });

  const unassignDeviceMutation = useMutation({
    mutationKey: [QueryKey.Car.UnassignDevice],
    mutationFn: async (id: string) => await CarService.delete.unassign_device(id),
  });

  return {
    carAssignDeviceMutation,
    switchDeviceMutation,
    unassignDeviceMutation,
  };
};
