import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'; 
import { DtoValidator } from 'src/helpers/dtoValidator.helper';
import { Request } from 'express';
import { of } from 'rxjs';

async function testAuthController() {
    const mockAuthService = {
        signinUser: jest.fn(),
        signoutUser: jest.fn(),
    };

    const mockDtoValidator = {
        validateDto: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
            { provide: AuthService, useValue: mockAuthService },
            { provide: DtoValidator, useValue: mockDtoValidator },
        ],
    }).compile();

    const controller = module.get<AuthController>(AuthController);

    // Successful login
    describe('signinUser', () => {
        it('should call AuthService.signinUser and return success response', async () => {
            const mockResponse = { access_token: 'token' };
            mockAuthService.signinUser.mockReturnValue(of(mockResponse));

            const headers = {}; // Mock headers
            const data = {}; // Valid loginUserDto data
            const result = await controller.signinUser(headers, data);

            expect(mockAuthService.signinUser).toHaveBeenCalledWith(data);
            expect(result).toEqual(mockResponse);
        });

        // Add more test cases for different scenarios (invalid data, validation errors, etc.)
    });

    // Successful signout
    describe('signoutUser', () => {
        it('should call AuthService.signoutUser and return success response', async () => {
            const req = { headers: { authorization: 'Bearer token' } } as Request;
            const userId = 1;
            mockAuthService.signoutUser.mockReturnValue(of(null)); // Assuming success response is null

            const result = await controller.signoutUser(userId, req);

            expect(mockAuthService.signoutUser).toHaveBeenCalledWith('token');
            expect(result).toBeNull();
        });

        // Add more test cases for different scenarios (unauthorized access, guard errors, etc.)
    });

    // Call your test function
    testAuthController();
}
