import { IsBoolean, IsNotEmpty } from 'class-validator';

export class SuspendOperatorDto {
  @IsBoolean()
  @IsNotEmpty()
  isSuspend: boolean;
}
