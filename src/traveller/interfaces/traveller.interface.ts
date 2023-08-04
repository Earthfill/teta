import { TravellerTrackingStatus } from './trackingstatus.interface';

export interface Traveller {
  travelDate: Date;
  travellerId: string;
  packageId: string;
  availableWeight: number;
  travellerDestination: string;
  travellerOrigin: string;
  ticketNumber: string;
  flightNumber: string;
  pickupLocation: string;
  travellerFee: number;
  trackingStatus: TravellerTrackingStatus;
  completed: boolean;
  cancelled: boolean;
  verified: boolean;
  isVerifying: boolean;
  smileUserId: string;
  verificationMessage: string;
}
