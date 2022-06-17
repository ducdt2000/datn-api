import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserDb1655225541958 implements MigrationInterface {
  name = 'CreateUserDb1655225541958';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `users` (`id` char(36) NOT NULL, `fullname` varchar(50) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `username` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `email` varchar(50) NOT NULL, `phone` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `address` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `city` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `district` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, `gender` tinyint NOT NULL, `avatar_link` varchar(50) NULL, `birthday` datetime NOT NULL, `password` varchar(200) NOT NULL, `invite_code` varchar(10) NULL, `role` varchar(10) NOT NULL, `is_active` tinyint NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `users`');
  }
}
