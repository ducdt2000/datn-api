import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOrderLogUse1658659519948 implements MigrationInterface {
  name = 'UpdateOrderLogUse1658659519948';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_microservice_db\`.\`order_logs\` ADD \`user_name\` char(200) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_microservice_db\`.\`order_logs\` DROP COLUMN \`user_name\``,
    );
  }
}
