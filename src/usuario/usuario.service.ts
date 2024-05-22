import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { Repository } from "typeorm";
import { CreateUsuarioDTO } from "./dto/create-usuario.dto";
import { UpdatePutUsuarioDTO } from "./dto/update-put-usuario.dto";
import { UpdatePatchUsuarioDTO } from "./dto/update-patch-usuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario> 
    ){}

    create(createUsuarioDTO: CreateUsuarioDTO){
        return this.usuarioRepository.save(createUsuarioDTO)
    }

    listarTodos(){
        return this.usuarioRepository.find();
    }

    async listarUm(id: number){
        await this.exists(id);
        return this.usuarioRepository.findOneBy({id: id})
    }

    async update(id: number, updatePutUsuarioDTO:UpdatePutUsuarioDTO) {
        await this.exists(id);
        return this.usuarioRepository.update(id, updatePutUsuarioDTO)
    }

    async updateParcial(id: number, updatePatchUsuarioDTO:UpdatePatchUsuarioDTO) {
        await this.exists(id);
        return this.usuarioRepository.update(id, updatePatchUsuarioDTO)
    }

    async remove(id: number){
        await this.exists(id);
        return this.usuarioRepository.delete(id);
    }

    async exists(id: number) {
        console.log(this.usuarioRepository.exists({where:{id}}));
        if(!(this.usuarioRepository.exists({
            where: { id }
        }))) {
            throw new NotFoundException("Usuario não existe!");
        }
    }
}