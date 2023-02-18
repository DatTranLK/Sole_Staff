export type ReviewAuthorName = 'dat' | 'linh' | 'bao' | 'trung';

export interface ReviewDtoForStaff{
  data: ReviewDto[];
  success: boolean;
  message: string;
  statusCode: number;
}

export interface ReviewDto {
  productId: number;
  title: string;
  avatar: string;
  staffId: number;
  description: string;
  elements: string;
  isActive: boolean;
  authorName: ReviewAuthorName;
}
// export interface CryptoOrder {
//   id: string;
//   status: CryptoOrderStatus;
//   orderDetails: string;
//   orderDate: number;
//   orderID: string;
//   sourceName: string;
//   sourceDesc: string;
//   amountCrypto: number;
//   amount: number;
//   cryptoCurrency: string;
//   currency: string;
// }
