import {MigrationInterface, QueryRunner} from "typeorm";

export class addPositionEntity1648076028834 implements MigrationInterface {
    name = 'addPositionEntity1648076028834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "position" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "employment_type" character varying NOT NULL, "experience_level" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "position"`);
    }

}
