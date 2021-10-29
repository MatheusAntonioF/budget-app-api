import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCategoryIdSpendingsFK1635379002886
  implements MigrationInterface
{
  private columnCategoryId = new TableColumn({
    name: 'category_id',
    type: 'uuid',
  });

  private categoryIdSpendingsFK = new TableForeignKey({
    name: 'category_id_spendings_fk',
    columnNames: ['category_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'categories',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('spendings', this.columnCategoryId);

    return queryRunner.createForeignKey(
      'spendings',
      this.categoryIdSpendingsFK,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('spendings', this.categoryIdSpendingsFK);

    return queryRunner.dropColumn('spendings', this.columnCategoryId);
  }
}
