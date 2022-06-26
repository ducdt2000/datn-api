import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIdToOrderLog1656265825644 implements MigrationInterface {
  name = 'AddUserIdToOrderLog1656265825644';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `order_logs` ADD `user_id` char(36) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `order_logs` DROP COLUMN `user_id`');
  }
}
