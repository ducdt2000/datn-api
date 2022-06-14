import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWarehouseDb1654762633899 implements MigrationInterface {
  name = 'CreateWarehouseDb1654762633899';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `properties` (`id` char(36) NOT NULL, `item_id` char(36) NOT NULL, `name` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `value` varchar(50) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `items` (`id` char(36) NOT NULL, `product_id` char(36) NOT NULL, `warehouse_id` char(36) NOT NULL, `name` varchar(50) NOT NULL, `price` decimal NOT NULL, `description` text NULL, `code` varchar(20) NOT NULL, `amount` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `warehouses` (`id` char(36) NOT NULL, `manager_user_id` char(36) NOT NULL, `address` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `city` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `district` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `status` tinyint NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `warehouse_logs` (`id` char(36) NOT NULL, `user_id` char(36) NOT NULL, `warehouse_id` char(36) NOT NULL, `type` tinyint NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `item_logs` (`id` char(36) NOT NULL, `warehouse_log_id` char(36) NOT NULL, `item_id` char(36) NOT NULL, `amount` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, UNIQUE INDEX `REL_fb07b84524b293e50c4ccb47c3` (`item_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `properties` ADD CONSTRAINT `FK_2872cf34d884fc69d2741f52f0b` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `items` ADD CONSTRAINT `FK_6af82abcd0b933d835d4e210553` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `warehouse_logs` ADD CONSTRAINT `FK_98222aed7088c86bf42ec6d1df9` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `item_logs` ADD CONSTRAINT `FK_2c68215449ad7ccd28ff102312d` FOREIGN KEY (`warehouse_log_id`) REFERENCES `warehouse_logs`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `item_logs` ADD CONSTRAINT `FK_fb07b84524b293e50c4ccb47c36` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `item_logs` DROP FOREIGN KEY `FK_fb07b84524b293e50c4ccb47c36`',
    );
    await queryRunner.query(
      'ALTER TABLE `item_logs` DROP FOREIGN KEY `FK_2c68215449ad7ccd28ff102312d`',
    );
    await queryRunner.query(
      'ALTER TABLE `warehouse_logs` DROP FOREIGN KEY `FK_98222aed7088c86bf42ec6d1df9`',
    );
    await queryRunner.query(
      'ALTER TABLE `items` DROP FOREIGN KEY `FK_6af82abcd0b933d835d4e210553`',
    );
    await queryRunner.query(
      'ALTER TABLE `properties` DROP FOREIGN KEY `FK_2872cf34d884fc69d2741f52f0b`',
    );
    await queryRunner.query(
      'DROP INDEX `REL_fb07b84524b293e50c4ccb47c3` ON `item_logs`',
    );
    await queryRunner.query('DROP TABLE `item_logs`');
    await queryRunner.query('DROP TABLE `warehouse_logs`');
    await queryRunner.query('DROP TABLE `warehouses`');
    await queryRunner.query('DROP TABLE `items`');
    await queryRunner.query('DROP TABLE `properties`');
  }
}
