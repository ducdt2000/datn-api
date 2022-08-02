import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCustomProductTable1659468420040
  implements MigrationInterface
{
  name = 'UpdateCustomProductTable1659468420040';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_microservice_db\`.\`custom_products\` ADD \`message\` varchar(200) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_microservice_db\`.\`custom_products\` DROP COLUMN \`message\``,
    );
  }
}
