import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TurmaModule } from './turma/turma.module';
import { TesteModule } from './teste/teste.module';

@Module({
  imports: [UsuarioModule, TurmaModule, TesteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
