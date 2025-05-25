import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 50000,
    description: 'Maximum monthly expense limit',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxMonthlyExpense?: number;
}
