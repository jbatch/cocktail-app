import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeMethodColumnTextType1621731146039 implements MigrationInterface {
  name = 'MakeMethodColumnTextType1621731146039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `recipe` MODIFY COLUMN `method` TEXT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `recipe` MODIFY COLUMN `method` varchar(255) NULL');
  }
}
