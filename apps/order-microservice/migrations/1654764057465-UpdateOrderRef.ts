import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOrderRef1654764057465 implements MigrationInterface {
  name = 'UpdateOrderRef1654764057465';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `orders` DROP FOREIGN KEY `FK_972809e331ed70b3eb15eedb866`',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` ADD CONSTRAINT `FK_972809e331ed70b3eb15eedb866` FOREIGN KEY (`delivery_method_id`) REFERENCES `delivery_methods`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `orders` DROP FOREIGN KEY `FK_972809e331ed70b3eb15eedb866`',
    );
    await queryRunner.query(
      'ALTER TABLE `orders` ADD CONSTRAINT `FK_972809e331ed70b3eb15eedb866` FOREIGN KEY (`delivery_method_id`) REFERENCES `payment_methods`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
