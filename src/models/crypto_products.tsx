export type CodeName = 'SKU' | 'NIKE' ;

export interface ProductDtoForStaff{
  data: ProductDto[];
  success: boolean;
  message: string;
  statusCode: number;
}

export interface ProductDto {
  id: number;
  code: CodeName;
  name: string;
  amountInStore: number;
  price: number;
  description: string;
  dateCreated: Date;
  amountSold: number;
  isActive: boolean;
}