import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorCartTable1655630760429 implements MigrationInterface {
  name = 'RefactorCartTable1655630760429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `carts` DROP COLUMN `user_id`');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `carts` ADD `user_id` char(36) NOT NULL',
    );
  }
}
