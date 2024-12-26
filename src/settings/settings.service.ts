import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings } from './schemas/settings.schema';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name) // Ajustado para usar o nome correto do schema
    private readonly settingsModel: Model<Settings>,
  ) {}

  /**
   * Retorna as configurações gerais.
   */
  async getSettings(): Promise<Settings> {
    const settings = await this.settingsModel.findOne().exec();
    if (!settings) {
      throw new NotFoundException('Configurações não encontradas');
    }
    return settings;
  }

  /**
   * Atualiza ou cria as configurações gerais.
   */
  async updateSettings(
    updateSettingsDto: UpdateSettingsDto,
  ): Promise<Settings> {
    const updatedSettings = await this.settingsModel.findOneAndUpdate(
      {}, // Critério vazio para encontrar o único documento de configurações
      updateSettingsDto, // Dados a serem atualizados
      { new: true, upsert: true }, // `new: true` retorna o documento atualizado, `upsert: true` cria se não existir
    );

    return updatedSettings;
  }
}
