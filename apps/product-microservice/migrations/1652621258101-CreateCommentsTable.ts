import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentsTable1652621258101 implements MigrationInterface {
  name = 'CreateCommentsTable1652621258101';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `comments` (`id` char(36) NOT NULL, `star` int NULL, `product_id` char(36) NOT NULL, `type` varchar(30) NOT NULL, `ref_user_ids` json NOT NULL, `user_id` char(36) NOT NULL, `content` text NULL, `level` int NOT NULL, `comment_parent_id` char(36) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `comments` ADD CONSTRAINT `FK_0ed3ef9c8a46cf978c2067e778c` FOREIGN KEY (`comment_parent_id`) REFERENCES `comments`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `comments` ADD CONSTRAINT `FK_8f405e50bbc3adb9a80fac0f928` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `comments` DROP FOREIGN KEY `FK_8f405e50bbc3adb9a80fac0f928`',
    );
    await queryRunner.query(
      'ALTER TABLE `comments` DROP FOREIGN KEY `FK_0ed3ef9c8a46cf978c2067e778c`',
    );
    await queryRunner.query('DROP TABLE `comments`');
  }
}
