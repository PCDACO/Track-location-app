import { create } from 'zustand';

import { CarStatusNumber } from '~/constants/enums';
import { CarParams } from '~/constants/models/car.model';

type ParamsStore<T> = {
  params: T;
  setParams: (params: T) => void;
  resetParams: () => void;
};

export function createParamsStore<T>(initialParams: T) {
  return create<ParamsStore<T>>((set) => ({
    params: initialParams,
    setParams: (params) => set({ params }),
    resetParams: () => set({ params: initialParams }),
  }));
}

export const useCarParamsStore = createParamsStore<Partial<CarParams>>({
  status: CarStatusNumber.Pending,
});
