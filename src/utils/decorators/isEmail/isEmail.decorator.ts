import { EmailValidator } from '../../validators/email/email.validator';
import { Validate } from '../Validate/validate.decorator';

export function isEmail() {
  return Validate(new EmailValidator());
}
