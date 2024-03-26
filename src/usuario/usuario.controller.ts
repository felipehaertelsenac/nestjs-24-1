import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUsuarioDTO } from "./dto/create-usuario.dto";
import { UpdatePutUsuarioDTO } from "./dto/update-put-usuario.dto";
import { UpdatePatchUsuarioDTO } from "./dto/update-patch-usuario.dto";

@Controller('usuarios')
export class UsuarioController {

    @Post()
    async create(@Body() body: CreateUsuarioDTO){
        return {body};
    }

    @Get()
    async list() {
        return {users: []}
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return {user:{}, id}
    }

    @Put(':id')
    async updateTotal(@Body() {email, senha, nome}:UpdatePutUsuarioDTO, @Param('id', ParseIntPipe) id: number) {
        return {
            method: 'put',
            nome, email, senha,
            id
        }
    }

    @Patch(':id')
    async updateParcial(@Body() {email, senha, nome}:UpdatePatchUsuarioDTO, @Param('id', ParseIntPipe) id: number) {
        return {
            method: 'patch',
            nome, email, senha,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return {id}
    }


}