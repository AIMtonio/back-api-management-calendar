import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUsuarioDto) {

    if (!createUserDto.email || !createUserDto.password) {
      return {
        success: false,
        message: 'Correo y contraseña son requeridos',
        data: null
      };
    }
    
    const userExist = await this.usuarioService.findByEmailAndPassword(createUserDto.email, createUserDto.password);
    if (!userExist) {
      return 'Credenciales incorrectas';
    }

    if(userExist.status == '2') {
      return {
        success: false,
        message: 'Usuario inactivo',
        data: null
      };
    }

    const token = await this.usuarioService.generateJwt(userExist);
    return {
      success: true,
      message: 'Login successful',
      data: token,
      uuid: userExist.uuid
    };
  }

}
