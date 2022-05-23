import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductVersionsTable1652621258098
  implements MigrationInterface
{
  name = 'CreateProductVersionsTable1652621258098';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `product_versions` (`id` char(36) NOT NULL, `name` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `product_id` char(36) NOT NULL, `code` varchar(20) NOT NULL, `price` decimal NOT NULL, `description` text CHARACTER SET "utf8" COLLATE "utf8_general_ci" NULL, `image_links` json NOT NULL, `default_image` varchar(200) NOT NULL, `count_in_stock` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `product_versions`');
  }
}
