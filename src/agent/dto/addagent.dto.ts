import { IsNotEmpty, IsString } from 'class-validator';

export class AddAgentDto {
  @IsString()
  @IsNotEmpty()
  operatorId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
