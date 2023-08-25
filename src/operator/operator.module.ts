import { Module } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { OperatorController } from './operator.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Operator, OperatorSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Operator.name,
        schema: OperatorSchema,
      },
    ]),
  ],
  providers: [OperatorService],
  controllers: [OperatorController],
})
export class OperatorModule {}
