import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ConflictException,
  UsePipes,
  ValidationPipe,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: RegisterDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.authService.login(user);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() registerDto: RegisterDto) {
    // Verifica se o e-mail já está em uso
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    const user = await this.usersService.create(
      registerDto.email,
      registerDto.password,
      registerDto.firstName,
      registerDto.phoneNumber,
      registerDto.roles,
    );

    return user;
  }
  // Rota para listar usuários
  @Get('users')
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    const users = await this.usersService.findAll();
    return users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      roles: user.roles,
      createdAt: user.createdAt,
    }));
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = req.user;
    return userWithoutPassword;
  }
}
