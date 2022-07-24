import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderItemImage1658673712880 implements MigrationInterface {
  name = 'OrderItemImage1658673712880';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_microservice_db\`.\`items\` ADD \`default_image_link\` varchar(1000) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_microservice_db\`.\`items\` DROP COLUMN \`default_image_link\``,
    );
  }
}
