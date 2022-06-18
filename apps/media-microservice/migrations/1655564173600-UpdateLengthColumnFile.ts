import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateLengthColumnFile1655564173600 implements MigrationInterface {
  name = 'UpdateLengthColumnFile1655564173600';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `public_files` DROP COLUMN `url`');
    await queryRunner.query(
      'ALTER TABLE `public_files` ADD `url` varchar(300) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `public_files` DROP COLUMN `key`');
    await queryRunner.query(
      'ALTER TABLE `public_files` ADD `key` varchar(200) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `public_files` DROP COLUMN `key`');
    await queryRunner.query(
      'ALTER TABLE `public_files` ADD `key` varchar(50) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `public_files` DROP COLUMN `url`');
    await queryRunner.query(
      'ALTER TABLE `public_files` ADD `url` varchar(200) NOT NULL',
    );
  }
}
