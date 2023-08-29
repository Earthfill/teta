import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReviewService } from './review.service';
import { Review } from './schemas';

@UseGuards(AuthGuard('jwt'))
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  getAllReviews(): Promise<Review[]> {
    return this.reviewService.getAllReviews();
  }
}
