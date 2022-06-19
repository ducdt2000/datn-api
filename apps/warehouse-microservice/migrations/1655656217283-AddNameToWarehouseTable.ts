import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameToWarehouseTable1655656217283
  implements MigrationInterface
{
  name = 'AddNameToWarehouseTable1655656217283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `warehouses` ADD `name` varchar(100) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `warehouses` DROP COLUMN `name`');
  }
}
