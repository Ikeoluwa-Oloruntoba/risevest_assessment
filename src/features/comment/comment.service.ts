import { Injectable } from '@nestjs/common';
import { PrismaCommentsRepository } from 'src/prisma-repositories/comment.repo';
import { CreateCommentDto } from './dto/createComment.dto';

@Injectable()
export class CommentService {

    constructor(private readonly commentsRepository: PrismaCommentsRepository) {}

    async create(data: CreateCommentDto, userId: number){

        return await this.commentsRepository.create(data, userId)
    }
}
