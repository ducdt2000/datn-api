import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTypesTable1652621258099
  implements MigrationInterface
{
  name = 'CreateProductTypesTable1652621258099';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `product_types` (`id` char(36) NOT NULL, `name` varchar(100) NOT NULL, `code` varchar(20) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `product_types`');
  }
}
