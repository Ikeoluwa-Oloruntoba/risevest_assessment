import { Injectable } from '@nestjs/common';
import { PrismaPostsRepository } from 'src/prisma-repositories/post.repo';
import { CreatePostDto } from './dto/createPost.dto';
import { FetchPostDto } from './dto/fetchPost.dto';

@Injectable()
export class PostService {

    constructor(private readonly postsRepository: PrismaPostsRepository) {}

    async create(data: CreatePostDto, userId:number){

        return await this.postsRepository.create(data, userId)
    }

    async fetchPosts(data: FetchPostDto){

        const { page, pageSize, search} = data

        return await this.postsRepository.findAll(page, pageSize, search);
    }

    async fetchUserPost(data: FetchPostDto, userId: number){

        const { page, pageSize, search} = data

        return await this.postsRepository.findAllByUserId(userId, page, pageSize, search);
    }
}
