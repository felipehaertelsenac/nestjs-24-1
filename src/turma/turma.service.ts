import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Turma } from './entities/turma.entity';
import { In, Repository } from 'typeorm';
import { Professor } from 'src/professor/entities/professor.entity';
import { Aluno } from 'src/aluno/entities/aluno.entity';

@Injectable()
export class TurmaService {

  constructor (
    @InjectRepository(Turma)
    private turmaRepository: Repository<Turma>,
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>
  ){}

  async create(createTurmaDto: CreateTurmaDto) {
    const turma = this.turmaRepository.create(createTurmaDto);

    let professor = null;
    if (createTurmaDto.professorId){
      professor = await this.professorRepository.findOneBy({id: createTurmaDto.professorId})
      if(!professor) {
        throw new Error('Professor não encontrado')
      }
      turma.professor = professor
    }
    
    if (createTurmaDto.alunoIds && createTurmaDto.alunoIds.length > 0) {
      const alunos = await this.alunoRepository.find({
        where: {
          id: In(createTurmaDto.alunoIds)
        }
      })
      turma.alunos = alunos;
    }
    
    return this.turmaRepository.save(turma);
  }

  findAll() {
    return this.turmaRepository.find({relations: ['professor', 'alunos']});
  }

  async findOne(id: number) {
    const turma = await this.turmaRepository.findOne({
      where: {id},
      relations: ['professor', 'alunos']
    }) 
    if(!turma) {
      throw new NotFoundException(`Turma com ID ${id} não encontrada`);
    }
    return turma;
  }

  async update(id: number, updateTurmaDto: UpdateTurmaDto) {
    const turma = await this.findOne(id);
    if(!turma) {
      throw new NotFoundException(`Turma com ID ${id} não foi encontrada`);
    }

    if(updateTurmaDto.professorId){
      const professor = await this.professorRepository.findOneBy({id: updateTurmaDto.professorId})
      if(!professor) {
        throw new Error('Professor não encontrado')
      }
      turma.professor = professor;
    }

    if(updateTurmaDto.alunoIds){
      const alunos = await this.alunoRepository.find({
        where: { id: In(updateTurmaDto.alunoIds)}
      })
      turma.alunos = alunos
    }

    this.turmaRepository.merge(turma, updateTurmaDto);
    return this.turmaRepository.save(turma);
  }

  async remove(id: number) {
    const result = await this.turmaRepository.delete(id)
    if(result.affected === 0){
      throw new NotFoundException(`Turma com ID ${id} não encontrada`)
    }
    return result;
  }
}
