import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeRecipeAmountDecimal1620987557093 implements MigrationInterface {
  name = 'MakeRecipeAmountDecimal1620987557093';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `recipe_ingredient` DROP COLUMN `amount`');
    await queryRunner.query('ALTER TABLE `recipe_ingredient` ADD `amount` decimal(10,2) NOT NULL after _id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `recipe_ingredient` DROP COLUMN `amount`');
    await queryRunner.query('ALTER TABLE `recipe_ingredient` ADD `amount` int NOT NULL');
  }
}
