import { Body, Controller, Headers, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { loginUserDto } from './dto/loginUser.dto';
import { DtoValidator } from 'src/helpers/dtoValidator.helper';
import { GetCurrentUser } from 'src/common/decorators';
import { Request } from 'express';
import { UserGuard } from 'src/common/guards';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private dtoValidator: DtoValidator) {}

  @Post('user/signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: loginUserDto })
  async signinUser(@Headers() headers: any, @Body() data: any) {
    await this.dtoValidator.validateDto(data, loginUserDto);
    return await this.authService.signinUser(data);
  }

  @UseGuards(UserGuard)
  @Post('user/signout')
  @HttpCode(HttpStatus.OK)
  async signoutUser(@GetCurrentUser('sub') userId: number, @Req() req: Request) {
    const accessToken = req.headers.authorization.split(' ')[1];

    return await this.authService.signoutUser(accessToken);
  }
}
