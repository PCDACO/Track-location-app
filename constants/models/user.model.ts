export interface UserResponse {
  id: string;
  name: string;
  email: string;
  address: string;
  dateOfBirth: Date;
  phone: string;
  role: string;
  avatarUrl: string;
  totalCar: number;
  totalRent: number;
  totalRented: number;
  balance: number;
}

export interface UserPayload {
  name: string;
  email: string;
  address: string;
  dateOfBirth: Date;
  phone: string;
}

export interface UserPasswordPayload {
  oldPassword: string;
  newPassword: string;
}
