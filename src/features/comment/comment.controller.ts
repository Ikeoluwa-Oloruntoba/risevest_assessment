import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DtoValidator } from 'src/helpers/dtoValidator.helper';
import { UserGuard } from 'src/common/guards';
import { CreateCommentDto } from './dto/createComment.dto';
import { GetCurrentUser } from 'src/common/decorators';

@ApiTags('Comment')
@Controller({
  path: 'comment',
  version: '1'
})
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private dtoValidator: DtoValidator) {}
    

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a Comment' })
    @ApiBody({ type: CreateCommentDto })
    @UseGuards(UserGuard)
    async createComment(@Body() data: any, @GetCurrentUser('sub') userId: number) {
  
      try {
        // Validate DTO
        await this.dtoValidator.validateDto(data, CreateCommentDto);
    
        // Create user
        const newComment = await this.commentService.create(data, userId);
    
        return {
          message: "Comment Created Successfully",
          data: newComment
        };
      } catch (error) {
        // Handle errors
        console.error('Error creating comment:', error);
        throw new BadRequestException('Failed to create comment.');
      }
    }
}
