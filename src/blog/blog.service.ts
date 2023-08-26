import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schemas';
import { AddBlogDto } from './dto';

@Injectable()
export class BlogService {
  addBlog(addBlogDto: AddBlogDto): Promise<Blog> {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async countBlogsCustom(countDto: object) {
    try {
      const count = await this.blogModel.count(countDto).exec();
      return { count };
    } catch (error) {
      throw new HttpException(
        'Cannot obtain count for blogs, try again later',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async getBlogCustom(customDto: object) {
    try {
      const blogs = await this.blogModel.find(customDto).exec();
      return blogs;
    } catch (error) {
      throw new HttpException(
        'Cannot obtain blogs, try again later',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async getAllBlogs(): Promise<Blog[]> {
    try {
      const allBlogss = await this.blogModel.find().exec();
      return allBlogss;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch all blogs. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBlogById(blogId: string): Promise<Blog> {
    try {
      const blog = await this.blogModel.findById(blogId).exec();
      if (!blog) {
        throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
      }
      return blog;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch blog. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createBlog(addBlogDto: AddBlogDto) {
    try {
      const newBlog = await this.blogModel.create(addBlogDto);
      return newBlog;
    } catch (error) {
      throw new HttpException(
        'Failed to create blog post. Please try again later',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteBlogById(blogId: string) {
    try {
      const deletedBlog = await this.blogModel.findByIdAndDelete(blogId).exec();
      if (!deletedBlog) {
        throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'Failed to delete the blog. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
