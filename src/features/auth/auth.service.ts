import { Injectable } from '@nestjs/common';
import { PrismaUserRepository } from 'src/prisma-repositories/user.repo';
import { PrismaUserTokenRepository } from 'src/prisma-repositories/usertokens.repo';
import { loginUserDto } from './dto/loginUser.dto';
import { AuthHelper } from 'src/helpers/auth.helper';

@Injectable()
export class AuthService {

    constructor(
        private userTokenRepo: PrismaUserTokenRepository,
        private userRepo: PrismaUserRepository,
        private authHelper: AuthHelper,
    ){}

    async signinUser(data: loginUserDto) {
        const { email, password } = data;
    
        const findUser = await this.userRepo.findUserByAny(email);
        await this.userRepo.throwExceptionIfUserNotFound(findUser);
        const user_password = await this.userRepo.getPassword(findUser.email);
    
    
        await this.authHelper.comparePasswords({password: password, hash: user_password});
        await this.authHelper.checkStatus(findUser);
        //await this.deviceRepo.updateFcmForUser(findUser.id, headers.fcmtoken);
    
        //sign jwt and return user to sign in
        const token = await this.authHelper.generateUserToken(findUser.id, findUser.email);
        return {
          message: 'Login Successful',
          user: findUser,
          access_token: token,
        };
      }


      async signoutUser(accessToken: string) {
        await this.userTokenRepo.revokeUserAccessToken(accessToken);
    
        return {
          message: 'signout succcessful',
        };
      }




}
