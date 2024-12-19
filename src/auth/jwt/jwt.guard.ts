import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, // Injeta o ConfigService para acessar variáveis de ambiente
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extrai o token do cabeçalho 'Authorization'

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      // Verifica a validade do token usando o segredo do JWT
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'), // Obtém o segredo do JWT do ConfigService
      });

      request.user = decoded; // Armazena o usuário decodificado na requisição
      return true; // Permite o acesso à rota
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
