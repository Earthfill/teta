import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import {
  ChangePasswordDto,
  LoginDto,
  RegisterStaffDto,
  ForgotPasswordDto,
} from './dto';
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
      const randomString = randomstring.generate({
        length: 6,
        charset: 'alphanumeric',
      });
      const defaultPassword = 'FIR' + randomString;

      registerStaffDto.staffId = defaultPassword;

      // Hash the default password
      const saltRounds = 12; // Customize the number of rounds
      const hashedDefaultPassword = await bcrypt.hash(
        defaultPassword,
        saltRounds,
      );

      // Include the hashed password in the DTO
      const staffWithPassword = {
        ...registerStaffDto,
        password: hashedDefaultPassword,
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

      const saltRounds = 12; // Customize the number of rounds
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
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

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    try {
      const { email } = forgotPasswordDto;

      const staff = await this.staffModel.findOne({ email }).exec();

      if (!staff) {
        console.log('Staff not found for email:', email);
        throw new HttpException(
          'Invalid email, staff not found',
          HttpStatus.NOT_FOUND,
        );
      }

      // Generate a new random password
      const newPassword = randomstring.generate({
        length: 5,
        charset: 'alphanumeric',
      });

      const newPasswordWithPrefix = 'FIR' + newPassword;

      // Hash the new password
      const saltRounds = 12; // Customize the number of rounds
      const hashedNewPassword = await bcrypt.hash(
        newPasswordWithPrefix,
        saltRounds,
      );

      // Update the staff's password in the database
      staff.password = hashedNewPassword;
      await staff.save();

      console.log('Password reset successfully for staff:', staff._id);

      // Return the new password to the user (you may choose to send it via email)
      return {
        message: 'Password reset successfully',
        newPassword: newPasswordWithPrefix,
      };
    } catch (error) {
      if (error.message && error.status) {
        console.log('Error:', error.message);
        throw new HttpException(error.message, error.status);
      }

      console.log('Error:', error);
      throw new HttpException(
        'Failed to reset password, please try again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
