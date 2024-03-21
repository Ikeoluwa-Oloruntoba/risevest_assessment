import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as bcrypt from 'bcrypt';

import { SafeUser } from "src/prisma-repositories/user.repo";
import { PrismaUserTokenRepository } from "src/prisma-repositories/usertokens.repo";

@Injectable()
export class AuthHelper{

    constructor(
        private jwtService: JwtService,
        private userTokenRepo: PrismaUserTokenRepository,

    ){}

    async comparePasswords(args: { password: string; hash: string }) {
        const isMatch = await bcrypt.compare(args.password, args.hash);
    
        if (!isMatch) {
          throw new BadRequestException('Invalid Credentials');
        }
      }

    async generateUserToken(userId: number, email: string) {
        const [at] = await Promise.all([
          this.jwtService.signAsync(
            {
              sub: userId,
              email,
            },
            {
              secret: 'user-secret',
              expiresIn: 60 * 240,
            },
          ),
        ]);
    
        await this.userTokenRepo.storeUserAccessToken(userId, at);
    
        return at;
      }


      async checkStatus(data:SafeUser) {
        if (data.status === false) {
          throw new BadRequestException('Your Account Has been Disabled, Please Contact Support');
        }

      }
    
}