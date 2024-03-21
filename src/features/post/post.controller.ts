import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DtoValidator } from 'src/helpers/dtoValidator.helper';
import { CreatePostDto } from './dto/createPost.dto';
import { GetCurrentUser } from 'src/common/decorators';
import { UserGuard } from 'src/common/guards';
import { FetchPostDto } from './dto/fetchPost.dto';

@ApiTags('Posts')
@Controller({
  path: 'post',
  version: '1'
})
export class PostController {
  constructor(
    private readonly postService: PostService,
    private dtoValidator: DtoValidator) {}




  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a User' })
  @ApiBody({ type: CreatePostDto })
  @UseGuards(UserGuard)
  async createPost(@Body() data: any, @GetCurrentUser('sub') userId: number) {

      // Validate DTO
      await this.dtoValidator.validateDto(data, CreatePostDto);
  
      // Create user
      const newPost = await this.postService.create(data, userId);
  
      return {
        message: "Post Created Successfully",
        data: newPost
      };
   
  }


  @Get('user/get')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Post for a User' })
  @ApiBody({ type: FetchPostDto })
  @UseGuards(UserGuard)
  async getPostForUser(@Body() data: any, @GetCurrentUser('sub') userId: number) {

      await this.dtoValidator.validateDto(data, FetchPostDto);
  
      // Create user
      const posts = await this.postService.fetchUserPost(data, userId);
  
      return {
        message: "User Post Fetched Successfully",
        data: posts
      };
   
  }

  
  @Get('get')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All Posts' })
  @ApiBody({ type: FetchPostDto })
  async getPost(@Body() data: any) {

      await this.dtoValidator.validateDto(data, FetchPostDto);
  
      // Create user
      const posts = await this.postService.fetchPosts(data);
  
      return {
        message: "Post Fetched Successfully",
        data: posts
      };
   
  }


}
