interface IHashProvider {
  generateHash(toHashed: string): Promise<string>;
  compareHash(stringToCompare: string, hashedString: string): Promise<boolean>;
}

export { IHashProvider };
