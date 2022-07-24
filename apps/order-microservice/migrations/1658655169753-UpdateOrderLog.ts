import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOrderLog1658655169753 implements MigrationInterface {
  name = 'UpdateOrderLog1658655169753';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_microservice_db\`.\`order_logs\` CHANGE \`address\` \`address\` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_microservice_db\`.\`order_logs\` CHANGE \`city\` \`city\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_microservice_db\`.\`order_logs\` CHANGE \`district\` \`district\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_microservice_db\`.\`order_logs\` CHANGE \`district\` \`district\` varchar(20) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_microservice_db\`.\`order_logs\` CHANGE \`city\` \`city\` varchar(20) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_microservice_db\`.\`order_logs\` CHANGE \`address\` \`address\` varchar(100) NOT NULL`,
    );
  }
}
