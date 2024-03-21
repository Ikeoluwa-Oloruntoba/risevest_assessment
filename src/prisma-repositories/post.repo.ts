import { PrismaClient, Post } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePostDto } from 'src/features/post/dto/createPost.dto';

@Injectable()
export class PrismaPostsRepository {
  constructor(private readonly prisma: PrismaService) {}


  async findAll(page: number = 1, pageSize: number = 10, search: string = ''): Promise<Post[]> {
    const skip = (page - 1) * pageSize;

    // Define query conditions based on search parameter
    let where: any = undefined
    if(search){
        where = {
            OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
              ],
        }
    }

    // Query posts with pagination and search conditions
    return await this.prisma.post.findMany({
      where,
      skip,
      take: pageSize,
      include: {
        comments:true
      }
    });
  }

async findAllByUserId(userId: number, page: number = 1, pageSize: number = 10, search: string = ''): Promise<Post[]> {
    const skip = (page - 1) * pageSize;

    // Define query conditions based on search parameter
    let where: any = { userId }; // Start with userId condition
    if (search) {
      where = {
        ...where,
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    // Query posts with pagination and search conditions
    return await this.prisma.post.findMany({
      where,
      skip,
      take: pageSize,
      include: {
        comments:true
      }
    });
  }


  async findById(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        comments:true
      }
    });
  }

  async create(data: CreatePostDto, userId: number): Promise<Post> {
    return await this.prisma.post.create({
      data: {
        ...data,
        user: {
          connect: { id: userId }
        }
      }
    });
  }

  async update(id: number, data: any): Promise<Post> {
    return await this.prisma.post.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Post> {
    return await this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
