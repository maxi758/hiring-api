import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeStatusEnum1647991275495 implements MigrationInterface {
  name = 'changeStatusEnum1647991275495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."candidate_status_enum" RENAME TO "candidate_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."candidate_status_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12')`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate" ALTER COLUMN "status" TYPE "public"."candidate_status_enum" USING "status"::"text"::"public"."candidate_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate" ALTER COLUMN "status" SET DEFAULT '0'`,
    );
    await queryRunner.query(`DROP TYPE "public"."candidate_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."candidate_status_enum_old" AS ENUM('on-hold', 'start', 'week-1', 'week-2', 'week-3', 'week-4', 'week-5', 'week-6', 'week-7', 'week-8', 'week-9', 'denied', 'accepted')`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate" ALTER COLUMN "status" TYPE "public"."candidate_status_enum_old" USING "status"::"text"::"public"."candidate_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate" ALTER COLUMN "status" SET DEFAULT 'on-hold'`,
    );
    await queryRunner.query(`DROP TYPE "public"."candidate_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."candidate_status_enum_old" RENAME TO "candidate_status_enum"`,
    );
  }
}
