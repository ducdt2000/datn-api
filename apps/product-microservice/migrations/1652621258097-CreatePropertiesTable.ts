import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePropertiesTable1652621258097 implements MigrationInterface {
  name = 'CreatePropertiesTable1652621258097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `properties` (`id` char(36) NOT NULL, `name` varchar(100) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `property_values` ADD CONSTRAINT `FK_03a35b8b9b43a2be50a7664e961` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `property_values` DROP FOREIGN KEY `FK_03a35b8b9b43a2be50a7664e961`',
    );
    await queryRunner.query('DROP TABLE `properties`');
  }
}
