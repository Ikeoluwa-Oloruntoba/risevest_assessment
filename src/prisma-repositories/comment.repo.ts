import { PrismaClient, Comment } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCommentDto } from 'src/features/comment/dto/createComment.dto';

@Injectable()
export class PrismaCommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Comment[]> {
    return await this.prisma.comment.findMany();
  }

  async findById(id: number): Promise<Comment | null> {
    return await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateCommentDto, userId: number): Promise<Comment> {
    const { content, postId } = data;
    return await this.prisma.comment.create({
      data: {
        content,
        post: { connect: { id: postId } }, // Connect postId to the comment being created
        user: { connect: {id: userId}}
      },
    });
  }

  async update(id: number, data: any): Promise<Comment> {
    return await this.prisma.comment.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Comment> {
    return this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
