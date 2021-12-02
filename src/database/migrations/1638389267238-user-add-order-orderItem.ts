import {MigrationInterface, QueryRunner} from "typeorm";

export class userAddOrderOrderItem1638389267238 implements MigrationInterface {
    name = 'userAddOrderOrderItem1638389267238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "user"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "products"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "products" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "user" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "date" date NOT NULL`);
    }

}
