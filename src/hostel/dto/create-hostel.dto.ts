import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsInt,
    IsArray,
  } from 'class-validator';
  
  export class CreateHostelDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
     @IsNotEmpty()
    description: string;
  
    @IsInt()
    @IsNotEmpty()
    price: number;
  
    @IsString()
    @IsNotEmpty()
    banner_img: string;
  
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    images: string[];
  
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    features: string[];
  
    @IsString()
    @IsNotEmpty()
    IsSecuirtyReq: string;
  
    @IsInt()
    @IsOptional()
    security_fee: number;
  
    @IsString()
    @IsNotEmpty()
    contactInfo: string;
  
    @IsString()
    @IsNotEmpty()
    under_zone: string;
  
    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    longitutde: string;

    @IsString()
    @IsNotEmpty()
    latitude: string;

    @IsString()
    @IsNotEmpty()
    rooms: string;
  }
  