export class CreateEventoDto {
    id_event: number;
    name: string;
    description?: string;
    date_event: Date;
    status?: string;
    uuid_user: string;
    create_at?: Date;
    update_by?: string;
    update_at?: Date;
  }