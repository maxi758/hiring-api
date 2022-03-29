import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeCandidatePositionManyToMany1648500484186
  implements MigrationInterface
{
  name = 'changeCandidatePositionManyToMany1648500484186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "candidate" DROP CONSTRAINT "FK_70364f02b42d38ac016883fb118"`,
    );
    await queryRunner.query(
      `CREATE TABLE "candidate_positions_position" ("candidateId" integer NOT NULL, "positionId" integer NOT NULL, CONSTRAINT "PK_a045ecc6454e59896c1e19edbd6" PRIMARY KEY ("candidateId", "positionId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d2fcad981dcda64e22f6b1588d" ON "candidate_positions_position" ("candidateId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c8e8be437cc600e2857da6bbe4" ON "candidate_positions_position" ("positionId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate" DROP COLUMN "positionsId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_positions_position" ADD CONSTRAINT "FK_d2fcad981dcda64e22f6b1588d8" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_positions_position" ADD CONSTRAINT "FK_c8e8be437cc600e2857da6bbe4a" FOREIGN KEY ("positionId") REFERENCES "position"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "candidate_positions_position" DROP CONSTRAINT "FK_c8e8be437cc600e2857da6bbe4a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_positions_position" DROP CONSTRAINT "FK_d2fcad981dcda64e22f6b1588d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate" ADD "positionsId" integer`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c8e8be437cc600e2857da6bbe4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d2fcad981dcda64e22f6b1588d"`,
    );
    await queryRunner.query(`DROP TABLE "candidate_positions_position"`);
    await queryRunner.query(
      `ALTER TABLE "candidate" ADD CONSTRAINT "FK_70364f02b42d38ac016883fb118" FOREIGN KEY ("positionsId") REFERENCES "position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
