import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, IsDateString, IsEnum } from 'class-validator';
import { ExpenseType } from '../schemas/ expense.schema';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Grocery shopping', description: 'Description of the expense' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 5000, description: 'Amount spent' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ example: '2023-12-01', description: 'Date of the expense' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    example: 'Food',
    description: 'Type of expense',
    enum: ExpenseType,
  })
  @IsNotEmpty()
  @IsEnum(ExpenseType)
  type: ExpenseType;
}
