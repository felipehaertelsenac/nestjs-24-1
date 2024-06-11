import { Body, Controller, Headers, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDTO } from "./dto/auth-login.dto";
// import { UsuarioService } from "src/usuario/usuario.service";
import { AuthRegistroDTO } from "./dto/auth-registro.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { Usuario } from "src/decorators/usuario.decorator";

@Controller('auth')
export class AuthController {
    constructor(
        // private readonly usuarioService: UsuarioService,
        private readonly authService: AuthService
    ){}

    @Post('login')
    login(@Body() {email, senha}: AuthLoginDTO){
        return this.authService.login(email, senha);
    }

    @Post('registrar')
    registrar(@Body() body: AuthRegistroDTO){
        return this.authService.registro(body);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@Usuario() user){
        return {user};
    }
}