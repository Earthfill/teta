import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ChangePasswordDto, LoginDto, RegisterStaffDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Staff } from './schemas';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as randomstring from 'randomstring';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Staff.name) private staffModel: Model<Staff>,
    private jwtService: JwtService,
  ) {}

  async registration(registerStaffDto: RegisterStaffDto) {
    try {
      // Generate a default random password that starts with 'FIR'
      const defaultPassword =
        'FIR' + randomstring.generate({ length: 6, charset: 'alphanumeric' });

      // Include the generated password in the DTO
      const staffWithPassword = {
        ...registerStaffDto,
        password: defaultPassword,
      };

      const staff = await this.staffModel.create(staffWithPassword);
      return staff;
    } catch (error) {
      if (error.code == 11000) {
        throw new HttpException(
          'This email already exists',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException('Registration Failed', HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const staff = await this.staffModel
        .findOne({ email: loginDto.email })
        .exec();

      if (!staff) {
        throw new HttpException(
          'Invalid parameters, Try signing up',
          HttpStatus.BAD_REQUEST,
        );
      }
      const passwordMatch = await bcrypt.compare(
        loginDto.password,
        staff.password,
      );

      if (!passwordMatch) {
        throw new HttpException('Invalid parameters', HttpStatus.BAD_REQUEST);
      }
      return {
        token: this.jwtService.sign({ staffId: staff._id, name: staff.name }),
      };
    } catch (error) {
      if (error.message && error.status) {
        throw new HttpException(error.message, error.status);
      }
      console.log(error);
      throw new HttpException(
        'Registration failed check your parameters and try again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto, staffId: string) {
    try {
      const { oldPassword, newPassword } = changePasswordDto;

      const staff = await this.staffModel.findById(staffId).exec();

      if (!staff) {
        throw new HttpException(
          'Invalid email, staff not found',
          HttpStatus.NOT_FOUND,
        );
      }

      const passwordMatch = await bcrypt.compare(oldPassword, staff.password);

      if (!passwordMatch) {
        throw new HttpException('Invalid old password', HttpStatus.BAD_REQUEST);
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      staff.password = hashedNewPassword;
      await staff.save();

      return {
        message: 'Password changed successfully',
      };
    } catch (error) {
      if (error.message && error.status) {
        throw new HttpException(error.message, error.status);
      }

      throw new HttpException(
        'Failed to change password, please try again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
