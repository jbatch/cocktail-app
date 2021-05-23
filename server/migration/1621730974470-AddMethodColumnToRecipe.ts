import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMethodColumnToRecipe1621730974470 implements MigrationInterface {
  name = 'AddMethodColumnToRecipe1621730974470';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `recipe` ADD `method` varchar(255) NULL AFTER imageUrl');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `recipe` DROP COLUMN `method`');
  }
}
