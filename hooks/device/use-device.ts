import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '~/lib/query-key';
import { deviceService } from '~/services/device.service';

export const useGPSDeviceQuery = (id: string) => {
  return useQuery({
    queryKey: [QueryKey.Device.Detail, id],
    queryFn: () => deviceService.get.detail(id),
    enabled: !!id,
    retry: 1,
  });
};
