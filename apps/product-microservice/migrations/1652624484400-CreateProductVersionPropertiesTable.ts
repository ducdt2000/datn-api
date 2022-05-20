import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductVersionPropertiesTable1652624484400
  implements MigrationInterface
{
  name = 'CreateProductVersionPropertiesTable1652624484400';

  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
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
  }
}
