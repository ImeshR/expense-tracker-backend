import { Injectable } from '@nestjs/common';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { UserDocument } from '../user/schemas/user.schema';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await this.usersService.validatePassword(password, user.password))) {
      const { ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(request: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = request;

    const user = await this.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    return {
      token: this.jwtService.sign({ email: user.email, userId: user._id, name: user.name ,maxMonthlyExpense: user.maxMonthlyExpense}),
      status: 'success',
      message: 'Login successful',
    };
  }

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      return {
        status: 'exists',
        message: 'User with this email already exists',
      };
    }
    const user = await this.usersService.create(registerDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...result } = (user as UserDocument).toObject();
    return {
      status: 'success',
      message: 'User registered successfully',
    };
  }
}
