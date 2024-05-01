import { Module } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turma } from './entities/turma.entity';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Professor } from 'src/professor/entities/professor.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Turma, Aluno, Professor])],
  controllers: [TurmaController],
  providers: [TurmaService],
})
export class TurmaModule {}
