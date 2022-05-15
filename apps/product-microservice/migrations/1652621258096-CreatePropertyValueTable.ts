import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePropertyValueTable1652621258096
  implements MigrationInterface
{
  name = 'CreatePropertyValueTable1652621258096';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `property_values` (`id` char(36) NOT NULL, `name` varchar(100) NOT NULL, `property_id` char(36) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `property_values`');
  }
}
