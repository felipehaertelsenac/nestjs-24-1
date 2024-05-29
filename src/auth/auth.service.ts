import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Repository } from "typeorm";
import { AuthRegistroDTO } from "./dto/auth-registro.dto";
import { UsuarioService } from "src/usuario/usuario.service";

@Injectable()
export class AuthService{

    private issuer = 'login';
    private audience = 'usuarios';

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private readonly usuarioService: UsuarioService
    ){}

    createToken(user:Usuario){
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                nome: user.nome,
                email: user.email
            }, {
                expiresIn: "10 seconds",
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience
            })
        }
    }

    checkToken(token: string) {
        return this.jwtService.verify(token, {
            issuer: this.issuer,
            audience: this.audience            
        });
    }

    async login(email: string, senha: string) {
        const user = await this.usuarioRepository.findOne({
            where: {
                email
            }
        })

        if(!user) {
            throw new UnauthorizedException('E-mail ou senha incorretos.');
        }

        if(senha !== user.senha) {
            throw new UnauthorizedException('E-mail ou senha incorretos.');
        }

        return this.createToken(user);
    }

    async registro(data:AuthRegistroDTO) {
        const user = await this.usuarioService.create(data);

        return this.createToken(user);
    }

}