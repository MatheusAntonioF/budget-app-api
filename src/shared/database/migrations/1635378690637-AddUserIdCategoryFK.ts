import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddUserIdCategoryFK1635378690637 implements MigrationInterface {
  private useridCategoryFK = new TableForeignKey({
    name: 'user_id_category_fk',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createForeignKey('categories', this.useridCategoryFK);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropForeignKey('categories', this.useridCategoryFK);
  }
}
