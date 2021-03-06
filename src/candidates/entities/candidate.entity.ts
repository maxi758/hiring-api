import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StagesState } from '../../common/dto/enums/stage.enum';
import { Position } from '../../positions/entities/position.entity';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  surname: string;
  @Column()
  email: string;
  @Column({
    type: 'enum',
    enum: StagesState,
    default: StagesState.ON_HOLD,
  })
  status: StagesState;

  @ManyToMany(() => Position)
  @JoinTable()
  positions: Position[];
}
