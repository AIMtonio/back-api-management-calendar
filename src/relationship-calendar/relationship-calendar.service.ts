import { Injectable } from '@nestjs/common';
import { CreateRelationshipCalendarDto } from './dto/create-relationship-calendar.dto';
import { UpdateRelationshipCalendarDto } from './dto/update-relationship-calendar.dto';
import { RelationshipCalendar } from './entities/relationship-calendar.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { CustomCalendarService } from 'src/custom-calendar/custom-calendar.service';
import { Repository } from 'typeorm';

@Injectable()
export class RelationshipCalendarService {

  constructor(
    @InjectRepository(RelationshipCalendar)
    private _relationshipCalendarRepository: Repository<RelationshipCalendar>,
    private readonly _usuarioService: UsuarioService,
    private readonly _customCalendarService: CustomCalendarService,
  ){

  }

  async create(createRelationshipCalendarDto: CreateRelationshipCalendarDto) {
    try {

      const userCreateExist = await this._usuarioService.findStatusByUuidValidationGeneral(createRelationshipCalendarDto.uuid_user_create);
      if (!userCreateExist.success) {
        return {
          success: false,
          message: 'No se encontró el usuario que crea la relación',  //cambiar mensaje
          data: null
        }
      }

      const userRelationshipExist = await this._usuarioService.findStatusByUuidValidationGeneral(createRelationshipCalendarDto.uuid_user_relationship);
      if (!userRelationshipExist.success) {
        return {
          success: false,
          message: 'No se encontró el usuario relacionado con el calendario', //cambiar mensaje
          data: null
        }
      }

      const customCalendarExist = await this._customCalendarService.findByCveCalendar(createRelationshipCalendarDto.cve_calendar);
      if (!customCalendarExist.success) {
        return {
          success: false,
          message: 'No se encontró el calendario relacionado con el usuario', //cambiar mensaje
          data: null
        }
      }

      const existRelationshipCalendar = await this.findByCveCalendarAndUuidUser(
        createRelationshipCalendarDto.cve_calendar,
        createRelationshipCalendarDto.uuid_user_create
      );

      if (!existRelationshipCalendar.success) {
        return {
          success: false,
          message: existRelationshipCalendar.message,
          data: null
        }
      }

      const createRelationshipCalendar = await this._relationshipCalendarRepository.save(createRelationshipCalendarDto);
      if (!createRelationshipCalendar) {
        return {
          success: false,
          message: 'Error al crear la relación entre el calendario y el usuario',
          data: null
        }
      }

      return {
        success: true,
        message: 'Relación entre el calendario y el usuario creada con éxito',
        data: createRelationshipCalendar
      }
      
    }catch (error) {
      return {
        success: false,
        message: 'Error al crear la relación entre el calendario y el usuario',
        data: null
      }
    }
  }

  async findByCveCalendarAndUuidUser(cve_calendar: string, uuidUserCreate: string) {
    try {
      const relationshipCalendar = await this._relationshipCalendarRepository.findOne({
        where: {
          cve_calendar: cve_calendar, uuid_user_create: uuidUserCreate
        }
      });

      if(relationshipCalendar){
        return {
          success: false,
          message: 'Ya existe una relación entre el calendario y el usuario',
          data: null
        }
      }

      return {
        success: true,
        message: 'Es posible crear la relación entre el calendario y el usuario',
        data: relationshipCalendar
      }

    } catch (error) {
      return {
        success: false,
        message: 'Error al buscar la relación entre el calendario y el usuario',
        data: null
      }
    }
  }

  async findByCveCalendar(cve_calendar: string) {
    return await this._customCalendarService.findByCveCalendar(cve_calendar);
  }

}
