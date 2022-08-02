import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomProductTable1659454637178
  implements MigrationInterface
{
  name = 'CreateCustomProductTable1659454637178';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product_microservice_db\`.\`custom_products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` char(36) NOT NULL, \`product_template_id\` int NOT NULL, \`properties\` json NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_microservice_db\`.\`custom_products\` ADD CONSTRAINT \`FK_ce608cadbf5ea85f09a0feb0fd5\` FOREIGN KEY (\`product_template_id\`) REFERENCES \`product_microservice_db\`.\`custom_product_template\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_microservice_db\`.\`custom_products\` DROP FOREIGN KEY \`FK_ce608cadbf5ea85f09a0feb0fd5\``,
    );
    await queryRunner.query(
      `DROP TABLE \`product_microservice_db\`.\`custom_products\``,
    );
  }
}
