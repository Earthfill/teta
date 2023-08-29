import { IsNotEmpty, IsString } from 'class-validator';

export class ModifyWithdrawalDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
