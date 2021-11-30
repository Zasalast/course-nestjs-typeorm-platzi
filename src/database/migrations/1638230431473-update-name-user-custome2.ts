import {MigrationInterface, QueryRunner} from "typeorm";

export class updateNameUserCustome21638230431473 implements MigrationInterface {
    name = 'updateNameUserCustome21638230431473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_categories" ("pk_product" integer NOT NULL, "pk_category" integer NOT NULL, CONSTRAINT "PK_d94d74158cfbf46fdf1f7623324" PRIMARY KEY ("pk_product", "pk_category"))`);
        await queryRunner.query(`CREATE INDEX "IDX_77cf8c3036a5fecc58a1b2acbc" ON "product_categories" ("pk_product") `);
        await queryRunner.query(`CREATE INDEX "IDX_c0f864a58c5728713c01533e90" ON "product_categories" ("pk_category") `);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_77cf8c3036a5fecc58a1b2acbc3" FOREIGN KEY ("pk_product") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_c0f864a58c5728713c01533e90f" FOREIGN KEY ("pk_category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_c0f864a58c5728713c01533e90f"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_77cf8c3036a5fecc58a1b2acbc3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c0f864a58c5728713c01533e90"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_77cf8c3036a5fecc58a1b2acbc"`);
        await queryRunner.query(`DROP TABLE "product_categories"`);
    }

}
