import { Repository, In } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Role } from '../entities/role.entity';

export interface RoleRepository extends Repository<Role> {
  this: Repository<Role>;
  seedRoles(roles: string[]): Promise<Role[]>;
  findOneRole(criteria: any): Promise<Role>;
  findRolebyName(roleName: string): Promise<Role>;
}

export const customRoleRepository = AppDataSource.getRepository(Role).extend({
  async seedRoles(roles: string[]): Promise<Role[]> {
    const savedRoles = (await this.find({ name: In(roles) })).map(
      (role) => role.name,
    );

    if (!roles.every((role) => savedRoles.includes(role))) {
      return this.save(roles.map((role) => ({ name: role })));
    }
  },
  async findOneRole(criteria: any): Promise<Role> {
    return this.findOne(criteria);
  },
  findRolebyName(roleName: string): Promise<Role> {
    return this.findOne({ name: roleName });
  },
});
