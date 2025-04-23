export class CreateUsuarioDto {
    id_user: number;
    uuid: string;
    username: string;
    password: string;
    status?: string;
    email: string;
    brd_date?: Date;
    name: string;
    lastname: string;
    create_by?: string;
    create_at?: Date;
    update_by?: string;
    update_at?: Date;
  }