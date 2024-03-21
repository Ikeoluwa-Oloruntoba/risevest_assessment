import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaUserRepository } from 'src/prisma-repositories/user.repo';
import { PrismaUserTokenRepository } from 'src/prisma-repositories/usertokens.repo';
import { AuthHelper } from 'src/helpers/auth.helper';
import { loginUserDto } from './dto/loginUser.dto';
import { AuthController } from './auth.controller';
import { DtoValidator } from 'src/helpers/dtoValidator.helper';
import { mockDeep } from 'jest-mock-extended';

// Define a mock type for Repository
export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

const mockUserRepo = {
    findUserByAny: jest.fn(),
    getPassword: jest.fn(),
  };
  
  const mockUserTokenRepo = {
    revokeUserAccessToken: jest.fn(),
  };
  
  const mockAuthHelper = {
    comparePasswords: jest.fn(),
    checkStatus: jest.fn(),
    generateUserToken: jest.fn(),
  };

describe('AuthService', () => {
  let service: AuthService;
  let userRepositoryMock: MockType<PrismaUserRepository>;
  let tokenRepositoryMock: MockType<PrismaUserTokenRepository>;
  let authHelperMock: MockType<AuthHelper>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
          AuthService,
          {
            provide: PrismaUserRepository,
            useValue: mockDeep<PrismaUserRepository>(),
          },
          {
            provide: PrismaUserTokenRepository,
            useValue: mockDeep<PrismaUserTokenRepository>(),
          },
          {
            provide: AuthHelper,
            useValue: mockDeep<AuthHelper>(),
          },
        
        ],
      }).compile();
    service = module.get<AuthService>(AuthService);
    userRepositoryMock = module.get(PrismaUserRepository);
    tokenRepositoryMock = module.get(PrismaUserTokenRepository);
    authHelperMock = module.get(AuthHelper);
  });
        
  describe('signinUser', () => {
    it('should sign in user and return access token', async () => {
      // Mock data and behavior of dependencies
      const mockDto: loginUserDto = {
          email: 'test@example.com', password: 'password',
          validate: function (): string {
              throw new Error('Function not implemented.');
          }
      };
      const mockUser = { id: 1, email: 'test@example.com' };
      userRepositoryMock.findUserByAny.mockReturnValue(mockUser);
      userRepositoryMock.getPassword.mockReturnValue('hashed_password');
      authHelperMock.comparePasswords.mockReturnValue(true);
      authHelperMock.checkStatus.mockReturnValue("User Active");
      authHelperMock.generateUserToken.mockReturnValue('access_token');

      // Call the method being tested
      const result = await service.signinUser(mockDto);

      // Assertions
      expect(userRepositoryMock.findUserByAny).toHaveBeenCalledWith('test@example.com');
      expect(userRepositoryMock.getPassword).toHaveBeenCalledWith('test@example.com');
      expect(authHelperMock.comparePasswords).toHaveBeenCalledWith({ password: 'password', hash: 'hashed_password' });
      expect(authHelperMock.checkStatus).toHaveBeenCalledWith(mockUser);
      expect(authHelperMock.generateUserToken).toHaveBeenCalledWith(1, 'test@example.com');
      expect(result).toEqual({
        message: 'Login Successful',
        user: mockUser,
        access_token: 'access_token',
      });
    });
  });

  describe('signoutUser', () => {
    it('should revoke user access token and return success message', async () => {
      // Mock data and behavior of dependencies
      const accessToken = 'access_token';
      tokenRepositoryMock.revokeUserAccessToken.mockReturnValue("");

      // Call the method being tested
      const result = await service.signoutUser(accessToken);

      // Assertions
      expect(tokenRepositoryMock.revokeUserAccessToken).toHaveBeenCalledWith('access_token');
      expect(result).toEqual({ message: 'signout succcessful' });
    });
  });
});
