import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { hashConfig } from '../../../../config/hash';
import { IHashProvider } from '../interfaces/IHashProvider';

@Injectable()
class BCryptProvider implements IHashProvider {
  async generateHash(toHashed: string): Promise<string> {
    const hashed = await bcrypt.hash(toHashed, hashConfig.rounds);

    return hashed;
  }
  async compareHash(
    stringToCompare: string,
    hashedString: string,
  ): Promise<boolean> {
    const matched = await bcrypt.compare(stringToCompare, hashedString);

    return matched;
  }
}

export { BCryptProvider };
