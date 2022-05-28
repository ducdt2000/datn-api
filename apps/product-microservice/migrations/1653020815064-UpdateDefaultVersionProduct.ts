import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDefaultVersionProduct1653020815064
  implements MigrationInterface
{
  name = 'UpdateDefaultVersionProduct1653020815064';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `products` CHANGE `default_version_id` `default_version_id` char(36) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `products` ADD UNIQUE INDEX `IDX_5b27bdedd46ec6d699aeadbf74` (`default_version_id`)',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX `REL_5b27bdedd46ec6d699aeadbf74` ON `products` (`default_version_id`)',
    );
    await queryRunner.query(
      'ALTER TABLE `products` ADD CONSTRAINT `FK_5b27bdedd46ec6d699aeadbf746` FOREIGN KEY (`default_version_id`) REFERENCES `product_versions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `products` DROP FOREIGN KEY `FK_5b27bdedd46ec6d699aeadbf746`',
    );
    await queryRunner.query(
      'DROP INDEX `REL_5b27bdedd46ec6d699aeadbf74` ON `products`',
    );
    await queryRunner.query(
      'ALTER TABLE `products` DROP INDEX `IDX_5b27bdedd46ec6d699aeadbf74`',
    );
    await queryRunner.query(
      'ALTER TABLE `products` CHANGE `default_version_id` `default_version_id` char(36) NOT NULL',
    );
  }
}
