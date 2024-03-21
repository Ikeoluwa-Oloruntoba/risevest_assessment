// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, Length, validateSync } from 'class-validator';

export class CreateUserDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 20, { message: 'Password has to be between 3 and 20 chars' })
  password: string;

  constructor(data: Partial<CreateUserDto>) {
    Object.assign(this, data);
  }

  validate(): string | null {
    const errors = validateSync(this);
    if (errors.length > 0) {
      return Object.values(errors[0].constraints)[0];
    }
    return null;
  }
}
