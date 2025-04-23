import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { HelpersService } from 'src/helpers/helpers.service';
import { EventoService } from 'src/evento/evento.service';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly _jwtService: JwtService,
    private readonly _helperService: HelpersService,
  ) {}
  
  async create(createUsuarioDto: CreateUsuarioDto) {

     // Validar si el correo ya existe en la tabla usuarios
     const userExist = await this.findByEmail(createUsuarioDto.email);

     console.log('userExist', userExist);

     if (userExist) {
       return 'Correo ya registrado';
     }

     // Generar UUID
     const uuid_usuario = this._helperService.generateUUID();
     createUsuarioDto.uuid = uuid_usuario;

     const username = createUsuarioDto.email.split('@')[0];
     createUsuarioDto.username = username;
     createUsuarioDto.password = null;
     createUsuarioDto.update_at = null; 

     const token = await this.generateJwt(createUsuarioDto);
     

    const usuario = await this.usuarioRepository.save(createUsuarioDto);
    console.log('usuario', usuario);

    
    //const respuesta = { data: usuario, access_token: token, token_type: "bearer" };
    //return respuesta;
     return usuario;
  }

  async findAll() {
    const usuarios = await this.usuarioRepository.find();
    return usuarios;
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id: id } });
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOne({ where: { id: id } });

    if (!usuario) {
      return 'Usuario no encontrado';
    }

    const userUpdate = await this.usuarioRepository.update(id, updateUsuarioDto);
    if (!userUpdate) {
      return 'Error al actualizar el usuario';
    }

    const updatedUsuario = await this.usuarioRepository.findOne({ where: { id: id } });
    if (!updatedUsuario) {
      return 'Error al actualizar el usuario';
    }
   
    return updatedUsuario;
  }

  async remove(id: number) {

    const usuario = await this.usuarioRepository.findOne({ where: { id: id } });
    if (!usuario) {
      return 'Usuario no encontrado';
    }

    const userDelete = await this.usuarioRepository.delete(id);
    if (!userDelete) {
      return 'Error al eliminar el usuario';
    }
   
    return 'Usuario eliminado correctamente';
  }

  async generateJwt(usuario: CreateUsuarioDto) {
    const payload = { username: usuario.username, sub: usuario.uuid };
    return this._jwtService.sign(payload);
  }

  async findByEmail(email: string) {
    return await this.usuarioRepository.findOne({ where: { email: email } });
  }

  async findByEmailAndPassword(email: string, password: string) {
    return await this.usuarioRepository.findOne({ where: { email: email, password: password, status: '1' } });
  }

}
