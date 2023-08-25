import { IsBoolean, IsNotEmpty } from 'class-validator';

export class SuspendAgentDto {
  @IsBoolean()
  @IsNotEmpty()
  isSuspend: boolean;
}
