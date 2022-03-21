import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  date: Date;

  @UpdateDateColumn({ nullable: true })
  update: Date;
  
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
