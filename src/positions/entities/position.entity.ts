import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'employment_type' })
  employmentType: string;

  @Column({ name: 'experience_level' })
  experienceLevel: string;

  @Column()
  description: string;
}
