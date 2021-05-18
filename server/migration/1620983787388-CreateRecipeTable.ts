import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRecipeTable1620983787388 implements MigrationInterface {
  name = 'CreateRecipeTable1620983787388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `recipe` (`_id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `imageUrl` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_5b490d0ac36eb4d537228888bf` (`name`), PRIMARY KEY (`_id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'CREATE TABLE `recipe_ingredient` (`_id` int NOT NULL AUTO_INCREMENT, `recipeId` int NOT NULL, `ingredientId` int NOT NULL, `amount` int NOT NULL, `unit` varchar(255) NOT NULL, `recipe_id` int NULL, `ingredient_id` int NULL, PRIMARY KEY (`_id`)) ENGINE=InnoDB'
    );
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
    await queryRunner.query('DROP TABLE `recipe_ingredient`');
    await queryRunner.query('DROP INDEX `IDX_5b490d0ac36eb4d537228888bf` ON `recipe`');
    await queryRunner.query('DROP TABLE `recipe`');
  }
}
