import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Turma } from 'src/turma/entities/turma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno, Usuario, Turma])],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class AlunoModule {}
