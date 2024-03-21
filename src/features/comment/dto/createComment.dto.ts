import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

export class CreateCommentDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly postId: number;

  constructor(data: Partial<CreateCommentDto>) {
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