import { enumTLD } from '../../enums/tld/tld.enum';
import { Validator } from '../validator';
import { EmailPattern } from './pattern/email.pattern';

export class EmailValidator implements Validator {
  validate(args: { value: string }): boolean {
    if (!args.value) {
      return true;
    }
    args.value.toLowerCase();
    const emailParts = EmailPattern.exec(args.value);

    if (!emailParts) {
      return false;
    }

    const tld = emailParts[3].split('.');

    return tld.length > 2
      ? tld[tld.length - 1] in enumTLD && tld[tld.length - 2] in enumTLD
      : tld[tld.length - 1] in enumTLD;
  }
}
