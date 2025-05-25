import { ApiProperty } from '@nestjs/swagger';
import { ExpenseType } from '../schemas/ expense.schema';

export class ExpenseResponseDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Expense ID' })
  id: string;

  @ApiProperty({ example: 'Grocery shopping', description: 'Description of the expense' })
  description: string;

  @ApiProperty({ example: 5000, description: 'Amount spent' })
  amount: number;

  @ApiProperty({ example: '2023-12-01T00:00:00.000Z', description: 'Date of the expense' })
  date: Date;

  @ApiProperty({ example: 'Food', description: 'Type of expense', enum: ExpenseType })
  type: ExpenseType;

  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'User ID who created the expense',
  })
  userId: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Last update date' })
  updatedAt: Date;
}
