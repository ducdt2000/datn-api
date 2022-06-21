import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResultOnWarehouseLogTable1655662278536
  implements MigrationInterface
{
  name = 'AddResultOnWarehouseLogTable1655662278536';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `item_logs` ADD `result` int NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `item_logs` DROP COLUMN `result`');
  }
}
