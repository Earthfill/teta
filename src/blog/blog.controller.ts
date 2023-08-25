import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlogService } from './blog.service';
import { AddBlogDto } from './dto';
import { Blog } from './schemas';

@UseGuards(AuthGuard('jwt'))
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('count')
  countBlogCustom(@Body() countDto: object) {
    return this.blogService.countBlogsCustom(countDto);
  }

  @Post('custom')
  getBlogCustom(@Body() customDto: object) {
    return this.blogService.getBlogCustom(customDto);
  }

  @Post()
  createBlog(@Body() addBlogDto: AddBlogDto): Promise<Blog> {
    return this.blogService.createBlog(addBlogDto);
  }

  @Get()
  getAllBlogs(): Promise<Blog[]> {
    return this.blogService.getAllBlogs();
  }

  @Get(':id')
  getBlogById(@Param('id') blogId: string): Promise<Blog> {
    return this.blogService.getBlogById(blogId);
  }
}
