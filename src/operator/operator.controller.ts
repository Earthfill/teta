import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OperatorService } from './operator.service';
import { AddOperatorDto, SuspendOperatorDto } from './dto';
import { Operator } from './schemas';

@UseGuards(AuthGuard('jwt'))
@Controller('operator')
export class OperatorController {
  constructor(private operatorService: OperatorService) {}

  @Get('count')
  countOperatorCustom() {
    return this.operatorService.countOperators();
  }

  @Post('custom')
  getOperatorCustom(@Body() customDto: object) {
    return this.operatorService.getOperatorCustom(customDto);
  }

  @Post()
  addOperator(@Body() addOperatorDto: AddOperatorDto): Promise<Operator> {
    return this.operatorService.addOperator(addOperatorDto);
  }

  @Get()
  getAllOperators(): Promise<Operator[]> {
    return this.operatorService.getAllOperators();
  }

  @Get(':id')
  getOperatorById(@Param('id') operatorId: string): Promise<Operator> {
    return this.operatorService.getOperatorById(operatorId);
  }

  @Put('suspend/:id')
  suspendOperator(
    @Param('id') operatorId: string,
    @Body() suspendOperatorDto: SuspendOperatorDto,
  ): Promise<Operator> {
    return this.operatorService.suspendOperator(operatorId, suspendOperatorDto);
  }
}
