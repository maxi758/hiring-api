import {MigrationInterface, QueryRunner} from "typeorm";

export class addPositionCandidateRelation1648141715005 implements MigrationInterface {
    name = 'addPositionCandidateRelation1648141715005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidate" ADD "positionId" integer`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD CONSTRAINT "FK_8f3ea72c7542372a4e9cadbfbdf" FOREIGN KEY ("positionId") REFERENCES "position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidate" DROP CONSTRAINT "FK_8f3ea72c7542372a4e9cadbfbdf"`);
        await queryRunner.query(`ALTER TABLE "candidate" DROP COLUMN "positionId"`);
    }

}
