import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule, // Importa o ConfigModule para acessar variáveis de ambiente
    JwtModule.registerAsync({
      imports: [ConfigModule], // Certifica-se de que o ConfigModule esteja disponível
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Obtém o segredo do JWT da variável de ambiente
        signOptions: { expiresIn: '1h' }, // Define o tempo de expiração do token
      }),
      inject: [ConfigService], // Injeta o ConfigService
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
