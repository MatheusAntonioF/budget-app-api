import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddUserIdToSpendingsTable1635291599566
  implements MigrationInterface
{
  private userIdColumn = new TableColumn({
    name: 'user_id',
    type: 'uuid',
  });

  private spendingsUserIdFK = new TableForeignKey({
    name: 'spendings_user_id_fk',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('spendings', this.userIdColumn);

    return queryRunner.createForeignKey('spendings', this.spendingsUserIdFK);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('spendings', this.spendingsUserIdFK);

    return queryRunner.dropColumn('spendings', this.userIdColumn);
  }
}
