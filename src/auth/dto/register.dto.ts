import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsOptional,
  IsEnum,
  IsString,
} from 'class-validator';
import { Role } from '../../users/users.schema';
import { Match } from './match.decorator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'A senha deve ter pelo menos uma letra maiúscula, um número e um caractere especial.',
  })
  password: string;

  @IsNotEmpty({ message: 'A confirmação da senha é obrigatória' })
  @Match('password', { message: 'As senhas não coincidem' }) // Verifica se as senhas coincidem
  confirmPassword: string;

  @IsOptional()
  @IsEnum(Role, { each: true, message: 'Role inválida' }) // Valida as roles
  roles: Role[] = [Role.USER]; // Atribui o papel de usuário por padrão

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  firstName: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
