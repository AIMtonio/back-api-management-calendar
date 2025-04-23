import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('evento')
export class Evento {

    @PrimaryGeneratedColumn({ name: 'id_event' })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'date', name: 'date_event', nullable: false })
    dateEvent: Date;

    @Column({ type: 'varchar', length: 50, nullable: true })
    status: string;

    @Column({ type: 'char', length: 36, name: 'uuid_user', nullable: false })
    uuidUser: string;

    @CreateDateColumn({ name: 'create_at', type: 'datetime' })
    createAt: Date;

    @Column({ type: 'varchar', length: 100, name: 'update_by', nullable: true })
    updateBy: string;

    @UpdateDateColumn({ name: 'update_at', type: 'datetime' })
    updateAt: Date;
}