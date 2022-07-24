import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOrderEntity1658652410093 implements MigrationInterface {
  name = 'UpdateOrderEntity1658652410093';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_microservice_db\`.\`orders\` DROP COLUMN \`delivery_time\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_microservice_db\`.\`orders\` ADD \`delivery_time\` varchar(200) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_microservice_db\`.\`orders\` DROP COLUMN \`delivery_time\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_microservice_db\`.\`orders\` ADD \`delivery_time\` datetime NULL`,
    );
  }
}
