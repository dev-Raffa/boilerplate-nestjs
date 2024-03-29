import { enumTLD } from '../../enums/tld/tld.enum';
import { Validator } from '../validator';
import { EmailPattern } from './pattern/email.pattern';

export class EmailValidator implements Validator {
  validate(args: { value: string; msgError: string }): string | void {
    if (!args.value) {
      return;
    }
    args.value.toLowerCase();
    const emailParts = EmailPattern.exec(args.value);

    if (!emailParts) {
      return args.msgError;
    }

    const tld = emailParts[3].split('.');

    if (
      tld.length > 2 &&
      tld[tld.length - 1] in enumTLD &&
      tld[tld.length - 2] in enumTLD
    ) {
      return;
    }

    if (tld.length < 3 && tld[tld.length - 1] in enumTLD) return;

    return args.msgError;
  }
}
