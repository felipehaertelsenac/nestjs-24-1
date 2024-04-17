import { Injectable } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Turma } from './entities/turma.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TurmaService {

  constructor (
    @InjectRepository(Turma)
    private turmaRepository: Repository<Turma>
  ){}

  create(createTurmaDto: CreateTurmaDto) {
    return this.turmaRepository.save(createTurmaDto);
  }

  findAll() {
    return this.turmaRepository.find();
  }

  findOne(id: number) {
    return this.turmaRepository.findOneBy({id: id});
  }

  update(id: number, updateTurmaDto: UpdateTurmaDto) {
    return this.turmaRepository.update(id, updateTurmaDto);
  }

  remove(id: number) {
    return this.turmaRepository.delete(id);
  }
}
