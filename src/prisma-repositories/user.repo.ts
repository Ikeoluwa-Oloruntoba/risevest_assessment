import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { CreateUserDto } from "src/features/user/dto/createUser.dto";
import { UserInterface } from "src/repository-interfaces/user.interface";
import * as bcrypt from 'bcrypt';

// Define a new type for the user without sensitive details
export type SafeUser = Omit<User, 'password'>;

// Interface for type safety (optional)
export interface UserWithLatestComment {
  id: number; // Assuming user has an ID field
  fullname: string;
  comments: {
    content: string;
  }[]; // Array of latest comments (limited to 1)
}

@Injectable()
export class PrismaUserRepository implements UserInterface {

    constructor(private prisma: PrismaService) {}


      async createUser(data: CreateUserDto): Promise<SafeUser> {
        const { email, firstname, lastname, password } = data;

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await this.prisma.user.create({
          data: {
            fullname: firstname + ' ' + lastname,
            email: email,
            password: hashedPassword,
          },
        });
    
        return this.hideSensitiveDetails(newUser);
      }

      async findUserByAny(uniqueId: any): Promise<SafeUser> {
        // Determine the search criteria based on the type of uniqueId
        const searchCriteria: Prisma.UserWhereInput = typeof uniqueId === 'number'
            ? { id: uniqueId }
            : {
                OR: [
                    { email: String(uniqueId) },
                    { uuid: String(uniqueId) }
                ]
            };
    
        // Find the user based on the search criteria
        const foundUser = await this.prisma.user.findFirst({
            where: searchCriteria,
        });
  
    
        return await this.hideSensitiveDetails(foundUser);
    }

    async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<SafeUser> {
        let updatedUser: User;
        // Start a Prisma transaction
        await this.prisma.$transaction(async (transaction) => {
          // Update the user data within the transaction
          updatedUser = await transaction.user.update({
            where: { id },
            data,
          });
        });
    
        // Transaction was successful, and changes are committed
        return await this.hideSensitiveDetails(updatedUser);
      }


      async  getTopUsersWithLatestComments(size: number): Promise<UserWithLatestComment[]> {
        const topUsers = await this.prisma.user.findMany({
          take: size, // Limit to 3 size
          orderBy: {
            posts: {
              _count: Prisma.SortOrder.desc,
            },
          },
          select: {
            id: true,
            fullname: true, 
            comments: { 
              orderBy: { createdAt: Prisma.SortOrder.desc },
              take: 1,
              select: { content: true }, 
            },
          },
        });
      
        return topUsers;
      }


      async findAllUsers(page: number = 1, pageSize: number = 10, search: string = ''): Promise<User[]> {
        const skip = (page - 1) * pageSize;
    
        // Define query conditions based on search parameter
        let where: any = undefined; // Initialize where clause
    
        if (search) {
          where = {
            OR: [
              { name: { contains: search, mode: 'insensitive' } }, // Name search condition
              { email: { contains: search, mode: 'insensitive' } }, // Email search condition
            ],
          };
        }

        // Query users with pagination and search conditions
        return await this.prisma.user.findMany({
          where,
          skip,
          take: pageSize,
        });
      }


    async getPassword(uniqueId: any){

      const user = await this.prisma.user.findFirst({
        where:{
          email: uniqueId
        }
      })

      return user.password;

    }
    //Private Functions

    async throwExceptionIfUserNotFound(user: User | null): Promise<void> {
        if (!user) {
          throw new BadRequestException('Account Does Not Exist');
        }
      }


    private async hideSensitiveDetails(user: User | null): Promise<SafeUser> {
        if (user) {
          // Omit sensitive details
          const { password, ...safeUser } = user;
          return safeUser;
        }
   
      }




}
