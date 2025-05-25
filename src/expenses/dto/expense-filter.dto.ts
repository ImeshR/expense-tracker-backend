import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsDateString, IsString } from 'class-validator';
import { ExpenseType } from '../schemas/ expense.schema';

export class ExpenseFilterDto {
  @ApiProperty({
    example: 'Food',
    description: 'Filter by expense type',
    enum: ExpenseType,
    required: false,
  })
  @IsOptional()
  @IsEnum(ExpenseType)
  type?: ExpenseType;

  @ApiProperty({ example: '2023-01-01', description: 'Start date for filtering', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ example: '2023-12-31', description: 'End date for filtering', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ example: 'grocery', description: 'Search in description', required: false })
  @IsOptional()
  @IsString()
  search?: string;
}
