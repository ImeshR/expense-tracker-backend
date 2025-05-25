import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, IsDateString, IsEnum } from 'class-validator';
import { ExpenseType } from '../schemas/ expense.schema';

export class UpdateExpenseDto {
  @ApiProperty({
    example: 'Grocery shopping',
    description: 'Description of the expense',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 5000, description: 'Amount spent', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @ApiProperty({ example: '2023-12-01', description: 'Date of the expense', required: false })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({
    example: 'Food',
    description: 'Type of expense',
    enum: ExpenseType,
    required: false,
  })
  @IsOptional()
  @IsEnum(ExpenseType)
  type?: ExpenseType;
}
