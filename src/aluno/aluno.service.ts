import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Aluno } from './entities/aluno.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Turma } from 'src/turma/entities/turma.entity';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Turma)
    private turmaRepository: Repository<Turma>
  ){}

  async create(createAlunoDto: CreateAlunoDto) {
    const usuario = await this.usuarioRepository.findOneBy({id: createAlunoDto.usuarioId})
    if(!usuario){
      throw new NotFoundException('Usuario não encontrado');
    }

    const aluno = this.alunoRepository.create({
      usuario: usuario,
      turmas: []
    })

    if (createAlunoDto.turmaIds && createAlunoDto.turmaIds.length > 0) {
      const turmas = await this.turmaRepository.find({
        where: {
          id: In(createAlunoDto.turmaIds)
        }
      });
      aluno.turmas = turmas;
    }
    return this.alunoRepository.save(aluno);
  }

  findAll() {
    return this.alunoRepository.find({
      relations: ['usuario', 'turmas']
    })
  }

  async findOne(id: number) {
    const aluno = await this.alunoRepository.findOne({
      where: { id },
      relations: ['usuario', 'turmas']
    });
    if(!aluno){
      throw new NotFoundException(`Aluno com ID ${id} não encontrado`)
    }
    return aluno;
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto) {
    const aluno = await this.findOne(id);
    if(updateAlunoDto.usuarioId) {
      const usuario = await this.usuarioRepository.findOneBy({id: updateAlunoDto.usuarioId})
      if (!usuario){
        throw new NotFoundException('Usuario não encontrado');
      }
      aluno.usuario = usuario;
    }

    if(updateAlunoDto.turmaIds){
      const turmas = await this.turmaRepository.find({
        where: {
          id: In(updateAlunoDto.turmaIds)
        }
      });
      aluno.turmas = turmas;
    }

    return this.alunoRepository.save(aluno);
  }

  async remove(id: number) {
    const result = await this.alunoRepository.delete(id);
    if(result.affected === 0){
      throw new NotFoundException(`Aluno com ID ${id} não encontrado`);
    }
    return result;
  }
}
