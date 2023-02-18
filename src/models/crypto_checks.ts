export type CheckStatus = 'PROCESSING' | 'CHECKING' | 'CHECKED';
// export type CheckAuthentic = 'PROCESSING' | 'CHECKING' | 'CHECKED';

export interface CheckDtoForStaff{
  data: CheckDto[];
  success: boolean;
  message: string;
  statusCode: number;
}

export interface CheckDto {
  id: number;
  code: number;
  shoeName: string;
  dateSubmitted: Date;
  dateCompletedChecking: Date;
  isAuthentic: boolean;
  isActive: boolean;
  staffId: number;
  customerId: number;
  customerName: string;
  statusChecking: CheckStatus;
}