import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Staff } from 'src/auth/schemas';

@Injectable()
export class StaffService {
    constructor(@InjectModel(Staff.name) private staffModel:Model<Staff>){}
    getloggedInStaff(staffObj: Staff){   

        staffObj.password = null
        return staffObj
      
    }
    getStaffs(){
        try {
            const staffs = this.staffModel.find().exec();
            return staffs
        } catch (error) {
            throw new HttpException(error.message, error.code);
        }
    }
}
