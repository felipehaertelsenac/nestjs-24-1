import { Injectable } from "@nestjs/common";
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

    listarUm(id: number){
        return this.usuarioRepository.findOneBy({id: id})
    }

    update(id: number, updatePutUsuarioDTO:UpdatePutUsuarioDTO) {
        return this.usuarioRepository.update(id, updatePutUsuarioDTO)
    }

    updateParcial(id: number, updatePatchUsuarioDTO:UpdatePatchUsuarioDTO) {
        return this.usuarioRepository.update(id, updatePatchUsuarioDTO)
    }

    remove(id: number){
        return this.usuarioRepository.delete(id);
    }
}