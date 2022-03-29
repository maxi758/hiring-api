import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRoleEntity1647895531446 implements MigrationInterface {
  name = 'addRoleEntity1647895531446';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "update" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
