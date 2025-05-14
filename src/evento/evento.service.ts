import { Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { Repository } from 'typeorm';
//import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EventoService {

  constructor(
    @InjectRepository(Evento)
    private _eventoRepository: Repository<Evento>,
  ) { }

  async create(createEventoDto: CreateEventoDto) {

    try {

      if (!createEventoDto.date_event) {
        return {
          success: false,
          message: 'La fecha del evento es obligatoria',
          data: null
        };
      }

      const evento = await this._eventoRepository.save(createEventoDto);
      if(!evento) {
        return {
          success: false,
          message: 'Error al crear el evento',
          data: null
        };
      }
    }catch (error) {
      console.error('Error creating evento:', error);
    }

    return {
      success: true,
      message: 'Evento creado correctamente',
      data: createEventoDto
    };
  }

  findAll() {
    return `This action returns all evento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evento`;
  }

  update(id: number, updateEventoDto: UpdateEventoDto) {
    return `This action updates a #${id} evento`;
  }

  remove(id: number) {
    return `This action removes a #${id} evento`;
  }
}
