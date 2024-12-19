import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, Role } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(
    email: string,
    password: string,
    firstName: string,
    phoneNumber?: string,
    roles: Role[] = [Role.USER], // O valor default para roles
  ): Promise<any> {
    // Verifica se o e-mail já existe
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Hash da senha
    const hashedPassword = await this.hashPassword(password);

    // Cria o usuário com o firstName
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      firstName, // Salva o firstName
      roles, // Define as roles
      phoneNumber,
    });

    // Salva o usuário e omite a senha na resposta
    const savedUser = await newUser.save();

    // Retorna o usuário sem a senha
    return savedUser.toObject({
      versionKey: false,
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<any[]> {
    return this.userModel
      .find()
      .select('firstName email roles createdAt') // Seleciona apenas os campos desejados
      .exec();
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
