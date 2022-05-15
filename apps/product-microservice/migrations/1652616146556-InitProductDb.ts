import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitProductDb1652616146556 implements MigrationInterface {
  name = 'InitProductDb1652616146556';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `brands` (`id` char(36) NOT NULL, `name` varchar(100) NOT NULL, `type` varchar(50) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `property_values` (`id` char(36) NOT NULL, `name` varchar(100) NOT NULL, `property_id` char(36) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `properties` (`id` char(36) NOT NULL, `name` varchar(100) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `product_versions` (`id` char(36) NOT NULL, `name` varchar(100) NOT NULL, `product_id` char(36) NOT NULL, `code` varchar(20) NOT NULL, `price` decimal NOT NULL, `description` text NULL, `image_links` json NOT NULL, `default_image` varchar(200) NOT NULL, `count_in_stock` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `product_types` (`id` char(36) NOT NULL, `name` varchar(100) NOT NULL, `code` varchar(20) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `products` (`id` char(36) NOT NULL, `name` varchar(100) NOT NULL, `code` varchar(20) NOT NULL, `product_type_id` char(36) NOT NULL, `star_point` decimal NOT NULL DEFAULT 0, `description` text NULL, `slug` varchar(50) NOT NULL, `default_version_id` char(36) NOT NULL, `brand_id` char(36) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, UNIQUE INDEX `IDX_464f927ae360106b783ed0b410` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `comments` (`id` char(36) NOT NULL, `star` int NULL, `product_id` char(36) NOT NULL, `type` varchar(30) NOT NULL, `ref_user_ids` json NOT NULL, `user_id` char(36) NOT NULL, `content` text NULL, `level` int NOT NULL, `comment_parent_id` char(36) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `property_values` ADD CONSTRAINT `FK_03a35b8b9b43a2be50a7664e961` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
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
    await queryRunner.query(
      'ALTER TABLE `comments` ADD CONSTRAINT `FK_0ed3ef9c8a46cf978c2067e778c` FOREIGN KEY (`comment_parent_id`) REFERENCES `comments`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `comments` ADD CONSTRAINT `FK_8f405e50bbc3adb9a80fac0f928` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `comments` DROP FOREIGN KEY `FK_8f405e50bbc3adb9a80fac0f928`',
    );
    await queryRunner.query(
      'ALTER TABLE `comments` DROP FOREIGN KEY `FK_0ed3ef9c8a46cf978c2067e778c`',
    );
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
      'ALTER TABLE `property_values` DROP FOREIGN KEY `FK_03a35b8b9b43a2be50a7664e961`',
    );
    await queryRunner.query('DROP TABLE `comments`');
    await queryRunner.query(
      'DROP INDEX `IDX_464f927ae360106b783ed0b410` ON `products`',
    );
    await queryRunner.query('DROP TABLE `products`');
    await queryRunner.query('DROP TABLE `product_types`');
    await queryRunner.query('DROP TABLE `product_versions`');
    await queryRunner.query('DROP TABLE `properties`');
    await queryRunner.query('DROP TABLE `property_values`');
    await queryRunner.query('DROP TABLE `brands`');
  }
}
