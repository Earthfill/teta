import { Module } from '@nestjs/common';
import { TravellerController } from './traveller.controller';
import { TravellerService } from './traveller.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Traveller, TravellerSchema } from './schemas/traveller.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Traveller.name,
      schema: TravellerSchema
    },
  ])],
  controllers: [TravellerController],
  providers: [TravellerService]
})
export class TravellerModule {}
