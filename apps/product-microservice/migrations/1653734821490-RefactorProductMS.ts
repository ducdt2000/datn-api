import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorProductMS1653734821490 implements MigrationInterface {
  name = 'RefactorProductMS1653734821490';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `products` DROP FOREIGN KEY `FK_5b27bdedd46ec6d699aeadbf746`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_5b27bdedd46ec6d699aeadbf74` ON `products`',
    );
    await queryRunner.query(
      'DROP INDEX `REL_5b27bdedd46ec6d699aeadbf74` ON `products`',
    );
    await queryRunner.query(
      'CREATE TABLE `product_properties` (`product_id` char(36) NOT NULL, `property_id` char(36) NOT NULL, INDEX `IDX_7fad253874cd58cb759099147a` (`product_id`), INDEX `IDX_0f3885b4091f332d3476181e0c` (`property_id`), PRIMARY KEY (`product_id`, `property_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `products` DROP COLUMN `default_version_id`',
    );
    await queryRunner.query(
      'ALTER TABLE `properties` ADD `values` json NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `products` ADD `price` decimal NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `products` ADD `image_links` json NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `products` ADD `default_image` varchar(200) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `products` ADD `count_in_stock` int NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `product_properties` ADD CONSTRAINT `FK_7fad253874cd58cb759099147a7` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `product_properties` ADD CONSTRAINT `FK_0f3885b4091f332d3476181e0c0` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `product_version_properties` DROP FOREIGN KEY `FK_80944d3b49645ac7d3dc5b53883`',
    );
    await queryRunner.query(
      'ALTER TABLE `product_version_properties` DROP FOREIGN KEY `FK_251ecb76bba4d64041521c6e881`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_80944d3b49645ac7d3dc5b5388` ON `product_version_properties`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_251ecb76bba4d64041521c6e88` ON `product_version_properties`',
    );
    await queryRunner.query('DROP TABLE `product_version_properties`');

    await queryRunner.query(
      'ALTER TABLE `product_versions` DROP FOREIGN KEY `FK_f01d66474378b5aff362e6b0e89`',
    );
    await queryRunner.query('DROP TABLE `product_versions`');
    await queryRunner.query('DROP TABLE `property_values`');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `property_values` (`id` char(36) NOT NULL, `name` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `property_id` char(36) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `product_versions` (`id` char(36) NOT NULL, `name` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `product_id` char(36) NOT NULL, `code` varchar(20) NOT NULL, `price` decimal NOT NULL, `description` text CHARACTER SET "utf8" COLLATE "utf8_general_ci" NULL, `image_links` json NOT NULL, `default_image` varchar(200) NOT NULL, `count_in_stock` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `product_versions` ADD CONSTRAINT `FK_f01d66474378b5aff362e6b0e89` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `product_properties` DROP FOREIGN KEY `FK_0f3885b4091f332d3476181e0c0`',
    );
    await queryRunner.query(
      'ALTER TABLE `product_properties` DROP FOREIGN KEY `FK_7fad253874cd58cb759099147a7`',
    );
    await queryRunner.query(
      'ALTER TABLE `products` DROP COLUMN `count_in_stock`',
    );
    await queryRunner.query(
      'ALTER TABLE `products` DROP COLUMN `default_image`',
    );
    await queryRunner.query('ALTER TABLE `products` DROP COLUMN `image_links`');
    await queryRunner.query('ALTER TABLE `products` DROP COLUMN `price`');
    await queryRunner.query('ALTER TABLE `properties` DROP COLUMN `values`');
    await queryRunner.query(
      'ALTER TABLE `products` ADD `default_version_id` char(36) NULL',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_0f3885b4091f332d3476181e0c` ON `product_properties`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_7fad253874cd58cb759099147a` ON `product_properties`',
    );
    await queryRunner.query('DROP TABLE `product_properties`');
    await queryRunner.query(
      'CREATE UNIQUE INDEX `REL_5b27bdedd46ec6d699aeadbf74` ON `products` (`default_version_id`)',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX `IDX_5b27bdedd46ec6d699aeadbf74` ON `products` (`default_version_id`)',
    );
    await queryRunner.query(
      'ALTER TABLE `products` ADD CONSTRAINT `FK_5b27bdedd46ec6d699aeadbf746` FOREIGN KEY (`default_version_id`) REFERENCES `product_versions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'CREATE TABLE `product_version_properties` (`product_version_id` char(36) NOT NULL, `property_id` char(36) NOT NULL, INDEX `IDX_251ecb76bba4d64041521c6e88` (`product_version_id`), INDEX `IDX_80944d3b49645ac7d3dc5b5388` (`property_id`), PRIMARY KEY (`product_version_id`, `property_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `product_version_properties` ADD CONSTRAINT `FK_251ecb76bba4d64041521c6e881` FOREIGN KEY (`product_version_id`) REFERENCES `product_versions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `product_version_properties` ADD CONSTRAINT `FK_80944d3b49645ac7d3dc5b53883` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
