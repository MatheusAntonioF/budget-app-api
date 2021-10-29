interface ICreateSpendingDTO {
  name: string;
  description: string;
  date: Date;
  value: number;
  user_id: string;
  category_id: string;
}

export { ICreateSpendingDTO };
