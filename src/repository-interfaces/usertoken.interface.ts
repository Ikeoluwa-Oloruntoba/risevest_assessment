import { UserAccessToken } from '@prisma/client';

export interface UsertokensInterface {
  storeUserAccessToken(adminId: number, accessToken: string): Promise<UserAccessToken>;

  revokeUserAccessToken(accessToken: string): Promise<UserAccessToken>;

  findUserAccessToken(accessToken: string): Promise<UserAccessToken>;
}
