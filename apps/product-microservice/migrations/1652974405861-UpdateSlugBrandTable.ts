import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSlugBrandTable1652974405861 implements MigrationInterface {
  name = 'UpdateSlugBrandTable1652974405861';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `brands` ADD `slug` varchar(50) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `brands` ADD UNIQUE INDEX `IDX_b15428f362be2200922952dc26` (`slug`)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `brands` DROP INDEX `IDX_b15428f362be2200922952dc26`',
    );
    await queryRunner.query('ALTER TABLE `brands` DROP COLUMN `slug`');
  }
}
