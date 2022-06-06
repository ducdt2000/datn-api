import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateImageAvatarLink1654536870584 implements MigrationInterface {
  name = 'UpdateImageAvatarLink1654536870584';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `users` CHANGE `avatar_link` `avatar_link` varchar(50) NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `users` CHANGE `avatar_link` `avatar_link` varchar(50) NOT NULL',
    );
  }
}
