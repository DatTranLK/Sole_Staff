export type ImageStatus = 'True' | 'False';

export interface ImageDtoForStaff{
  data: ImageDto[];
  success: boolean;
  message: string;
  statusCode: number;
}

export interface ImageDto {
  id: number;
  imgPath: string;
  shoeCheckId: number;
  shoeCheck: string;
  
}