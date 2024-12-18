import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SitesModule } from './sites/sites.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    // Configuração do ConfigModule para carregar as variáveis de ambiente
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente globais em todo o aplicativo
    }),

    // Conexão com o MongoDB usando a URI do .env
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    SitesModule,
    HealthModule,
  ],
})
export class AppModule {}
