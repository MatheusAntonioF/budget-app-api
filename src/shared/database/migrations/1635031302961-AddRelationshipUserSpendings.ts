import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddRelationshipUserSpendings1635031302961
  implements MigrationInterface
{
  private columnSpendingidInTableUser = new TableColumn({
    name: 'spending_id',
    type: 'uuid',
    isNullable: true,
  });

  private userHasSpendingsForeignKey = new TableForeignKey({
    name: 'UserHasSpendingsForeignKey',
    columnNames: ['spending_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'spendings',
    onUpdate: 'CASCADE',
  });

  private columnUserIdInTableSpendings = new TableColumn({
    name: 'user_id',
    type: 'uuid',
  });

  private spendingHasUserForeignKey = new TableForeignKey({
    name: 'SpendingHasUserForeignKey',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', this.columnSpendingidInTableUser);

    await queryRunner.addColumn('spendings', this.columnUserIdInTableSpendings);

    await queryRunner.createForeignKey(
      'users',
      this.userHasSpendingsForeignKey,
    );

    return queryRunner.createForeignKey(
      'spendings',
      this.spendingHasUserForeignKey,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', this.userHasSpendingsForeignKey);

    await queryRunner.dropForeignKey(
      'spendings',
      this.spendingHasUserForeignKey,
    );

    await queryRunner.dropColumn('users', this.columnSpendingidInTableUser);

    return queryRunner.dropColumn(
      'spendings',
      this.columnUserIdInTableSpendings,
    );
  }
}
