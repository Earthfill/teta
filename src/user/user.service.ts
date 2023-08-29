import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers(): Promise<User[]> {
    try {
      const allUsers = await this.userModel.find().exec();
      return allUsers;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch all users. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(userId: string): Promise<User> {
    try {
      const user = await this.userModel.findById(userId).exec();
      return user;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Failed to fetch user. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
