import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller('usuarios')
export class UsuarioController {

    @Post()
    async create(@Body() body){
        return {body};
    }

    @Get()
    async list() {
        return {users: []}
    }

    @Get(':id')
    async show(@Param() parametro) {
        return {user:{}, parametro}
    }

    @Put(':id')
    async updateTotal(@Body() body, @Param() parametro) {
        return {
            method: 'put',
            body,
            parametro
        }
    }

    @Patch(':id')
    async updateParcial(@Body() body, @Param() parametro) {
        return {
            method: 'patch',
            body,
            parametro
        }
    }

    @Delete(':id')
    async delete(@Param() paramentro){
        return {paramentro}
    }


}