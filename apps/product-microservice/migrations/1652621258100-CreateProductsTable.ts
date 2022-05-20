import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1652621258100 implements MigrationInterface {
  name = 'CreateProductsTable1652621258100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `products` (`id` char(36) NOT NULL, `name` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `code` varchar(20) NOT NULL, `product_type_id` char(36) NOT NULL, `star_point` decimal NOT NULL DEFAULT 0, `description` text NULL, `slug` varchar(50) NOT NULL, `default_version_id` char(36) NOT NULL, `brand_id` char(36) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, UNIQUE INDEX `IDX_464f927ae360106b783ed0b410` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `product_versions` ADD CONSTRAINT `FK_f01d66474378b5aff362e6b0e89` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `products` ADD CONSTRAINT `FK_9adb63f24f86528856373f0ab9a` FOREIGN KEY (`product_type_id`) REFERENCES `product_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `products` ADD CONSTRAINT `FK_1530a6f15d3c79d1b70be98f2be` FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `products` DROP FOREIGN KEY `FK_1530a6f15d3c79d1b70be98f2be`',
    );
    await queryRunner.query(
      'ALTER TABLE `products` DROP FOREIGN KEY `FK_9adb63f24f86528856373f0ab9a`',
    );
    await queryRunner.query(
      'ALTER TABLE `product_versions` DROP FOREIGN KEY `FK_f01d66474378b5aff362e6b0e89`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_464f927ae360106b783ed0b410` ON `products`',
    );
    await queryRunner.query('DROP TABLE `products`');
  }
}
