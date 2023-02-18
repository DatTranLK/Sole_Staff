export type OrderStatus = 'DONE' | 'PROCESSING' | 'CANCEL' | 'ACCEPTED';

export interface OrderDtoForStaff{
  data: OrderDto[];
  success: boolean;
  message: string;
  statusCode: number;
}

export interface OrderDto {
  id: number;
  customerName: string;
  createDate: number;
  customerId: number;
  shippingAddress: string;
  paymentMethod: string;
  totalPrice: number;
  orderStatus: OrderStatus;
}

export interface OrderDetailDto{
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  code: string;
  productName: string;
  price: number;
  totalPrice: number;
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
