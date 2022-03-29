import { MigrationInterface, QueryRunner } from 'typeorm';

export class third1647575693395 implements MigrationInterface {
  name = 'third1647575693395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "candidate" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b0ddec158a9a60fbc785281581b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "candidate"`);
  }
}
