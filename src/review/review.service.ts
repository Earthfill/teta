import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './schemas';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async getAllReviews(): Promise<Review[]> {
    try {
      const allReviews = await this.reviewModel.find().exec();
      return allReviews;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch all reviews. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
