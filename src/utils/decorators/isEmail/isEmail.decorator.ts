import { EmailValidator } from '../../validators/email/email.validator';
import { Validate } from '../Validate/validate.decorator';

export function isEmail(
  msgError: string = 'the email should contain a valid format like "name@domain.com" & a valid domain'
) {
  return Validate({ validator: new EmailValidator(), msgError: msgError });
}
