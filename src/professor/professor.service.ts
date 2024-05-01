import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from './entities/professor.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class ProfessorService {

  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
  ){}

  async create(createProfessorDto: CreateProfessorDto) {
    const usuario = await this.usuarioRepository.findOneBy({id: createProfessorDto.usuarioId})
    if(!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const professor = this.professorRepository.create({
      usuario
    })
    
    return this.professorRepository.save(professor);
  }

  findAll() {
    return this.professorRepository.find({
      relations: ['usuario', 'turmas'] 
    });
  }

  async findOne(id: number) {
    const professor = await this.professorRepository.findOne({
      where: { id }, 
      relations: ['usuario', 'turmas']
    })

    if (!professor){
      throw new NotFoundException(`Professor com ID ${id} não encontrado`);
    }
    
    return professor;
  }

  async update(id: number, updateProfessorDto: UpdateProfessorDto) {
    const professor = await this.findOne(id);
    if (updateProfessorDto.usuarioId){
      const usuario = await this.usuarioRepository.findOneBy({id: updateProfessorDto.usuarioId})
      if(!usuario) {
        throw new Error('Usuário não encontrado');
      }
      professor.usuario = usuario;
    }
    return this.professorRepository.save(professor);
  }

  async remove(id: number) {
    const result = await this.professorRepository.delete(id)
    if(result.affected === 0){
      throw new NotFoundException(`Professor com ID ${id} não encontrado`)
    }
    return result;
  }
}
