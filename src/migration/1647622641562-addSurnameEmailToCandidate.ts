import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSurnameEmailToCandidate1647622641562
  implements MigrationInterface
{
  name = 'addSurnameEmailToCandidate1647622641562';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "candidate" ADD "surname" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate" ADD "email" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "candidate" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "candidate" DROP COLUMN "surname"`);
  }
}
