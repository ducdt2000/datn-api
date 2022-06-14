import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderDb1654763954211 implements MigrationInterface {
  name = 'CreateOrderDb1654763954211';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `payment_methods` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, `organization` varchar(50) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `order_logs` (`id` char(36) NOT NULL, `order_id` char(36) NOT NULL, `address` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `city` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `district` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `status` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `properties` (`id` char(36) NOT NULL, `item_id` char(36) NOT NULL, `name` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `value` varchar(50) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `items` (`id` char(36) NOT NULL, `order_id` char(36) NOT NULL, `product_id` char(36) NOT NULL, `name` varchar(50) NOT NULL, `code` varchar(20) NOT NULL, `price` decimal NOT NULL, `description` text NULL, `amount` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `orders` (`id` char(36) NOT NULL, `user_id` char(36) NOT NULL, `warehouse_id` char(36) NOT NULL, `payment_method_id` int NOT NULL, `delivery_method_id` int NOT NULL, `delivery_time` datetime NOT NULL, `bill` decimal NOT NULL, `status` int NOT NULL, `address` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `city` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `district` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `message` text NULL, `phone` varchar(20) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `delivery_methods` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, `organization` varchar(50) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `order_logs` ADD CONSTRAINT `FK_03afb74d68d64c9d3271bcd7012` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `properties` ADD CONSTRAINT `FK_2872cf34d884fc69d2741f52f0b` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `items` ADD CONSTRAINT `FK_f3dcaa16e13ff84a647c6410e15` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` ADD CONSTRAINT `FK_7819f136440d4ae83b20f0267a9` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` ADD CONSTRAINT `FK_972809e331ed70b3eb15eedb866` FOREIGN KEY (`delivery_method_id`) REFERENCES `payment_methods`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `orders` DROP FOREIGN KEY `FK_972809e331ed70b3eb15eedb866`',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` DROP FOREIGN KEY `FK_7819f136440d4ae83b20f0267a9`',
    );
    await queryRunner.query(
      'ALTER TABLE `items` DROP FOREIGN KEY `FK_f3dcaa16e13ff84a647c6410e15`',
    );
    await queryRunner.query(
      'ALTER TABLE `properties` DROP FOREIGN KEY `FK_2872cf34d884fc69d2741f52f0b`',
    );
    await queryRunner.query(
      'ALTER TABLE `order_logs` DROP FOREIGN KEY `FK_03afb74d68d64c9d3271bcd7012`',
    );
    await queryRunner.query('DROP TABLE `delivery_methods`');
    await queryRunner.query('DROP TABLE `orders`');
    await queryRunner.query('DROP TABLE `items`');
    await queryRunner.query('DROP TABLE `properties`');
    await queryRunner.query('DROP TABLE `order_logs`');
    await queryRunner.query('DROP TABLE `payment_methods`');
  }
}
