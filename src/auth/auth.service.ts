import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { LoginDto, RegisterStaffDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import {JwtService} from '@nestjs/jwt'
import { Staff } from './schemas';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(@InjectModel(Staff.name) private staffModel:Model<Staff>, private jwtService: JwtService){}

    async login(loginDto: LoginDto){
        try {
            const staff = await this.staffModel.findOne({email: loginDto.email}).exec()
            
            if(!staff){
                throw new HttpException('Invalid parameters, Try signing up', HttpStatus.BAD_REQUEST)
            }
            const passwordMatch = await bcrypt.compare(loginDto.password, staff.password);

            if(!passwordMatch){
                throw new HttpException('Invalid parameters', HttpStatus.BAD_REQUEST)
            }
            return {token: this.jwtService.sign({staffId: staff._id, name: staff.name})}
        } catch (error) {
            if(error.message && error.status){
                throw new HttpException(error.message, error.status) 
            }
            console.log(error)
            throw new HttpException('Registration failed check your parameters and try again', HttpStatus.BAD_REQUEST) 

        }
    }
    async registration(registerStaffDto: RegisterStaffDto){
        try {
            registerStaffDto.password = await bcrypt.hash(registerStaffDto.password, 10);
            const staff = await this.staffModel.create(registerStaffDto);
            return staff
        } catch (error) {
            if(error.code == 11000){
                throw new HttpException('This email already exists', HttpStatus.CONFLICT)
            }
            throw new HttpException('Registration Failed', HttpStatus.BAD_REQUEST)
        }
    }
}
