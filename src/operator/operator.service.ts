import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Operator, OperatorDocument } from './schemas';
import { Model } from 'mongoose';
import { AddOperatorDto, SuspendOperatorDto } from './dto';

@Injectable()
export class OperatorService {
  constructor(
    @InjectModel(Operator.name)
    private operatorModel: Model<OperatorDocument>,
  ) {}

  async getOperatorCustom(customDto: object) {
    try {
      const operators = await this.operatorModel.find(customDto).exec();
      return operators;
    } catch (error) {
      throw new HttpException(
        'Cannot obtain count for operators, try again later',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async addOperator(addOperatorDto: AddOperatorDto) {
    try {
      const newOperator = await this.operatorModel.create(addOperatorDto);
      return newOperator;
    } catch (error) {
      throw new HttpException(
        'Failed to create operator. Please try again later',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllOperators(): Promise<Operator[]> {
    try {
      const allOperators = await this.operatorModel.find().exec();
      return allOperators;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch all operators. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOperatorById(operatorId: string): Promise<Operator> {
    try {
      const operator = await this.operatorModel.findById(operatorId).exec();
      if (!operator) {
        throw new HttpException('Operator not found', HttpStatus.NOT_FOUND);
      }
      return operator;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch operator. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async suspendOperator(
    operatorId: string,
    suspendOperatorDto: SuspendOperatorDto,
  ): Promise<Operator> {
    try {
      const operator = await this.operatorModel.findById(operatorId);
      if (!operator) {
        throw new HttpException('Operator not found', HttpStatus.NOT_FOUND);
      }
      operator.isSuspend = suspendOperatorDto.isSuspend;
      return await operator.save();
    } catch (error) {
      throw new HttpException(
        'Failed to suspend operator',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
