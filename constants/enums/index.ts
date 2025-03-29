export enum Role {
  Driver = 'Driver',
  Owner = 'Owner',
  Technician = 'Technician',
}

export enum FinancialReportStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Rejected = 'Rejected',
}

export enum CarStatus {
  Available = 'Available',
  Rented = 'Rented',
  Inactive = 'Inactive',
  Pending = 'Pending',
  Maintain = 'Maintain',
}

export enum CarStatusNumber {
  Inactive = 0,
  Pending = 1,
  Available = 2,
  Rented = 3,
  Maintain = 4,
  Rejected = 5,
}

export enum BookingStatusEnum {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  ReadyForPickup = 'ReadyForPickup',
  Ongoing = 'Ongoing',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Expired = 'Expired',
}
