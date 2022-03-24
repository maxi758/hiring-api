import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';

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

  @ManyToOne(() => Company)
  company: Company;
}
