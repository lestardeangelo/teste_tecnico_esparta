import { MigrationInterface, QueryRunner } from "typeorm";

export class finalStructure1678431433403 implements MigrationInterface {
    name = 'finalStructure1678431433403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "active"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "active" boolean NOT NULL DEFAULT true`);
    }

}
