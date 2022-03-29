import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPositionCompanyRelation1648140805816
  implements MigrationInterface
{
  name = 'addPositionCompanyRelation1648140805816';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "position" ADD "companyId" integer`);
    await queryRunner.query(
      `ALTER TABLE "position" ADD CONSTRAINT "FK_4795972601ff1d8b498ebc3d031" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "position" DROP CONSTRAINT "FK_4795972601ff1d8b498ebc3d031"`,
    );
    await queryRunner.query(`ALTER TABLE "position" DROP COLUMN "companyId"`);
  }
}
