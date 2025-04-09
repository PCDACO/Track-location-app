import { CarStatusNumber } from '../enums';

export interface CarParams extends RootRequest {
  status: CarStatusNumber;
  onlyNoGps: boolean;
  onlyHasInprogressInspectionSchedule: boolean;
}

export interface CarSwitchDevicePayload {
  gpsDeviceId: string;
  longitude: number;
  latitude: number;
}

export interface CarSwitchDeviceReponse {
  carId: string;
  gpsDeviceId: string;
}

export interface CarStaffResponseList {
  id: string;
  modelId: string;
  modelName: string;
  ownerId: string;
  ownerName: string;
  licensePlate: string;
  color: string;
  seat: number;
  status: string;
  description: string;
  transmissionType: string;
  fuelType: string;
  fuelConsumption: number;
  requiresCollateral: boolean;
  price: number;
  location: Location;
  manufacturer: Manufacturer;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Manufacturer {
  id: string;
  name: string;
}

export interface CarAssignDevicePayload {
  osBuildId: string;
  deviceName: string;
  longtitude: number;
  latitude: number;
}
