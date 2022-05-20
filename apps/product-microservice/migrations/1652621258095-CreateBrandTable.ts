import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBrandTable1652621258095 implements MigrationInterface {
  name = 'CreateBrandTable1652621258095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `brands` (`id` char(36) NOT NULL, `name` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `type` varchar(50) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `brands`');
  }
}
