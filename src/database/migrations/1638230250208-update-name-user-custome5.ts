import {MigrationInterface, QueryRunner} from "typeorm";

export class updateNameUserCustome51638230250208 implements MigrationInterface {
    name = 'updateNameUserCustome51638230250208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_categories" ("product" integer NOT NULL, "category" integer NOT NULL, CONSTRAINT "PK_a92a896934cec10380b6de4f980" PRIMARY KEY ("product", "category"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd314ac81d3a83d50f6cc35d28" ON "product_categories" ("product") `);
        await queryRunner.query(`CREATE INDEX "IDX_533a3d9cbf98ffc50c4bbd5654" ON "product_categories" ("category") `);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_dd314ac81d3a83d50f6cc35d28d" FOREIGN KEY ("product") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_533a3d9cbf98ffc50c4bbd56541" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_533a3d9cbf98ffc50c4bbd56541"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_dd314ac81d3a83d50f6cc35d28d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_533a3d9cbf98ffc50c4bbd5654"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd314ac81d3a83d50f6cc35d28"`);
        await queryRunner.query(`DROP TABLE "product_categories"`);
    }

}
