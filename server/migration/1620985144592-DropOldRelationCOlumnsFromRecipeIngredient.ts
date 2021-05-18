import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropOldRelationCOlumnsFromRecipeIngredient1620985144592 implements MigrationInterface {
  name = 'DropOldRelationCOlumnsFromRecipeIngredient1620985144592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `recipe_ingredient` DROP COLUMN `recipeId`');
    await queryRunner.query('ALTER TABLE `recipe_ingredient` DROP COLUMN `ingredientId`');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `recipe_ingredient` ADD `ingredientId` int NOT NULL');
    await queryRunner.query('ALTER TABLE `recipe_ingredient` ADD `recipeId` int NOT NULL');
  }
}
