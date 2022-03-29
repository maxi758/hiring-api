import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCandidateStatus1647978296801 implements MigrationInterface {
  name = 'addCandidateStatus1647978296801';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."candidate_status_enum" AS ENUM('on-hold', 'start', 'week-1', 'week-2', 'week-3', 'week-4', 'week-5', 'week-6', 'week-7', 'week-8', 'week-9', 'denied', 'accepted')`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate" ADD "status" "public"."candidate_status_enum" NOT NULL DEFAULT 'on-hold'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "candidate" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."candidate_status_enum"`);
  }
}
