import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUniqueBrand1655492810172 implements MigrationInterface {
  name = 'RemoveUniqueBrand1655492810172';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_b15428f362be2200922952dc26` ON `brands`',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE UNIQUE INDEX `IDX_b15428f362be2200922952dc26` ON `brands` (`slug`)',
    );
  }
}
