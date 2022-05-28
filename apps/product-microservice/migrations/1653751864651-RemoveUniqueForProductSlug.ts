import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUniqueForProductSlug1653751864651
  implements MigrationInterface
{
  name = 'RemoveUniqueForProductSlug1653751864651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_464f927ae360106b783ed0b410` ON `products`',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE UNIQUE INDEX `IDX_464f927ae360106b783ed0b410` ON `products` (`slug`)',
    );
  }
}
