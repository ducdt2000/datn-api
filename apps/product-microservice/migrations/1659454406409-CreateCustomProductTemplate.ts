import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomProductTemplate1659454406409
  implements MigrationInterface
{
  name = 'CreateCustomProductTemplate1659454406409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product_microservice_db\`.\`custom_product_values\` (\`id\` int NOT NULL AUTO_INCREMENT, \`property_id\` int NOT NULL, \`value\` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NULL, \`description\` text CHARACTER SET "utf8" COLLATE "utf8_general_ci" NULL, \`image_link\` varchar(300) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_microservice_db\`.\`custom_properties\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, \`template_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_microservice_db\`.\`custom_product_template\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` char(36) NOT NULL, \`example_image_links\` json NOT NULL, \`product_type\` char(36) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_microservice_db\`.\`custom_product_values\` ADD CONSTRAINT \`FK_b2dc932aa7656187f61c3df10a5\` FOREIGN KEY (\`property_id\`) REFERENCES \`product_microservice_db\`.\`custom_properties\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_microservice_db\`.\`custom_properties\` ADD CONSTRAINT \`FK_06bfbb7a8d00bd74cb784dc9599\` FOREIGN KEY (\`template_id\`) REFERENCES \`product_microservice_db\`.\`custom_product_template\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_microservice_db\`.\`custom_properties\` DROP FOREIGN KEY \`FK_06bfbb7a8d00bd74cb784dc9599\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_microservice_db\`.\`custom_product_values\` DROP FOREIGN KEY \`FK_b2dc932aa7656187f61c3df10a5\``,
    );
    await queryRunner.query(
      `DROP TABLE \`product_microservice_db\`.\`custom_product_template\``,
    );
    await queryRunner.query(
      `DROP TABLE \`product_microservice_db\`.\`custom_properties\``,
    );
    await queryRunner.query(
      `DROP TABLE \`product_microservice_db\`.\`custom_product_values\``,
    );
  }
}
