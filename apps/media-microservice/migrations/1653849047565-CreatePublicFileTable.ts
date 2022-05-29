import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePublicFileTable1653849047565 implements MigrationInterface {
  name = 'CreatePublicFileTable1653849047565';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `public_files` (`id` char(36) NOT NULL, `url` varchar(200) NOT NULL, `key` varchar(50) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `public_files`');
  }
}
