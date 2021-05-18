import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeRecipeIngredientRelationsNonNull1620985443757 implements MigrationInterface {
  name = 'MakeRecipeIngredientRelationsNonNull1620985443757';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `recipe_ingredient` DROP FOREIGN KEY `FK_256c22ec24d2d590b39e11a3ee4`');
    await queryRunner.query('ALTER TABLE `recipe_ingredient` DROP FOREIGN KEY `FK_e1948973c93c7cabca7522b6ff3`');
    await queryRunner.query('ALTER TABLE `recipe_ingredient` CHANGE `recipe_id` `recipe_id` int NOT NULL');
    await queryRunner.query('ALTER TABLE `recipe_ingredient` CHANGE `ingredient_id` `ingredient_id` int NOT NULL');
    await queryRunner.query(
      'ALTER TABLE `recipe_ingredient` ADD CONSTRAINT `FK_256c22ec24d2d590b39e11a3ee4` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`_id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE `recipe_ingredient` ADD CONSTRAINT `FK_e1948973c93c7cabca7522b6ff3` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient`(`_id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `recipe_ingredient` DROP FOREIGN KEY `FK_e1948973c93c7cabca7522b6ff3`');
    await queryRunner.query('ALTER TABLE `recipe_ingredient` DROP FOREIGN KEY `FK_256c22ec24d2d590b39e11a3ee4`');
    await queryRunner.query('ALTER TABLE `recipe_ingredient` CHANGE `ingredient_id` `ingredient_id` int NULL');
    await queryRunner.query('ALTER TABLE `recipe_ingredient` CHANGE `recipe_id` `recipe_id` int NULL');
    await queryRunner.query(
      'ALTER TABLE `recipe_ingredient` ADD CONSTRAINT `FK_e1948973c93c7cabca7522b6ff3` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient`(`_id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE `recipe_ingredient` ADD CONSTRAINT `FK_256c22ec24d2d590b39e11a3ee4` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`_id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }
}
