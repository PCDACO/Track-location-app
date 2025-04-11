export interface DeviceResponse {
  id: string;
  osBuildId: string;
  name: string;
  status: string;
  createdAt: Date;
  carDetail: CarDetail;
}

export interface CarDetail {
  id: string;
  modelId: string;
  modelName: string;
  releaseDate: Date;
  color: string;
  licensePlate: string;
  seat: number;
  description: string;
  transmissionId: string;
  transmissionType: string;
  fuelTypeId: string;
  fuelType: string;
  fuelConsumption: number;
  requiresCollateral: boolean;
  price: number;
  terms: string;
  status: string;
  owner: Owner;
  statistics: Statistics;
  location: Location;
  pickupLocation: PickupLocation;
  manufacturer: Manufacturer;
  images: Image[];
  amenities: Amenity[];
  bookings: Booking[];
  contract: Contract;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Booking {
  bookingId: string;
  driverId: string;
  driverName: string;
  avatarUrl: string;
  startTime: Date;
  endTime: Date;
}

export interface Contract {
  id: string;
  terms: string;
  status: string;
  ownerSignatureDate: Date;
  technicianSignatureDate: Date;
  inspectionResults: string;
  gpsDeviceId: string;
}

export interface Image {
  id: string;
  url: string;
  type: string;
  name: string;
}

export interface Location {
  longtitude: number;
  latitude: number;
}

export interface Manufacturer {
  id: string;
  name: string;
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl: string;
}

export interface PickupLocation {
  longitude: number;
  latitude: number;
  address: string;
}

export interface Statistics {
  totalBookings: number;
  totalEarnings: number;
  averageRating: number;
  lastRented: Date;
}
