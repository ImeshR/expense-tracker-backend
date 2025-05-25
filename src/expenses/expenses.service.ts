import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import type { CreateExpenseDto } from './dto/create-expense.dto';
import type { UpdateExpenseDto } from './dto/update-expense.dto';
import type { ExpenseFilterDto } from './dto/expense-filter.dto';
import { Expense, ExpenseDocument } from './schemas/ expense.schema';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>) {}

  async create(createExpenseDto: CreateExpenseDto, userId: string): Promise<Expense> {
    const createdExpense = new this.expenseModel({
      ...createExpenseDto,
      userId,
    });
    return createdExpense.save();
  }

  async findAll(userId: string, filterDto: ExpenseFilterDto): Promise<Expense[]> {
    const filter: any = { userId };

    if (filterDto.type) {
      filter.type = filterDto.type;
    }

    if (filterDto.startDate || filterDto.endDate) {
      filter.date = {};
      if (filterDto.startDate) {
        filter.date.$gte = new Date(filterDto.startDate);
      }
      if (filterDto.endDate) {
        filter.date.$lte = new Date(filterDto.endDate);
      }
    }

    if (filterDto.search) {
      filter.description = { $regex: filterDto.search, $options: 'i' };
    }

    return this.expenseModel.find(filter).sort({ date: -1 }).exec();
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto, userId: string): Promise<Expense> {
    const expense = await this.expenseModel.findById(id).exec();
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    if (expense.userId.toString() !== userId) {
      throw new ForbiddenException('You can only update your own expenses');
    }

    const updatedExpense = await this.expenseModel
      .findByIdAndUpdate(id, updateExpenseDto, { new: true })
      .exec();

    return updatedExpense;
  }

  async remove(id: string, userId: string) {
    const expense = await this.expenseModel.findById(id).exec();
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    if (expense.userId.toString() !== userId) {
      throw new ForbiddenException('You can only delete your own expenses');
    }

    await this.expenseModel.findByIdAndDelete(id).exec();

    return { message: 'Expense deleted successfully', success: true };
  }
}
