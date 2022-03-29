import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTagEntity1648058646672 implements MigrationInterface {
  name = 'addTagEntity1648058646672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "modifiedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tag"`);
  }
}
