import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ length: 60, unique: true, nullable: true })
  email: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
