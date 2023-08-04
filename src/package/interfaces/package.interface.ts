import { PackageTrackingStatus } from './trackingstatus.interface';

export interface Package {
  packageWeight: number;
  packageType: string;
  travellerId: string;
  senderId: string;
  collectorPhone: string;
  collectorEmail: string;
  collectorName: string;
  paymentStatus: boolean;
  trackingStatus: PackageTrackingStatus;
  from: string;
  to: string;
  picture: string;
  packageDescription: string;
  insurance: {
    packageValue: number;
    premium: number;
  };
  distance: number;
  travelTime: string;
  verified: boolean;
  isVerifying: boolean;
  smileUserId: string;
  verificationMessage: string;
  insuranceConsumerId: string;
  insuranceTransactionRef: string;
}
