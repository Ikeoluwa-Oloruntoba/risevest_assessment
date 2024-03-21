import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaUserRepository } from 'src/prisma-repositories/user.repo';
import { CreateUserDto } from './dto/createUser.dto';
import { FetchUsersDto } from './dto/fetchusers.dto';

@Injectable()
export class UserService {

    constructor(private readonly userRepository: PrismaUserRepository) {}

    async create(data: CreateUserDto) {

        await this.checkIfUserExist(data.email)

        return await this.userRepository.createUser(data);
    }

    async getUsers(data: FetchUsersDto){

        const {search, page, pageSize} = data;

        return await this.userRepository.findAllUsers(page, pageSize, search)
    }

    async getTop3Users(){

        return await this.userRepository.getTopUsersWithLatestComments(3)
    }

    private async checkIfUserExist(email: string){

        const user = await this.userRepository.findUserByAny(email)

        if(user){
            throw new BadRequestException('Email Already Exist')
        }
    }
}
