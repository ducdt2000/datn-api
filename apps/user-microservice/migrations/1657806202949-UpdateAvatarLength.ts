import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateAvatarLength1657806202949 implements MigrationInterface {
    name = 'UpdateAvatarLength1657806202949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_microservice_db\`.\`users\` DROP COLUMN \`avatar_link\``);
        await queryRunner.query(`ALTER TABLE \`user_microservice_db\`.\`users\` ADD \`avatar_link\` varchar(300) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_microservice_db\`.\`users\` DROP COLUMN \`avatar_link\``);
        await queryRunner.query(`ALTER TABLE \`user_microservice_db\`.\`users\` ADD \`avatar_link\` varchar(50) NULL`);
    }

}
