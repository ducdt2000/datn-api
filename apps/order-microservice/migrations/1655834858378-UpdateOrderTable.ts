import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOrderTable1655834858378 implements MigrationInterface {
  name = 'UpdateOrderTable1655834858378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `orders` DROP FOREIGN KEY `FK_7819f136440d4ae83b20f0267a9`',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` DROP FOREIGN KEY `FK_972809e331ed70b3eb15eedb866`',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` CHANGE `warehouse_id` `warehouse_id` char(36) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` CHANGE `payment_method_id` `payment_method_id` int NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` CHANGE `delivery_method_id` `delivery_method_id` int NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` CHANGE `delivery_time` `delivery_time` datetime NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` ADD CONSTRAINT `FK_7819f136440d4ae83b20f0267a9` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` ADD CONSTRAINT `FK_972809e331ed70b3eb15eedb866` FOREIGN KEY (`delivery_method_id`) REFERENCES `delivery_methods`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
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
      'ALTER TABLE `orders` CHANGE `delivery_time` `delivery_time` datetime NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` CHANGE `delivery_method_id` `delivery_method_id` int NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` CHANGE `payment_method_id` `payment_method_id` int NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` CHANGE `warehouse_id` `warehouse_id` char(36) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` ADD CONSTRAINT `FK_972809e331ed70b3eb15eedb866` FOREIGN KEY (`delivery_method_id`) REFERENCES `delivery_methods`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` ADD CONSTRAINT `FK_7819f136440d4ae83b20f0267a9` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
