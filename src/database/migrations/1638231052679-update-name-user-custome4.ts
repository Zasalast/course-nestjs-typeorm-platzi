import {MigrationInterface, QueryRunner} from "typeorm";

export class updateNameUserCustome41638231052679 implements MigrationInterface {
    name = 'updateNameUserCustome41638231052679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "customerId" TO "pk_customer"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce" TO "UQ_00f7dee8e779373a3368862c0d5"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_00f7dee8e779373a3368862c0d5" FOREIGN KEY ("pk_customer") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_00f7dee8e779373a3368862c0d5"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_00f7dee8e779373a3368862c0d5" TO "UQ_6c687a8fa35b0ae35ce766b56ce"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "pk_customer" TO "customerId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
