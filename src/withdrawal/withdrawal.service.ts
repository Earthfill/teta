import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Withdrawal } from './schemas';
import { Model } from 'mongoose';
import { ModifyWithdrawalDto } from './dto';

@Injectable()
export class WithdrawalService {
  constructor(
    @InjectModel(Withdrawal.name) private withdrawalModel: Model<Withdrawal>,
  ) {}

  async countWithdrawalCustom(customDto: object) {
    try {
      const count = await this.withdrawalModel.count(customDto).exec();
      return { count };
    } catch (error) {
      throw new HttpException(
        'Cannot obtain count. Please try again later',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async getWithdrawalCustom(customDto: object) {
    try {
      const withdrawals = await this.withdrawalModel.find(customDto).exec();
      return withdrawals;
    } catch (error) {
      throw new HttpException(
        'Cannot obtain count for wwithdrawals, try again later',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async getAllWithdrawals(): Promise<Withdrawal[]> {
    try {
      const allWithdrawals = await this.withdrawalModel.find().exec();
      return allWithdrawals;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch all withdrawals. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWithdrawalById(withdrawalId: string): Promise<Withdrawal> {
    try {
      const withdrawal = await this.withdrawalModel
        .findById(withdrawalId)
        .exec();
      if (!withdrawal) {
        throw new HttpException('Withdrawal not found', HttpStatus.NOT_FOUND);
      }
      return withdrawal;
    } catch (error) {
      throw new HttpException(
        'Failed tp fetch withdrawal. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async modifyWithdrawalStatus(
    withdrawalId: string,
    modifyWithdrawalDto: ModifyWithdrawalDto,
  ): Promise<Withdrawal> {
    try {
      const withdrawal = await this.withdrawalModel.findById(withdrawalId);
      if (!withdrawal) {
        throw new HttpException('Withdrawal not found', HttpStatus.NOT_FOUND);
      }
      withdrawal.status = modifyWithdrawalDto.status;
      return await withdrawal.save();
    } catch (error) {
      throw new HttpException(
        'Failed to update withdrawal status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
