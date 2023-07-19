import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import {JwtService} from '@nestjs/jwt'
import { Staff } from './schemas';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

    constructor(@InjectModel(Staff.name) private staffModel:Model<Staff>, private jwtService: JwtService){}

    login(loginDto: LoginDto){

    }
}
