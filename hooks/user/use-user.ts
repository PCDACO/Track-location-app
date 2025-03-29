import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '~/lib/query-key';
import { UserService } from '~/services/user.service';

export const useUserQuery = () => {
  const currentUserQuery = useQuery({
    queryKey: [QueryKey.User.Current],
    queryFn: async () => await UserService.get.current(),
    staleTime: 0,
    retry: 2,
  });

  return {
    currentUserQuery,
  };
};
