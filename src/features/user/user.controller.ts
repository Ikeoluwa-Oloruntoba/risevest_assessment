import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DtoValidator } from 'src/helpers/dtoValidator.helper';
import { CreateUserDto } from './dto/createUser.dto';
import { UserGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';
import { FetchUsersDto } from './dto/fetchusers.dto';

@ApiTags('User')
@Controller({
  path: 'user',
  version: '1'
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private dtoValidator: DtoValidator) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a User' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() data: any) {

    console.log(data)

      // Validate DTO
      await this.dtoValidator.validateDto(data, CreateUserDto);
  
      // Create user
      const newUser = await this.userService.create(data);
  
      return {
        message: "User Created Successfully",
        data: newUser
      };
   
  }

  @Get('get')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Fetch all Users' })
  @ApiBody({ type: FetchUsersDto })
  async getUsers(@Body() data: any){


       // Validate DTO
       await this.dtoValidator.validateDto(data, FetchUsersDto);
  
       // Create user
       const users = await this.userService.getUsers(data);
   
       return {
         message: "Users Fetched Successfully",
         data: users
       };
   
  }


  @Get('get/top-3')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Fetch all Users' })
  @ApiBody({ type: FetchUsersDto })
  async getTop3Users(@Body() data: any){

  
       // Create user
       const top3Users = await this.userService.getTop3Users();
   
       return {
         message: "Users Fetched Successfully",
         data: top3Users
       };
   
  }
}
