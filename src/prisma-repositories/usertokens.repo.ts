import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserAccessToken } from '@prisma/client';
import { UsertokensInterface } from 'src/repository-interfaces/usertoken.interface';

@Injectable()
export class PrismaUserTokenRepository implements UsertokensInterface {
  constructor(private prisma: PrismaService) {}

  async storeUserAccessToken(userId: number, accessToken: string): Promise<UserAccessToken> {
    const access_token = await this.prisma.userAccessToken.create({
      data: {
        accessToken,
        userId,
      },
    });

    return access_token;
  }

  async revokeUserAccessToken(accessToken: string): Promise<UserAccessToken> {
    const revoked_token = await this.prisma.userAccessToken.update({
      where: { accessToken },
      data: { revoked: true },
    });

    return revoked_token;
  }

  async findUserAccessToken(accessToken: string): Promise<UserAccessToken | null> {
    const userToken = await this.prisma.userAccessToken.findUnique({
      where: { accessToken },
    });

    return userToken;
  }
}
