import { Body, Controller, Headers, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDTO } from "./dto/auth-login.dto";
// import { UsuarioService } from "src/usuario/usuario.service";
import { AuthRegistroDTO } from "./dto/auth-registro.dto";

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

    @Post('me')
    async me(@Headers("authorization") token){
        // return token;
        return this.authService.checkToken((token ?? '').split(' ')[1]);
    }
}