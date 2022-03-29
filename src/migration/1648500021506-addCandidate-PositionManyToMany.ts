import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCandidatePositionManyToMany1648500021506
  implements MigrationInterface
{
  name = 'addCandidatePositionManyToMany1648500021506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "candidate" ADD "positionsId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate" ADD CONSTRAINT "FK_70364f02b42d38ac016883fb118" FOREIGN KEY ("positionsId") REFERENCES "position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "candidate" DROP CONSTRAINT "FK_70364f02b42d38ac016883fb118"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate" DROP COLUMN "positionsId"`,
    );
  }
}
