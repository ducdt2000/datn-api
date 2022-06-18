import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultImageLinkNullable1655567528372
  implements MigrationInterface
{
  name = 'DefaultImageLinkNullable1655567528372';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `products` DROP COLUMN `default_image`',
    );
    await queryRunner.query(
      'ALTER TABLE `products` ADD `default_image` varchar(300) NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `products` DROP COLUMN `default_image`',
    );
    await queryRunner.query(
      'ALTER TABLE `products` ADD `default_image` varchar(200) NOT NULL',
    );
  }
}
