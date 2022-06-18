import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProductPropertyRelation1655571558126
  implements MigrationInterface
{
  name = 'UpdateProductPropertyRelation1655571558126';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `properties` ADD `product_id` char(36) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `properties` ADD CONSTRAINT `FK_21e32dd2aa672580c577236d006` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `product_properties` DROP FOREIGN KEY `FK_0f3885b4091f332d3476181e0c0`',
    );
    await queryRunner.query(
      'ALTER TABLE `product_properties` DROP FOREIGN KEY `FK_7fad253874cd58cb759099147a7`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_0f3885b4091f332d3476181e0c` ON `product_properties`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_7fad253874cd58cb759099147a` ON `product_properties`',
    );
    await queryRunner.query('DROP TABLE `product_properties`');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `product_properties` (`product_id` char(36) NOT NULL, `property_id` char(36) NOT NULL, INDEX `IDX_7fad253874cd58cb759099147a` (`product_id`), INDEX `IDX_0f3885b4091f332d3476181e0c` (`property_id`), PRIMARY KEY (`product_id`, `property_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `product_properties` ADD CONSTRAINT `FK_7fad253874cd58cb759099147a7` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `product_properties` ADD CONSTRAINT `FK_0f3885b4091f332d3476181e0c0` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `properties` DROP FOREIGN KEY `FK_21e32dd2aa672580c577236d006`',
    );
    await queryRunner.query(
      'ALTER TABLE `properties` DROP COLUMN `product_id`',
    );
  }
}
