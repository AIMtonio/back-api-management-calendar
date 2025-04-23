import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_user' })
  id: number;

  @Column({ type: 'char', length: 36, nullable: false })
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'date', name: 'brd_date', nullable: true })
  brdDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastname: string;

  @Column({ type: 'varchar', length: 100, name: 'create_by', default: 'system' })
  createBy: string;

  @CreateDateColumn({ name: 'create_at', type: 'datetime' })
  createAt: Date;

  @Column({ type: 'varchar', length: 100, name: 'update_by', nullable: true })
  updateBy: string;

  @UpdateDateColumn({ name: 'update_at', type: 'datetime' })
  updateAt: Date;
}