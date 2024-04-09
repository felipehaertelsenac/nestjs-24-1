import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TurmaModule } from './turma/turma.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './database.providers';

@Module({
  imports: [
    UsuarioModule, 
    TurmaModule, 
    TypeOrmModule.forRoot(config)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
