import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCartDb1654710941441 implements MigrationInterface {
  name = 'CreateCartDb1654710941441';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `properties` (`id` char(36) NOT NULL, `item_id` char(36) NOT NULL, `name` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `value` varchar(50) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `items` (`id` char(36) NOT NULL, `cart_id` char(36) NOT NULL, `product_id` char(36) NOT NULL, `name` varchar(50) NOT NULL, `code` varchar(20) NOT NULL, `price` decimal NOT NULL, `description` text NULL, `amount` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `carts` (`id` char(36) NOT NULL, `user_id` char(36) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `properties` ADD CONSTRAINT `FK_2872cf34d884fc69d2741f52f0b` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `items` ADD CONSTRAINT `FK_e18e87dca227ffef10b99c8dae3` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `items` DROP FOREIGN KEY `FK_e18e87dca227ffef10b99c8dae3`',
    );
    await queryRunner.query(
      'ALTER TABLE `properties` DROP FOREIGN KEY `FK_2872cf34d884fc69d2741f52f0b`',
    );
    await queryRunner.query('DROP TABLE `carts`');
    await queryRunner.query('DROP TABLE `items`');
    await queryRunner.query('DROP TABLE `properties`');
  }
}
